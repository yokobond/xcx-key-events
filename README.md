English | [日本語](README.ja.md)

# xcx-key-events
keyboard events extension for Xcratch ([yokobond/xcratch: Extendable Scratch3 Programming Environment](https://github.com/yokobond/xcratch/))

## ✨ What You can Do with This Extension

Open [Example Project](https://xcratch.github.io/editor/#https://yokobond.github.io/xcx-key-events/examples/keyEvents.sb3) to look at what you can do with "Key Events" extension. 

This project using "Key Events" extension which add an extra-block "press key while 0 ms" to normal Scratch. This "press key while 0 ms" block dispatches a key-down event and then a single key-up event after the time, simulating holding the key without key repeat.

It also has blocks to operate the mouse on the stage. They change the mouse state of the project, so "mouse x", "mouse down?", "touching mouse-pointer?" and "when this sprite clicked" react to them.

- "move mouse pointer to x: 0 y: 0" moves the mouse pointer.
- "press mouse at x: 0 y: 0 for 100 ms" presses the mouse button at the position and releases it after the time.
- "press / release mouse button" presses or releases the mouse button at the current position.
- "drag mouse from x: 0 y: 0 to x: 100 y: 0 in 500 ms" drags the mouse. A sprite which is set "draggable" is dragged with the mouse pointer. Moving the pointer while the button is pressed also drags it.

In the example project, the "Draggable" sprite clicks "Sprite1" and then drags itself twice when the green flag is clicked.

## How to Add This Extension

Open [Xcratch](https://github.com/yokobond/xcratch/) and choose "Extension Loader" in the extension list then input the URL as follows. 

```
https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs
```

## Development

This project is developed with [scratch-editor](https://github.com/xcratch/scratch-editor) placed next to this repository.

```text
workspace/
|- scratch-editor/
`- xcx-key-events/
```

### Install Dependencies

```sh
npm install
```

### Setup Development Environment

Link `extension-support` and `util` of the local scratch-vm into `src/vm`.

```sh
npm run setup-dev
# or specify the path of scratch-vm
npm run setup-dev -- <path-to>/scratch-editor/packages/scratch-vm
```

### Bundle into a Module

```sh
npm run build   # build once
npm run watch   # rebuild on changes
```

Output: `dist/keyEvents.mjs`

### Test

```sh
npm test
```

### Debug

Run the "debug extension on xcratch.github.io editor" launch configuration in VS Code. It serves this repository at `https://0.0.0.0:5500/` (needs `.vscode/localhost.pem` and `.vscode/localhost-key.pem` made by mkcert) and opens the editor with `?extension=https://0.0.0.0:5500/dist/keyEvents.mjs`.

## Author

👤 **Koji Yokokawa**

* Website: http://lab.yengawa.com/
* Github: [@yokobond](https://github.com/yokobond)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/yokobond/xcx-key-events/issues). 
## Show your support

Give a ⭐️ if this project helped you!


## 📝 License

Copyright © 2021 [Koji Yokokawa](https://github.com/yokobond).<br />
This project is [MIT](https://github.com/yokobond/xcx-key-events/blob/master/LICENSE) licensed.
