// The "BrowserWindow" class is the primary way to create user interfaces
// in Electron. A BrowserWindow is, like the name suggests, a window.
//
// For more info, see:
// https://electronjs.org/docs/api/browser-window

const { app, BrowserView, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

app.whenReady().then(() => {

	let win = new BrowserWindow({
		autoHideMenuBar: true,
		darkTheme: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			devTools: false,
		}
	})
	app.on('window-all-closed', function () {
		if (process.platform !== 'darwin') app.quit()
	})

	// win.webContents.openDevTools()

	const view = new BrowserView({
		webPreferences: {
			partition: 'persist:scorn3',
			sandbox: true,
			devTools: false,
		}
	})
	win.addBrowserView(view)
	view.webContents.loadURL('https://web.telegram.org/z/',{
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
	})

	// const view = new BrowserView({
	// 	webPreferences: {
	// 		partition: 'persist:scorn3'
	// 	}
	// })
	// win.addBrowserView(view)
	// view.webContents.loadURL('https://web.telegram.org/z/',{
	// 	userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36'
	// })

	ipcMain.on('toMain', (event, data) => {
		console.log(data);
		if ('pnl_cntrpnl_size' == data.act) {
			view.setBounds({ x: 200, y: 0, width: data.w, height: data.h })
		}
	})

	win.loadFile('index.html')
})
