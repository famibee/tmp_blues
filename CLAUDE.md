# tmp_blues — BlueSNovel プロジェクト

ノベルゲームエンジン **BlueSNovel**（`@famibee/bluesnovel`）のプロジェクト。
シナリオは `doc/prj/script/*.sn` に書く。


## `.sn` を書く前に必ず見る3つ

### 1. `doc/prj/path.json` — 使える素材名の一覧

**ここに無い名前を書いてはいけない。** 画像・音声はパスも拡張子も書かず、
**名前だけ**で参照する。

```json
"black": {":cnt": 1, "png": "bg/black.png"}
```

```
[grp bg=white]      ← path.json に "white" があるから書ける
[bgm fn=free32]     ← 同上
```

**このファイルは VSCode 拡張機能が自動生成する。手で編集しない。**
`doc/prj/` 配下に素材ファイルを置けば自動で更新される。

### 2. `doc/prj/script/main.sn` と `sub.sn` — このプロジェクトのマクロ定義

**重要**：`[grp]` `[bgm]` `[se]` `[wc]` などは**組み込みタグではなく、
このテンプレートが定義したマクロ**。引数は組み込みタグと違うことがある。
使う前に定義を読むこと。

```
[macro name=lr nowarn_unused=true]
	[ws buf=VOICE canskip=true stop=false cond='sn.auto.enabled && !sn.skip.enabled']
	[wq]
	[l]
[endmacro]
```

マクロ名は日本語も使える（例：`[アルバム解放 name=free32]`）。

### 3. タグリファレンス

https://famibee.github.io/bluesnovel/tag.html#タグ名

**SKYNovel のリファレンス（famibee.github.io/SKYNovel/）ではない。**
BlueSNovel にしか無いタグ（`grplay` `set_cancel_skip` `stopfadese` `txtlay` など）が
あるため、SKYNovel 側を見ると誤る。

VSCode で SKYNovel 拡張機能を入れていれば、タグにホバーすると同じ内容が出る
（v4.31.2 以降、プロジェクトのエンジンを判定して BlueSNovel 側を指す）。


## `.sn` の記法（実物から読み取れる分）

| 記法 | 意味 |
|---|---|
| `[name attr=val]` | タグ／マクロの呼び出し |
| `; …` | 行コメント |
| `*name` | ラベル |
| `&式` | 式の評価・代入（例：`&s = const.sn.config.window.height > …`） |
| `cond='…'` | 条件付き実行。どのタグにも付けられる |
| `[char2macro char=@ name=lr]` | 1文字をマクロの別名にする。以降、本文中の `@` が `[lr]` になる |

このテンプレートでは `@` → `lr`、`\` → `plc` が割り当て済み。

**多言語**：素材は `@@` 、スクリプトは `@@@` を名前の後ろに付ける。

```
title@@cn          ← 素材（path.json 内）
ss_000@@@cn.sn     ← スクリプト
```


## 触ってはいけないもの

- `doc/prj/path.json` … 拡張機能が生成する
- `src/web.ts` の `new SysWeb(hPlg);` … 拡張機能がビルド時に置換する
  （ソース中にも「触らない」とコメントがある）
- `pass.json` … 暗号化の鍵情報
