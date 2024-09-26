import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

const main = document.querySelector('#main');
main.innerHTML = '';

// Function to display a loading spinner while the editor is being loaded
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
  <div class="loading-container">
    <div class="loading-spinner"></div>
  </div>
  `;
  main.appendChild(spinner);
};

// Initialize the editor
const editor = new Editor();

if (typeof editor === 'undefined') {
  // Display spinner if the editor fails to load
  loadSpinner();
}

// Check if service workers are supported by the browser
if ('serviceWorker' in navigator) {
  // Register the service worker using Workbox
  const workboxSW = new Workbox('../../src-sw.js');
  workboxSW.register()
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.error('Service Worker registration failed:', err);
    });
} else {
  console.error('Service workers are not supported in this browser.');
}
