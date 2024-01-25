// Modules to control application life and create native browser window
import { app, BrowserWindow } from 'electron';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js') // Asegúrate de que preload.js exista en este camino
    }
  });

  // Load the index.html of the app.
  const startUrl = process.env.NODE_ENV !== 'production'
    ? 'http://localhost:3000' // URL del servidor de desarrollo
    : `file://${path.join(__dirname, '../build/index.html')}`; // Ruta del archivo de producción

  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

// This method will be called when Electron has finished initialization
app.whenReady().then(createWindow);

// On macOS it's common to re-create a window in the app when the dock icon is clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
