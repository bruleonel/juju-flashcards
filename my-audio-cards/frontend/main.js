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
  mainWindow.removeMenu();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('save-card', (event, cardData) => {
  const dir = path.join(app.getPath('userData'), 'cards');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  const id = Date.now();
  const cardJson = {};

  if (cardData.frontText) cardJson.frontText = cardData.frontText;
  if (cardData.backText) cardJson.backText = cardData.backText;

  fs.writeFileSync(path.join(dir, `${id}.json`), JSON.stringify(cardJson));

  if (cardData.frontAudio) {
    fs.writeFileSync(
      path.join(dir, `${id}_front.webm`),
      Buffer.from(cardData.frontAudio, 'base64')
    );
  }

  if (cardData.backAudio) {
    fs.writeFileSync(
      path.join(dir, `${id}_back.webm`),
      Buffer.from(cardData.backAudio, 'base64')
    );
  }

  if (cardData.frontImage) {
    fs.writeFileSync(path.join(dir, `${id}_front.png`), Buffer.from(cardData.frontImage, 'base64'));
  }

  if (cardData.backImage) {
    fs.writeFileSync(path.join(dir, `${id}_back.png`), Buffer.from(cardData.backImage, 'base64'));
  }

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
      frontAudioPath: fs.existsSync(path.join(dir, `${id}_front.webm`)) ? path.join(dir, `${id}_front.webm`) : null,
      backAudioPath: fs.existsSync(path.join(dir, `${id}_back.webm`)) ? path.join(dir, `${id}_back.webm`) : null
    };
    
  });

  ipcMain.on('delete-card', (event, id) => {
    const dir = path.join(app.getPath('userData'), 'cards');
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      if (file.startsWith(id)) {
        fs.unlinkSync(path.join(dir, file));
      }
    });
    console.log(`Card ${id} excluído`);
  });
  

  return cards;
});
