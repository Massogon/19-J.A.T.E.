// Import methods to save and get data from the indexedDB database in './database.js'
import { getDbContent as getDb, putDbContent as putDb } from './database';
import { header } from './header';

export default class TextEditor {
  constructor() {
    // Check if there's any local data in localStorage
    const savedLocalData = localStorage.getItem('editorContent');

    // Check if CodeMirror is loaded correctly
    if (typeof CodeMirror === 'undefined') {
      throw new Error('CodeMirror library is not loaded');
    }

    // Initialize CodeMirror editor with customized settings
    this.editorInstance = CodeMirror(document.querySelector('#main'), {
      value: '', // Default value to be replaced with stored data later
      mode: 'javascript', // Syntax highlighting for JS
      theme: 'monokai', // Monokai color theme
      lineNumbers: true, // Display line numbers in the editor
      lineWrapping: true, // Allow text wrapping
      autofocus: true, // Autofocus on the editor when loaded
      indentUnit: 2,
      tabSize: 2,
    });

    // Load content from IndexedDB or localStorage into the editor
    this.loadEditorContent();

    // Event listener to track changes in the editor and save content
    this.editorInstance.on('change', () => {
      const editorContent = this.editorInstance.getValue();
      localStorage.setItem('editorContent', editorContent);
      putDb(editorContent); // Save content to IndexedDB
    });

    // Log when the editor loses focus (optional, can add more handling)
    this.editorInstance.on('blur', () => {
      console.log('Editor has lost focus');
    });
  }

  // Load content into the editor from IndexedDB, with localStorage and header fallback
  async loadEditorContent() {
    try {
      const storedData = await getDb();
      const editorContent = storedData.length ? storedData[0].value : localStorage.getItem('editorContent') || header;
      this.editorInstance.setValue(editorContent); // Insert the content into the editor
      console.info('Editor content loaded successfully from IndexedDB.');
    } catch (error) {
      console.error('Error loading editor content from IndexedDB:', error);
      const fallbackContent = localStorage.getItem('editorContent') || header;
      this.editorInstance.setValue(fallbackContent); // Fallback to localStorage or header content
    }
  }
}
