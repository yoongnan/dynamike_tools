const { app, BrowserWindow } = require('electron')

let win;

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    // width: 600, 
    // height: 600,
    backgroundColor: '#ffffff',
    icon: `file://${__dirname}/www/assets/logo.png`
  })


  win.loadURL(`file://${__dirname}/Www/index.html`)

  //// uncomment below to open the DevTools.
  // win.webContents.openDevTools()

  win.maximize();
  win.show();
  
  // Event when the window is closed.
  win.on('closed', function () {
    win = null
  })
}

// Create window on electron initialization
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})