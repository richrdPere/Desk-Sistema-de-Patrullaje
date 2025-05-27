const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Carga el script preload
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false //  necesario para evitar bloqueos con recursos remotos como Google Maps
    }
  });

  mainWindow.loadURL(`file://${path.join(__dirname, '../dist/patrullaje-serenazgo-desktop/browser/index.html')}`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});



// function createWindow() {
//   const win = new BrowserWindow({
//     width: 1200,
//     height: 800,
//     webPreferences: {
//       contextIsolation: true,
//       nodeIntegration: false
//     }
//   });

//   win.loadURL(`file://${path.join(__dirname, '../dist/patrullaje-serenazgo-desktop/browser/index.html')}`);
//   //win.loadFile(path.join(__dirname, '../dist/patrullaje-serenazgo/index.html'));
//   //win.loadFile(path.join(__dirname, '../dist/patrullaje-serenazgo-desktop/browser/index.html'));
//   //win.loadFile(path.join(__dirname, '../src/index.html'));
// }

// app.whenReady().then(() => {
//   createWindow();

//   app.on('activate', function () {
//     if (BrowserWindow.getAllWindows().length === 0) createWindow();
//   });
// });

// app.on('window-all-closed', function () {
//   if (process.platform !== 'darwin') app.quit();
// });
