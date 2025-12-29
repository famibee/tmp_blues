/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2024-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {defineConfig} from 'electron-vite'
import {CustomHmr} from './src/CustomHmr';

export default defineConfig({
	main: {
		build: {
			rollupOptions: {
				input: {
					index: './src/main/main.ts',
				},
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
