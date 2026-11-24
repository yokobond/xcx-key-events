[English](README.md) | 日本語

# xcx-key-events
[Xcratch](https://github.com/yokobond/xcratch/)（拡張可能な Scratch3 プログラミング環境）用のキーボードイベント拡張機能です。

## ✨ この拡張機能でできること

[サンプルプロジェクト](https://xcratch.github.io/editor/#https://yokobond.github.io/xcx-key-events/examples/keyEvents.sb3)を開くと、「Key Events」拡張機能でできることを確認できます。

このプロジェクトでは、通常の Scratch に「[スペース] キーを 0 ミリ秒間押す」ブロックを追加する「Key Events」拡張機能を使っています。このブロックはキーを押したイベントを発生させ、指定した時間の後にキーを離したイベントを 1 回だけ発生させます。キーリピートなしでキーを押し続けた状態を再現できます。

ステージ上でマウスを操作するブロックもあります。これらはプロジェクトのマウスの状態を変えるので、「マウスのx座標」「マウスが押された」「マウスのポインターに触れた」「このスプライトが押されたとき」がそれに反応します。

- 「マウスのポインターを x座標:0 y座標:0 へ動かす」はマウスのポインターを動かします。
- 「x座標:0 y座標:0 でマウスを 100 ミリ秒間押す」は指定した位置でマウスボタンを押し、指定した時間の後に離します。
- 「マウスボタンを 押す / 離す」は現在の位置でマウスボタンを押す、または離します。
- 「x座標:0 y座標:0 から x座標:100 y座標:0 まで 500 ミリ秒でドラッグする」はマウスをドラッグします。「ドラッグできる」に設定されたスプライトはマウスのポインターと一緒にドラッグされます。ボタンを押したままポインターを動かしてもドラッグされます。

サンプルプロジェクトでは、緑の旗をクリックすると「Draggable」スプライトが「Sprite1」をクリックし、そのあと自分自身を 2 回ドラッグします。

## 拡張機能の追加方法

[Xcratch](https://github.com/yokobond/xcratch/) を開き、拡張機能の一覧から「Extension Loader」を選んで、次の URL を入力してください。

```
https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs
```

## 開発

このプロジェクトは、このリポジトリの隣に置いた [scratch-editor](https://github.com/xcratch/scratch-editor) を使って開発します。

```text
workspace/
|- scratch-editor/
`- xcx-key-events/
```

### 依存パッケージのインストール

```sh
npm install
```

### 開発環境のセットアップ

ローカルの scratch-vm の `extension-support` と `util` を `src/vm` にリンクします。

```sh
npm run setup-dev
# または scratch-vm のパスを指定する
npm run setup-dev -- <path-to>/scratch-editor/packages/scratch-vm
```

### モジュールへのバンドル

```sh
npm run build   # 1 回ビルドする
npm run watch   # 変更のたびに再ビルドする
```

出力: `dist/keyEvents.mjs`

### テスト

```sh
npm test
```

### デバッグ

VS Code で「debug extension on xcratch.github.io editor」の起動構成を実行します。このリポジトリを `https://0.0.0.0:5500/` で配信し（mkcert で作成した `.vscode/localhost.pem` と `.vscode/localhost-key.pem` が必要です）、`?extension=https://0.0.0.0:5500/dist/keyEvents.mjs` を付けてエディタを開きます。

## 作者

👤 **Koji Yokokawa**

* Website: http://lab.yengawa.com/
* Github: [@yokobond](https://github.com/yokobond)

## 🤝 コントリビューション

コントリビューション、Issue、機能リクエストを歓迎します！<br />[Issue ページ](https://github.com/yokobond/xcx-key-events/issues)をお気軽にご確認ください。

## 応援する

このプロジェクトが役に立ったら ⭐️ をお願いします！


## 📝 ライセンス

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
このプロジェクトは [MIT](https://github.com/yokobond/xcx-key-events/blob/master/LICENSE) ライセンスです。
