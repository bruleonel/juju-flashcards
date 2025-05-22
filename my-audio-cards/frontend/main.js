const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true,
    },
  });

  win.loadFile(path.join(__dirname, 'dist', 'frontend', 'index.html'));

  //win.webContents.openDevTools();

}

app.whenReady().then(createWindow);

ipcMain.on('save-card', (event, cardData) => {
  const dir = path.join(app.getPath('userData'), 'cards');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const id = Date.now();
  fs.writeFileSync(path.join(dir, `${id}.json`), JSON.stringify({
    frontText: cardData.frontText,
    backText: cardData.backText,
  }));

  fs.writeFileSync(path.join(dir, `${id}_front.webm`), Buffer.from(cardData.frontAudio, 'base64'));
  fs.writeFileSync(path.join(dir, `${id}_back.webm`), Buffer.from(cardData.backAudio, 'base64'));

  console.log('Card salvo:', id);
});

ipcMain.handle('list-cards', async () => {
  const dir = path.join(app.getPath('userData'), 'cards');
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));
  const cards = files.map(f => {
    const id = f.replace('.json', '');
    const json = fs.readFileSync(path.join(dir, f), 'utf8');
    const { frontText, backText } = JSON.parse(json);

    return {
      id,
      frontText,
      backText,
      frontAudioPath: path.join(dir, `${id}_front.webm`),
      backAudioPath: path.join(dir, `${id}_back.webm`)
    };
  });

  return cards;
});
