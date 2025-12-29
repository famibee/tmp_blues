/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

// electron メインプロセス
import {crashReporter, app, type BrowserWindow, Menu} from 'electron';
import {resolve} from 'node:path';
import {electronApp, optimizer, is, platform} from '@electron-toolkit/utils';
const {default: openAboutWindow} = require('about-window');

const package_json_dir = resolve(__dirname, '../../');
import pkg from '../../package.json' with {type: 'json'};
app.name = pkg.name;	// 非パッケージだと 'Electron' になる件対応
app.setPath('userData', app.getPath('appData') +'/'+ app.name);

// メニューの「このアプリについて」のデザイン
// @ts-ignore
import icon_path from '../../doc/icon.png?url&asset';
	// VSCode エラーが出るが、パッケージ版でも正しくアイコンが表示される
// @ts-ignore
import css_path from '../../src/main/about-window.css?url&asset';
	// VSCode エラーが出るが、パッケージ版でも正しくcssが適用される


crashReporter.start({
	productName	: app.name,
	companyName	: pkg.publisher,
	submitURL	: pkg.homepage,
	compress	: true,
});
if (! app.requestSingleInstanceLock()) app.quit();

let guiWin: BrowserWindow | null = null;
app.on('second-instance', ()=> {
	if (! guiWin) return;

	if (guiWin.isMinimized()) guiWin.restore();
	guiWin.focus();
});
app.whenReady().then(async ()=> {
	// Set app user model id for windows
	electronApp.setAppUserModelId(pkg.appId);

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, win)=> optimizer.watchWindowShortcuts(win));

	const {appMain} = await import('@famibee/bluesnovel/appMain');
	const w = guiWin = appMain.initRenderer(
		resolve(__dirname, '../preload/preload.mjs'),
		pkg.version,
	)
	.on('close', ()=> app.exit());

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	const urlEr = process.env['ELECTRON_RENDERER_URL'];
	if (is.dev && urlEr) w.loadURL(urlEr);
	else w.loadFile(resolve(__dirname, '../renderer/index.html'));
	// else w.loadFile('./index.html');		とかはダメ（2025/01/05）

	const isMac = platform.isMacOS;
	const wc = w.webContents;
	const menu = Menu.buildFromTemplate([{
		label: app.name,
		submenu: [
			{label: 'このアプリについて', click: ()=> openAboutWindow({
				icon_path,
				package_json_dir,
				copyright	: 'Copyright '+ pkg.appCopyright +' 2025',
				// description	: ' ',	// 詳細が不要ならコメントイン
				license		: '',
				use_version_info	: false,
				css_path,
			})},
			{type: 'separator'},
			{label: '設定', click: ()=> wc.send('fire', 'c'), accelerator: "CmdOrCtrl+,"},
			{label: '全画面/ウインドウモード切替', click: ()=> wc.send('fire', 'alt+enter'), accelerator: 'F11'},
			{label: 'ウインドウサイズを初期に戻す', click: ()=> wc.send('fire', 'Meta+0')},
			{type: 'separator'},
			{label: 'メッセージを消す', click: ()=> wc.send('fire', ' ')},
			{label: 'メッセージ履歴の表示', click: ()=> wc.send('fire', 'r')},
			{label: '次の選択肢・未読まで進む', click: ()=> wc.send('fire', 'f')},
			{label: '自動的に読み進む', click: ()=> wc.send('fire', 'a')},
			{type: 'separator'},
			{label: 'DevTools', click: ()=> wc.openDevTools(), accelerator: 'F12'},
			isMac ?{role: 'close'} :{role: 'quit'},
		],
	}]);
	Menu.setApplicationMenu(menu);
});
