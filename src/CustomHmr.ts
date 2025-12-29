/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2025-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import type {PluginOption} from 'vite';

// .sn など更新リロード用
export function CustomHmr(): PluginOption {return {
	name	: 'custom-hmr',
	enforce	: 'post',
	handleHotUpdate({file, server}) {
		if (/\.(ss?n|bin|webp|jpe?g|png|mp3|m4a|ogg|aac|flac|wav|html?|json)$/.test(file)) {
			console.log('reloading...');
			
			server.ws.send({type: 'full-reload', path: '*'});
		}
	},
}}
