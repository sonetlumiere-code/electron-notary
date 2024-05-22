import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'
import { LegalPersonDataSheet, PersonDataSheet, User } from '../shared/types'
import { createLegalPerson, getLegalPersons } from './lib/sqlite/crud/legal-person-data-sheet'
import {
  createPerson,
  deletePerson,
  getPersons,
  searchPersons
} from './lib/sqlite/crud/person-data-sheet'
import { createUser, getUsers } from './lib/sqlite/crud/user'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    center: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: true,
      contextIsolation: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  ipcMain.handle('create-user', (_event, data: User) => {
    const user = createUser(data)
    return user
  })

  ipcMain.handle('get-users', () => {
    const users = getUsers()
    return users
  })

  ipcMain.handle('create-person', (_event, data: PersonDataSheet) => {
    const person = createPerson(data)
    return person
  })

  ipcMain.handle('get-persons', () => {
    const persons = getPersons()
    return persons
  })

  ipcMain.handle('delete-person', (_event, id: number) => {
    const res = deletePerson(id)
    return res
  })

  ipcMain.handle('search-persons', (_event, filters: Partial<PersonDataSheet>) => {
    const persons = searchPersons(filters)
    return persons
  })

  ipcMain.handle('create-legal-person', (_event, data: LegalPersonDataSheet) => {
    const legalPerson = createLegalPerson(data)
    return legalPerson
  })

  ipcMain.handle('get-legal-persons', () => {
    const legalPersons = getLegalPersons()
    return legalPersons
  })

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
