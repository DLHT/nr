const { app, dialog, BrowserWindow, file } = require('electron');
const { fs } = require('fs');
const { User } = require('./include/user.js');
const { AppConfig, AppSessions } = require('./include/app-config');
//setting global variable
let working_path;
let app_config_file = 'app-config.json';
let appSessions = new AppSessions();
//
app.on('ready', (launchInfo) => {
    working_path = app.getPath('userData')
    app_config_file = app.getPath('userData') + '/' + app_config_file;
    console.log(working_path);
    //loading application configuration
    appSessions.loadSessions(app_config_file);
    //
    logon();
});

app.on('window-all-closed', () => {
    app.quit();
});

function load_appConfig(app_config_file) {



}

function logon() {
    var logonWin = new BrowserWindow({ width: 600, height: 240, show: false });
    logonWin.setMenu(null);
    logonWin.on('closed', () => {
        logonWin = null;
    });
    logonWin.on('ready-to-show', () => {
        logonWin.show();
    });
    logonWin.loadURL(`file://${__dirname}/logon.html`);
}