const { Client, Authenticator } = require('minecraft-launcher-core');
const {app, BrowserWindow,ipcMain, dialog} = require('electron');
const fs = require('fs');

const log = require('electron-log');
const {autoUpdater} = require("electron-updater");

let OSname = require("os").userInfo().username;

let launchable = "true";
let mainWindow, consoleW = null;

function createWindow () {

    // Create the browser windows.
    mainWindow = new BrowserWindow({
        frame:false, 
        show:true, 
        width:1300, 
        height:750, 
        backgroundColor:"#2f3640",
        webPreferences: {
            nodeIntegration: true
        }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('assets/views/app.html');

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

ipcMain.on('launch', (event, args) => {
    console.log(args);

    let settings;

    if(fs.existsSync(`C:/Users/${OSname}/Documents/.slpmods`)){
        if(fs.existsSync(`C:/Users/${OSname}/Documents/.slpmods/settings.json`)){   
            settings = JSON.parse(fs.readFileSync('C:/Users/'+OSname+'/Documents/.slpmods/settings.json', "utf8"));
        }else{
            fs.writeFileSync(`C:/Users/${OSname}/Documents/.slpmods/settings.json`,JSON.stringify({email:'undefined', password:'undefined', min:512, max:4096, enableUpdate:'true', console:'false'}));
        }
    }else{
        fs.mkdirSync(`C:/Users/${OSname}/Documents/.slpmods`);
    }

    console.log(settings);
    console.log(args);

    //Data Validation
    if(settings === undefined) return dialog.showErrorBox('Du hast keinen Account angegeben!', 'Da wir jetzt erst eine settings.json erstellt haben, \nSolltest du vorher doch lieber in den einstellungen deinen account angeben!');
    if(settings.email === 'undefined') return dialog.showErrorBox('Da fehlt noch was!', 'Deine Account daten sind unvollständig.\nGehe in die Einstellungen um das zu ändern (Email)');
    if(settings.password === 'undefined') return dialog.showErrorBox('Da fehlt noch was!', 'Deine Account daten sind unvollständig.\nGehe in die Einstellungen um das zu ändern (Password)');
    
    let packName = args[0];

    console.log(packName);
    //Option definition
    if(!settings[packName]){  settings[packName] = { version:'download' }; }else{ settings[packName].version = args[3];}
    let opts;
    console.log(args);
    if(settings[packName].version === args[3]){
        opts = {
            authorization: Authenticator.getAuth(settings.email, settings.password),
            clientPackage: null,
            root: "C:/Users/"+OSname+"/Documents/.slpmods/"+args[0],
            os: "windows",
            version: {
                number: args[1],
                type: "release"
            },
            forge:"C:/Users/"+OSname+"/Documents/.slpmods/"+args[0]+"/bin/forge.jar",
            memory: {
                max: settings.max,
                min: settings.min
            }
        }
        settings[packName].version = args[3];
    }else{
        opts = {
            authorization: Authenticator.getAuth(settings.email, settings.password),
            clientPackage: args[2],
            root: "C:/Users/"+OSname+"/Documents/.slpmods/"+args[0],
            os: "windows",
            version: {
                number: args[1],
                type: "release"
            },
            forge:"C:/Users/"+OSname+"/Documents/.slpmods/"+args[0]+"/bin/forge.jar",
            memory: {
                max: settings.max,
                min: settings.min
            }
        }
    }

    consoleW = new BrowserWindow({
        frame:false, 
        show:false, 
        width:1300, 
        height:700, 
        backgroundColor:"#2f3640",
        webPreferences: {
            nodeIntegration: true
        }
    });

    consoleW.loadFile('assets/views/console.html');

    const launcher = new Client();
    if(launchable === "true"){

        console.log(args);
        console.log(settings);
        launcher.launch(opts);

        launchable = "false";
        if(settings.console == 'true'){
            consoleW.show();
        }
    }else{ 
        return dialog.showErrorBox('Das Spiel Läuft schon!', 'Das Spiel ist schon gestartet.\nSchließe dein Spiel um ein neues zu starten!');
    }

    fs.writeFile(`C:/Users/${OSname}/Documents/.slpmods/settings.json`, JSON.stringify(settings), (err) => {
        if (err) console.log(err)
    });

    launcher.on('close',() => {
        launchable = "true";
        consoleW.webContents.send('console-output', 'Minecraft terminated');    
    });
    launcher.on('debug', (e) => {
        console.log(e)
        consoleW.webContents.send('console-output', e);    

    });
    launcher.on('data', (e) => {
        console.log(e.toString('utf-8'))
        consoleW.webContents.send('console-output', e.toString('utf-8'));    

    });
    launcher.on('error', (e) => {
        console.log(e.toString('utf-8'))
        consoleW.webContents.send('console-output', e.toString('utf-8'));    

    });
});

/**
 * AUTOUPDATER
 * Uses github to Update The Software
 * Repo gets read from package.json
 */

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

function sendStatusToWindow(text) {
    log.info(text);
    ipcMain.on('message', function (event, text) {
        addItem(args); // we don't care process
        event.sender.send("message", text);
    })
}

autoUpdater.on('checking-for-update', () => {
    sendStatusToWindow('Checking for update...');
});

autoUpdater.on('update-available', () => {
    sendStatusToWindow('Update available.');
});

autoUpdater.on('update-not-available', () => {
    sendStatusToWindow('Update not available.');
});

autoUpdater.on('error', (err) => {
    sendStatusToWindow('Error in auto-updater. ' + err);
});

autoUpdater.on('download-progress', (progressObj) => {

    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    sendStatusToWindow(log_message);
});

autoUpdater.on('update-downloaded', () => {
    fs.writeFileSync(`C:/Users/${OSname}/Documents/.slpmods/version.json`,JSON.stringify({read:"true"}));
    mainWindow.webContents.send("Update-Found",'true')
    
    //Looks for the Settings file if none is generated create and read it 
    let settings;

    if(fs.existsSync(`C:/Users/${OSname}/Documents/.slpmods`)){
        if(fs.existsSync(`C:/Users/${OSname}/Documents/.slpmods/settings.json`)){   
            settings = JSON.parse(fs.readFileSync('C:/Users/'+OSname+'/Documents/.slpmods/settings.json', "utf8"));
        }else{
            fs.writeFileSync(`C:/Users/${OSname}/Documents/.slpmods/settings.json`,JSON.stringify({email:'undefined', password:'undefined', min:512, max:4096, enableUpdate:'true', console:'false'}));
        }
    }else{
        fs.mkdirSync(`C:/Users/${OSname}/Documents/.slpmods`);
    }

    //Validate the settings file
    if(settings != undefined){
        //look if the user enabled auto updating
        if(settings.enableUpdate === "true"){
            dialog.showMessageBox(dialogOpts, (response) => {
                autoUpdater.quitAndInstall();
            });
        }else{
            return;
        }
    }else{
        return;
    }
});


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () =>{ 
    createWindow(); 
    autoUpdater.checkForUpdates();
});
// Quit when all windows are closed.
app.on('window-all-closed', function () { app.quit(); });
app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) { createWindow(); }
});