/* ***** BEGIN LICENSE BLOCK *****
	Copyright (c) 2018-2025 Famibee (famibee.blog38.fc2.com)

	This software is released under the MIT License.
	http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import './bigbox.css';	// メンテされないので自前修正版
// import 'humane-js/themes/bigbox.css';
import type {T_PluginInitArg} from '@famibee/skynovel_esm';
import Humane from 'humane-js'

export async function init(pia: T_PluginInitArg) {
	// const Humane = await import('humane-js');	// この方式はできない
	Humane.baseCls = 'humane-bigbox';
	pia.addTag('notice', hArg=> {
		Humane.log(hArg.text ?? '');
		return false;
	});
}
