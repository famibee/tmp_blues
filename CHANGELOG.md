# Change Log

## v2.21.1
- update: ライブラリ更新
	- @famibee/skynovel_esm@2.0.1
	- vite@8.0.0-beta.3
- build(vite.config.ts): vite v8 対応に
- fix: その他ビルド設定手直し
- remove(doc/prj/frames/_album.sn): [stopfadese] 使用箇所削除
## v2.21.0
- fix: フレーム画面でメモリリーク修正
	- doc/prj/frames/_album.htm
	- doc/prj/frames/_archive.htm
	- doc/prj/frames/_config.htm
	- doc/prj/frames/_log.htm
	- doc/prj/frames/_submenu.htm
	- doc/prj/frames/_yesno.htm
- fix: ライブラリ更新
## v2.20.0
- feat(doc/prj/theme/trial.sn): 「体験版はここまで」スクリプト追加
- feat(doc/prj/script/ss_000.sn): 【設定画面】-【テンプレ】で「体験版か」チェックを入れた場合、trial.sn に飛ぶ処理追加
- fix(setting.sn): 場所移動 doc/prj/script/ -> doc/prj/theme/
- fix: cjs テンプレ v2.20.0 相当
## v2.19.2
-fix(doc/prj/script/setting.sn): 体験版では初期タイトルを【タイトル + ' 体験版'】にするように
## v2.19.1
- fix: ESM化における修正
- fix: cjs テンプレ v2.19.0 相当
## v2.19.0
- feat(electron.vite.config.ts): アプリも自動リロード対応
- feat(src/CustomHmr.ts): json もファイル変更監視対象に
- fix(src/renderer/renderer.ts): 型名変更対応

- cjs テンプレ v2.19.0 相当
- feat(src/main/about-window.css): 「このアプリは……」ウインドウのデザインを調整できる css 追加
	- 「このアプリは……」でアイコンが出るか
		- アプリ起動
		- パッケージ版
	- 「このアプリは……」で css が使えるか
		- アプリ起動
		- パッケージ版
- fix(src/main/main.ts): 「このアプリは……」ウインドウを出し->閉じ->出しで内部エラーになる件
- fix(package.json): homepage 削除
	- 「このアプリは……」ウインドウに表示されるので
- fix(src/renderer/index.html): Content-Security-Policy に「data: blob:」追記
- fix(src/tsconfig.node.json): "types": ["electron-vite/node"] 追加
- fix(src/tsconfig.web.json): "types": ["electron-vite/node"] 追加
- fix: ライブラリ更新
	- doc/prj/frames/lib/bootstrap.min.css
	- doc/prj/frames/lib/bootstrap.min.js
## v2.18.8
- cjs テンプレ v2.18.8 相当
- fix(src/main/main.ts): 「このアプリは……」でアイコンが出ない件
- fix(src/main/main.ts): package.json から publisher を読み込むように
- fix(package.json): publisher 項目追加
## v2.18.3
- feat: .sn ファイル保存で自動リロードするように
## v2.18.2
- cjs テンプレ v2.18.6 相当
- fix(src/main/main.ts): システムメニュー名をアプリ名になど修正
- fix(doc/prj/script/sub.sn)
	- [grp se=] がファイル存在エラーにならない件修正
		- テンプレ修正（新旧）効果音ファイル名→音声ファイル名
	- [page key]指定を追加
- fix(doc/prj/frames/_submenu.sn): 不要な[page key]指定を削除
- fix(doc/prj/theme/ext_lang.sn): 多言語対応データ、ボタンの「強制スキップ」「自動読み進み」について追記
- fix: ライブラリ更新
	- Bootstrap v5.3.3 -> v5.3.8 に更新
	- fix(package.json): electron-builder を <26.0.15 指定し固定
		- 最新 electron-builder@26.0.20(beta) だとエラーになるため
		- ✅ v26.0.15 ok
		- ❌ v26.0.16 GH_TOKEN err
		- ❌ v26.0.17 nor using env "GH_TOKEN"
		- ❌ v26.0.18 Command failed: which python
		- ❌ v26.0.19 Command failed: which python
		- ❌ v26.0.20 Command failed: which python
-fix: 【 chk_exist_tw=true】削除
## v2.18.1 相当に更新（2025-05-11）
- fix: humane でエラーが出ていたのを修正
## v2.18.0
### 2025-01-10
- vite 6 系だと electron-vite によりバッチファイル系でエラーがわかりにくいのでしばし 5.4.11 で
### 2024-12-25
- electron-vite がサポートするまで、vite は 5 で
	- Vite 6 support · Issue #673 · alex8088/electron-vite https://github.com/alex8088/electron-vite/issues/673
### 2024-12-24
- vite の public フォルダではなく、既存の doc フォルダ名に合わせる
	- （既知の問題）ロード画面で画像ロード失敗する
### 2024-11-25
- web版でタイトル画面表示まで
### 2024-11-23
- Initial commit (ESM版として)
