const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
    // set timeout to render the window not until the Angular
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window.
        win = new BrowserWindow({
            width: 400,
            height: 400,
            icon: './src/favicon.ico',
            resizable: false,
            autoHideMenuBar: true
        });

        win.setAlwaysOnTop(true, 'screen');

        // and load the app.
        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
            slashes: true
        }));

        //win.webContents.openDevTools();

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

//app.commandLine.appendSwitch('ignore-certificate-errors')
// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});
