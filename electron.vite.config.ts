/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {defineConfig} from 'electron-vite'
import {builtinModules} from 'node:module';
import pkg from './package.json' with {type: 'json'};
import {CustomHmr} from './src/CustomHmr';

// 主処理・preloadでバンドルしてはいけないもの。electron-viteのプリセット（と
//	`externalizeDeps`）が同じ指定を持つはずだが **vite 8 では効いていない**ので、ここで明示する。
//	取り込まれると壊れる実例が2つ：
//	・electron本体（node_modules/electron/index.js＝バイナリの場所を返すCJSシム）。
//	  取り込むとシムが out/main/ を基準に path.txt を探し、見つからず
//	  「Electron failed to install correctly」で落ちる
//	・about-window。パッケージに同梱の about.html を __dirname 基準で開くので、
//	  取り込むと out/about.html を探して ERR_FILE_NOT_FOUND になる
const A_EXTERNAL = [
	'electron', /^electron\/.+/,
	// package.json の dependencies（＝実行時にnode_modulesから読ませるもの）
	...Object.keys(pkg.dependencies ?? {}).flatMap(d=> [d, new RegExp(`^${d}/.+`)]),
	...builtinModules.flatMap(m=> [m, `node:${m}`]),
];

export default defineConfig({
	main: {
		build: {
			rollupOptions: {
				input: {
					index: './src/main/main.ts',
				},
				external: A_EXTERNAL,
			},
			externalizeDeps: true,
		},
	},
	preload: {
		build: {
			rollupOptions: {
				input: {
					preload: './src/preload/preload.ts',
				},
				external: A_EXTERNAL,
				// **拡張子は.mjs**。package.jsonが type: module なので出力はESMになるが、
				//	ElectronはESMのpreloadを`.mjs`でしか受け付けない（.jsだとCJSとして読んで落ちる）。
				//	main.ts も `../preload/preload.mjs` を指している
				output: {format: 'es', entryFileNames: '[name].mjs'},
			},
			externalizeDeps: true,
		},
	},
	renderer: {
		plugins: [CustomHmr()],
		build: {
			target: 'esnext',
		},
		publicDir: '../../doc/',
	},
});
