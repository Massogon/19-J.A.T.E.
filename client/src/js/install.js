const installButton = document.getElementById('buttonInstall');

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the mini-infobar from appearing on mobile devices
  event.preventDefault();
  
  // Store the event so it can be triggered later when the user clicks install
  window.deferredInstallPrompt = event;
  
  // Show the install button to the user
  installButton.style.display = 'block';
});

installButton.addEventListener('click', async () => {
  const promptEvent = window.deferredInstallPrompt;
  
  if (!promptEvent) {
    return;
  }

  // Trigger the install prompt
  promptEvent.prompt();
  
  // Wait for the user's response to the prompt
  const userChoice = await promptEvent.userChoice;
  console.log('User chose to', userChoice.outcome);

  // Clear the stored install prompt event after use
  window.deferredInstallPrompt = null;
  
  // Hide the install button once the installation is initiated
  installButton.style.display = 'none';
});

// When the app is successfully installed
window.addEventListener('appinstalled', (event) => {
  console.log('PWA has been installed successfully!', event);
});
