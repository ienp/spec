import { app, BrowserWindow, shell, ipcMain } from 'electron'
import { release } from 'node:os'
import { join } from 'node:path'

process.env.DIST_ELECTRON = join(__dirname, '..')
process.env.DIST = join(process.env.DIST_ELECTRON, '../dist')
process.env.PUBLIC = 'http://127.0.0.1:4043/'
  ? join(process.env.DIST_ELECTRON, '../public')
  : process.env.DIST

// Disable GPU Acceleration for Windows 7
if (release().startsWith('6.1')) app.disableHardwareAcceleration()

// Set application name for Windows 10+ notifications
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

// 删除警告
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow | null = null
const preload = join(__dirname, '../preload/index.js')
const url = 'http://127.0.0.1:4043/'
const indexHtml = join(process.env.DIST, 'index.html')

async function createWindow() {
  console.log(join(process.env.PUBLIC, '/logo.svg'))
  win = new BrowserWindow({
    width: 1440,
    height: 1000,
    title: 'Spec - 新一代Markdown 编辑器',
    icon: 'public/logo.svg',
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (app.isPackaged) {
    win.loadFile(indexHtml)
  } else {
    win.loadURL(url)
    win.webContents.openDevTools()
  }

  // Test actively push message to the Electron-Renderer
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // 所有链接在浏览器中打开，不使用应用程序
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url)
    return { action: 'deny' }
  })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  win = null
  if (process.platform !== 'darwin') app.quit()
})

app.on('second-instance', () => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.focus()
  }
})

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows()
  if (allWindows.length) {
    allWindows[0].focus()
  } else {
    createWindow()
  }
})

/*
 * 创建新窗口
 * @param arg: string 展示路由路径
 * @param width: number 窗口宽度
 * @param height: number 窗口高度
 * */
function createNewWindow(arg: string, width: number = 500, height: number = 600) {
  const childWindow = new BrowserWindow({
    width,
    height,
    frame: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      preload,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  if (process.env.PUBLIC) {
    console.log(`${url}#/${arg}`)
    childWindow.loadURL(`${url}#${arg}`)
    childWindow.webContents.openDevTools()
  } else {
    childWindow.loadFile(indexHtml, { hash: '' })
  }
}

ipcMain.on('open-win', (_, arg, width, height) => {
  console.log(arg)
  createNewWindow(arg, width, height)
})
