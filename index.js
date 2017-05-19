const { app, BrowserWindow, Menu } = require('electron');

let mainWindow;
let addWindow;
const macOS = process.platform === 'darwin';

app.on('ready', () => {
  mainWindow = new BrowserWindow({});
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
});

const createAddWindow = () => {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: 'Add New Todo'
  });
  addWindow.loadURL(`file://${__dirname}/add.html`);
};

const menuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'New Todo',
        accelerator: macOS ? 'Command+N' : 'Ctrl+N',
        click() { createAddWindow(); }
      },
      {
        label: 'Quit',
        accelerator: macOS ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        }
      }
    ]
  }
];

if (macOS) {
  menuTemplate.unshift({});
}
