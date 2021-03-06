const electron = require('electron')
// Module to control application life.
const app = electron.app
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow

const path = require('path')
const url = require('url')
const readline = require('readline');

const fs = require('fs'); 
const crypto = require('crypto');
const os = require('os');

const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1024, height: 768,icon: path.join(__dirname, 'assets/icons/64x64.png')})

  // and load the index.html of the app.
  /*mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))*/

  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  //mainWindow.webContents.openDevTools()

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

exports.selectDirectory = function (cb) {
  electron.dialog.showOpenDialog(mainWindow, {
    properties: ['openDirectory']
  }, cb)
}

exports.selectFile = function(cb){
  electron.dialog.showOpenDialog(mainWindow, {
    filters: [
      {name: 'Package file', extensions: ['json']}
    ]
  }, cb)
}

exports.saveTo = (name,cb)=>{
  electron.dialog.showSaveDialog(mainWindow,{defaultPath:`CR_${name}.md`},cb)
}

exports.readFile = function(path){
  return fs.readFileSync(path, 'utf8');
}

exports.fs = ()=>fs;

exports.app = ()=>app;

exports.mainWindow = ()=>mainWindow;

exports.getChecksum = (str)=>{
  return crypto
      .createHash('md5')
      .update(str, 'utf8')
      .digest('hex')
}
exports.readline = ()=> readline;
exports.os = ()=>os;