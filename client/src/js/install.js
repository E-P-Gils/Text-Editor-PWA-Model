const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
//Here we're preventing the event, but storing it under deferredprompt for later use
    event.preventDefault();
    window.deferredPrompt = event;
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
      // Check if deferredPrompt is available
  if (window.deferredPrompt) {
    // Show the installation prompt
    window.deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const choiceResult = await window.deferredPrompt.userChoice;

    // Reset the deferredPrompt variable
    window.deferredPrompt = null;

    // Handle the user's choice
    if (choiceResult.outcome === 'accepted') {
      console.log('PWA installation accepted');
    } else {
      console.log('PWA installation dismissed');
    }
  }
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('PWA installed successfully');
});
