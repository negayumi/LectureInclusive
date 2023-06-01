document.addEventListener('DOMContentLoaded', () => {
  let toggleButton = document.getElementById('toggle');
  toggleButton.classList.add('active'); // Ajouter la classe "active" par défaut
  let port = chrome.runtime.connect();
  port.postMessage({ extensionActive: true }); // Envoyer un message avec l'état activé par défaut
});

document.getElementById('toggle').addEventListener('click', (e) => {
  let port = chrome.runtime.connect();
  let isActive = !e.target.classList.contains('active');
  e.target.classList.toggle('active', isActive);
  port.postMessage({ extensionActive: isActive });
});