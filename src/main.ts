import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'

let mainWindow
const detailWindows = []

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true
    },
    width: 1920,
    height: 1080
  })

  mainWindow.loadFile(path.join(__dirname, '../index.html'))
  mainWindow.maximize()
  mainWindow.removeMenu()

  // TODO: remove
  mainWindow.webContents.openDevTools()
}

// Open detail window
ipcMain.handle('createDetailWindow', (event, params) => {
  const browerWindow = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, './views/detail.js'),
      nodeIntegration: true
    },
    width: 1280,
    height: 720
  })

  browerWindow.loadFile(path.join(__dirname, '../detail.html'))
  browerWindow.removeMenu()
  browerWindow.webContents.send('init-data', params)

  // TODO: remove
  browerWindow.webContents.openDevTools()

  detailWindows.push(browerWindow)
})


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
