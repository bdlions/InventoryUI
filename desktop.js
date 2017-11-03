/**
 * Include our app
 */
const electron = require('electron');
// lifecycle of our app
const app = electron.app;
// create window for our app
const BrowserWindow = electron.BrowserWindow;


//const {app, BrowserWindow } = require('electron');
var path = require('path')

// browser-window creates a native window
let mainWindow = null;

app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
function createMenu() {
    var Menu = electron.Menu;
    var menuTemplate = [
        {
            label: 'File',
            submenu: [
                {label: 'New window', click: function () {
                        createSubWindow();
                    }},
                {type: "separator"},
                {label: 'Exit', click: function () {
                        app.quit();
                    }}
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {label: 'Cut', role: 'cut'},
                {label: 'Copy', role: 'copy'},
                {label: 'Paste', role: 'paste'}
            ]
        },
        {
            label: 'About',
            submenu: [
                {label: 'Name', click: function () {
                        console.log(app.getName());
                    }},
                {label: 'Version', click: function () {
                        console.log(app.getVersion());
                    }},
                {label: 'About', click: function () {
                        console.log('ToDo list');
                    }}
            ]
        },
        {
            label: 'Help'
        }
    ];

    var menuItems = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menuItems);
}
const createWindow = () => {
    // Initialize the window to our specified dimensions
//  mainWindow = new BrowserWindow({ titleBarStyle: 'customButtonsOnHover', frame: false, width: 1200, height: 900 });
    mainWindow = new BrowserWindow({
        width: 1200, height: 900,
        frame: false,
        center: true,
        toolbar: false,
        icon: path.join(__dirname, 'resources/images/app-icon.png')
    });

// createMenu();
    // Tell Electron where to load the entry point from
    mainWindow.loadURL('file://' + __dirname + '/desktop.html');

    // Open the DevTools.
//    mainWindow.webContents.openDevTools();

    // Clear out the main window when the app is closed
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.setMenu(null);
    mainWindow.setFullScreen(true);
//    mainWindow.webContents.closeDevTools();
//    mainWindow.webContents.openDevTools({detach: true});
};

app.on('ready', createWindow);

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
});

