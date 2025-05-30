const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveCard: (cardData) => ipcRenderer.send('save-card', cardData),
  listCards: () => ipcRenderer.invoke('list-cards'),
  deleteCard: (id) => ipcRenderer.send('delete-card', id)

});
