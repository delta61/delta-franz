// The "BrowserWindow" class is the primary way to create user interfaces
// in Electron. A BrowserWindow is, like the name suggests, a window.
//
// For more info, see:
// https://electronjs.org/docs/api/browser-window

const { app, BrowserWindow, BrowserView, ipcMain, Menu, Tray, nativeImage } = require('electron')
const path = require('path')

app.whenReady().then(() => {

	let win = new BrowserWindow({
		// skipTaskbar: true,
		autoHideMenuBar: true,
		darkTheme: true,
		icon: './tpl/images/trayicon.png',
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: false,
		}
	})
	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') app.quit()
	})

	// win.webContents.openDevTools()

	win.loadFile('index.html')

	ipcMain.on('toMain', (event, data) => {
		if (
			'pnl_cntrpnl_size' == data.act
			&& view
			&& data.w
			&& data.h
		) {
			data.w = Math.round(data.w);
			data.h = Math.round(data.h);
			console.log(view);
			view.setBounds({ x: 200, y: 0, width: data.w, height: data.h })
		}
	})

	const view = new BrowserView({
		webPreferences: {
			partition: 'persist:telega1',
			sandbox: true,
			devTools: false,
		}
	})
	win.addBrowserView(view)
	view.setBounds({ x: 200, y: 0, width: 300, height: 300 })
	view.webContents.loadURL('https://web.telegram.org/z/',{
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
	})

	const template = [
		{
			label: 'Файл',
			submenu: [
				{
					label: 'Закрыть',
					role: 'quit'
				}
			]
		},
	]
  
	const menu = Menu.buildFromTemplate(template)
	Menu.setApplicationMenu(menu)

	tray = new Tray('./tpl/images/trayicon.ico')
  
	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Закрыть', role: 'quit' },
	  ])
  
	tray.setToolTip('Xuyanz')
	tray.setContextMenu(contextMenu)

	tray.on('double-click',()=>{
		win.restore()
	})
})
