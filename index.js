const {app, BrowserWindow, Tray, ipcMain, nativeImage} = require('electron');

const trayImage = nativeImage.createFromPath(`${__dirname}\\logo.ico`);
let win = null, tray = null;

function createWindow() {
    if (win) return;
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: `${__dirname}\\logo.ico`
    });
    win.loadURL(`file://${__dirname}/index.html`);
    //win.webContents.openDevTools();
    win.setMenu(null);
    win.on('closed', () => {
        win = null;
        closeApp();
    });
}

function firstRun() {
    createWindow();
    if (!tray) {
        tray = new Tray(trayImage);
        tray.setToolTip('Video size reducer');
        tray.on('click', createWindow);
    }
}

function closeApp() {
    tray.destroy();
    app.exit();
}

app.on('ready', firstRun);

app.on('window-all-closed', (e) => {
    e.preventDefault();
});

app.on('activate', () => {
    if (win === null) {
        firstRun();
    }
});