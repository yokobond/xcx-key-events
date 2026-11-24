import BlockType from '../../extension-support/block-type';
import ArgumentType from '../../extension-support/argument-type';
import Cast from '../../util/cast';
import translations from './translations.json';

/**
 * Formatter which is used for translation.
 * This will be replaced which is used in the runtime.
 * @param {object} messageData - format-message object
 * @returns {string} - message for the locale
 */
let formatMessage = messageData => messageData.default;

/**
 * Setup format-message for this extension.
 */
const setupTranslations = () => {
    if (!formatMessage.setup) return;
    const localeSetup = formatMessage.setup();
    if (localeSetup && localeSetup.translations[localeSetup.locale]) {
        Object.assign(
            localeSetup.translations[localeSetup.locale],
            translations[localeSetup.locale]
        );
    }
};

const EXTENSION_ID = 'keyEvents';

/**
 * URL to get this extension as a module.
 * When it was loaded as a module, 'extensionURL' will be replaced a URL which is retrieved from.
 * @type {string}
 */
let extensionURL = 'https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs';

/**
 * Icon png to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADUAAAA1CAYAAADh5qNwAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAABDxJREFUaIHtmMtLa1cUh78kanzcqlRzER/UFgTBBz5SnFgsBUvRmU7EgVSKM4WCIOhEaC06UQrFP8CxOHEgBbHYQieKCKIiQiQJErkxxtxEbNLjyergJtZoYl4ntpH8IJBzstdvry85e+21oxMRXpv0/3UCmVAOKluUg8oW5aCyRTmobFFeBjyLgMIkxvuBvzTNQES0fC2JiCrJSRWRn7XMQ6dh7/cR8B7QpfLdAh8DHi0S0XJNFZEaEKG4Yq0SeZFCoSgKy8vL+P3+l5hO0zX1NtqCCQaDMjIyIoAMDg6KqsZcctVa5ZJxqLm5OeHDmhFApqenMw6V8cevr6+PiYkJAMbGxhgYGMj0lJmHam9vp7GxEYCGhgbMZnOmp3ydHcWLQPX29rKwsEB/f/9LTKfp5vsWeJdGfA3g0CKRV/n4ad7QKoqC3W6nsDB+TxsIBKitraWgoEDTHLSE8osIR0dHeDyJt3Aej4e2tjb0er1mnbqWj5/Xbrf/ngwQgNfrxWaz/Qlca5WIloUCgNvb22pVVd8kOt5gMNwUFxdrUiDCegilA74EKpOIF2AXsIWu3wBfAcYkPALAb8BN6PoT4HOS6/hdwHYon4je74dYTVkc3YjIZyGP3RQ99kREJyKfhvxS0ZxE6f2+TuKbeagS4AugAki1B+rgwz7XHfJLRd+E3zyEMqRoBh+qaDrx4fnT8biPTaj6+Xy+NOaCjY0NzGYza2trafl4vd6Exj0LFQwGmZqaYnJyMq1krFYre3t7nJ2dpeUzOzvL+Pg4qqo+Oy7m5nt3d8fw8DCrq6vU1NTQ29sLQEtLC0tLS2kll4xmZmbY3d0F4PT0FLvdjt1uZ3V1FaMxRpGVf6tfROW6urqSqqqqiFMrIGazOVrl+U5inHwXFxelu7tbAOnq6pL5+flY1ataRL59fLOnp+dJDpWVleJwOB4P3Q+zxIQSETk/P5fm5mYZGhoSi8UiFotF3G53UlA7OztiNBoFEIPBIJubm0lBXV9f3889Ojoq9fX1cnJyEi0+Maiw6dbWVqxE4kKJiKyvr0teXp6srKw85xEV6qG2t7fl8vIy1seJQyWoZ6FERFwuVzyPuFBxdA/1YuepioqKl5rqKZRo3OBmWtHyjSjpqqqyv78PgE73fD+pKApVVVXU19dH3Pf5fBwcHCR0SPT7/TQ1NVFeXh5x32az4XA44h4eRQRVVeno6CA/Pz8qlPP4+Jibm5un0TFktVopKSnBZDK9A7yKovx9eHhYoCgKiqIk5HF8fExnZ6diNBo9gNPtdmO1WhERAoFAwh6tra3O8A9xD+V0On8COkpLS8tjBT+WXq8Put3uPZPJtAEELy4u5ouKir43xtwVo3oEnE7nL3V1dbfAry6X64+ysjJzMBhMeL3r9fr3LpfrR5PJBGTgkPh/0Kv8NykHlS3KQWWLclDZohxUtugfqhKr0EH5qJcAAAAASUVORK5CYII=';

/**
 * Extended keyboard events for Xcratch.
 */
class KeyEventsBlocks {
    /**
     * A translation object which is used in this class.
     * @param {FormatObject} formatter - translation object
     */
    static set formatMessage (formatter) {
        formatMessage = formatter;
        if (formatMessage) setupTranslations();
    }

    /**
     * @return {string} - the name of this extension.
     */
    static get EXTENSION_NAME () {
        return 'Key Events';
    }

    /**
     * @return {string} - the ID of this extension.
     */
    static get EXTENSION_ID () {
        return EXTENSION_ID;
    }

    /**
     * URL to get this extension.
     * @type {string}
     */
    static get extensionURL () {
        return extensionURL;
    }

    /**
     * Set URL to get this extension.
     * @param {string} url - URL
     */
    static set extensionURL (url) {
        extensionURL = url;
    }

    /**
     * Construct a set of blocks for Key Events.
     * @param {Runtime} runtime - the Scratch 3.0 runtime.
     */
    constructor (runtime) {
        /**
         * The Scratch 3.0 runtime.
         * @type {Runtime}
         */
        this.runtime = runtime;

        if (runtime.formatMessage) {
            // Replace 'formatMessage' to a formatter which is used in the runtime.
            formatMessage = runtime.formatMessage;
        }

        this.stopAll = this.stopAll.bind(this);
        if (this.runtime) {
            this.runtime.on('PROJECT_STOP_ALL', this.stopAll);
        }

        /**
         * All processing key event now.
         */
        this.keyProcesses = {};

        /**
         * Mouse state which is controlled by this extension.
         * @type {object}
         */
        this.mouseState = {
            isDown: false,
            downX: 0,
            downY: 0,
            dragCandidate: null,
            dragOffsetX: 0,
            dragOffsetY: 0,
            dragTarget: null
        };

        /**
         * Running mouse process (click or drag) now.
         * @type {?object}
         */
        this.mouseProcess = null;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        setupTranslations();
        return {
            id: KeyEventsBlocks.EXTENSION_ID,
            name: KeyEventsBlocks.EXTENSION_NAME,
            extensionURL: KeyEventsBlocks.extensionURL,
            blockIconURI: blockIconURI,
            showStatusButton: false,
            blocks: [
                {
                    opcode: 'pressKeyWhile',
                    blockType: BlockType.COMMAND,
                    blockAllThreads: false,
                    text: formatMessage({
                        id: 'keyEvents.pressKeyWhile',
                        default: 'press [KEY_VALUE] while [HOLD_TIME] ms',
                        description: 'dispatch key event of key value and hold it'
                    }),
                    func: 'pressKeyWhile',
                    arguments: {
                        KEY_VALUE: {
                            type: ArgumentType.STRING,
                            menu: 'keyValueMenu',
                            defaultValue: ' '
                        },
                        HOLD_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    }
                },
                '---',
                {
                    opcode: 'moveMouseTo',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'keyEvents.moveMouseTo',
                        default: 'move mouse pointer to x: [X] y: [Y]',
                        description: 'move the mouse pointer to the position'
                    }),
                    func: 'moveMouseTo',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'clickMouseAt',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'keyEvents.clickMouseAt',
                        default: 'press mouse at x: [X] y: [Y] for [HOLD_TIME] ms',
                        description: 'press the mouse button at the position and release it after the time'
                    }),
                    func: 'clickMouseAt',
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        HOLD_TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    }
                },
                {
                    opcode: 'setMouseButton',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'keyEvents.setMouseButton',
                        default: '[MOUSE_STATE] mouse button',
                        description: 'press or release the mouse button'
                    }),
                    func: 'setMouseButton',
                    arguments: {
                        MOUSE_STATE: {
                            type: ArgumentType.STRING,
                            menu: 'mouseStateMenu',
                            defaultValue: 'down'
                        }
                    }
                },
                {
                    opcode: 'dragMouse',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'keyEvents.dragMouse',
                        default: 'drag mouse from x: [X1] y: [Y1] to x: [X2] y: [Y2] in [TIME] ms',
                        description: 'drag the mouse from the start to the end in the time'
                    }),
                    func: 'dragMouse',
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        TIME: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '500'
                        }
                    }
                }
            ],
            menus: {
                keyValueMenu: {
                    acceptReporters: true,
                    items: this.KEY_VALUE_MENU
                },
                mouseStateMenu: {
                    acceptReporters: false,
                    items: this.MOUSE_STATE_MENU
                }
            },
            translationMap: translations
        };
    }

    /**
     * @return {array} - text and values for each buttons menu element
     */

    get KEY_VALUE_MENU () {
        const menu = [
            {
                text: formatMessage({
                    id: 'keyEvents.keyValue.space',
                    default: 'space',
                    description: 'key value for space'
                }),
                value: ' '
            },
            {
                text: formatMessage({
                    id: 'keyEvents.keyValue.arrowUp',
                    default: 'up arrow',
                    description: 'key value for up arrow'
                }),
                value: 'ArrowUp'
            },
            {
                text: formatMessage({
                    id: 'keyEvents.keyValue.arrowDown',
                    default: 'down arrow',
                    description: 'key value for down arrow'
                }),
                value: 'ArrowDown'
            },
            {
                text: formatMessage({
                    id: 'keyEvents.keyValue.arrowRight',
                    default: 'right arrow',
                    description: 'key value for right arrow'
                }),
                value: 'ArrowRight'
            },
            {
                text: formatMessage({
                    id: 'keyEvents.keyValue.arrowLeft',
                    default: 'left arrow',
                    description: 'key value for left arrow'
                }),
                value: 'ArrowLeft'
            }
        ];
        for (let i = 97; i <= 122; i++) {
            const key = String.fromCharCode(i);
            menu.push({
                text: key,
                value: key
            });
        }
        for (let i = 48; i <= 57; i++) {
            const key = String.fromCharCode(i);
            menu.push({
                text: key,
                value: key
            });
        }
        return menu;
    }

    /**
     * @return {array} - text and values for mouse button state menu
     */
    get MOUSE_STATE_MENU () {
        return [
            {
                text: formatMessage({
                    id: 'keyEvents.mouseState.down',
                    default: 'press',
                    description: 'press the mouse button'
                }),
                value: 'down'
            },
            {
                text: formatMessage({
                    id: 'keyEvents.mouseState.up',
                    default: 'release',
                    description: 'release the mouse button'
                }),
                value: 'up'
            }
        ];
    }

    /**
     * Dispatch a key down event, then a key up event after the hold time.
     * No key repeat events are dispatched while holding.
     * @param {object} args - the block's arguments.
     * @param {string} args.KEY_VALUE - key value of the event to dispatch.
     * @param {number} args.HOLD_TIME - duration time to hold the key.
     * @return {Promise} - a Promise that resolves after the key up event.
     */
    pressKeyWhile (args) {
        const keyValue = args.KEY_VALUE;
        const holdTime = parseInt(args.HOLD_TIME, 10);
        if (this.keyProcesses[keyValue]) {
            this.stopKeyProcess(keyValue);
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {key: keyValue, repeat: false}));
        const keyProcess = {};
        this.keyProcesses[keyValue] = keyProcess;
        return new Promise(resolve => {
            const keyProcesses = this.keyProcesses;
            keyProcess.keyEndUp = () => {
                if (!keyProcesses[keyValue]) return;
                document.dispatchEvent(new KeyboardEvent('keyup', {key: keyValue}));
                clearTimeout(keyProcess.keyEndUpTimeout);
                delete keyProcesses[keyValue];
                resolve();
            };
            keyProcess.keyEndUpTimeout = setTimeout(() => keyProcess.keyEndUp(), holdTime);
        });
    }

    stopKeyProcess (keyValue) {
        const keyProcess = this.keyProcesses[keyValue];
        if (!keyProcess) return;
        keyProcess.keyEndUp();
    }

    /**
     * Mouse IO device of the runtime.
     * @type {?Mouse}
     */
    get mouse () {
        return (this.runtime && this.runtime.ioDevices) ? this.runtime.ioDevices.mouse : null;
    }

    /**
     * Current mouse position in Scratch coordinates.
     * @return {{x: number, y: number}} - position
     */
    getMousePosition () {
        const mouse = this.mouse;
        return {
            x: (mouse && Number.isFinite(mouse.getScratchX())) ? mouse.getScratchX() : 0,
            y: (mouse && Number.isFinite(mouse.getScratchY())) ? mouse.getScratchY() : 0
        };
    }

    /**
     * Convert Scratch coordinates into client coordinates of the stage canvas.
     * Client coordinates are kept inside the canvas to be handled as a position on the stage.
     * @param {number} scratchX - x in Scratch coordinates
     * @param {number} scratchY - y in Scratch coordinates
     * @return {{x: number, y: number, canvasWidth: number, canvasHeight: number}} - client position
     */
    scratchToClient (scratchX, scratchY) {
        const renderer = this.runtime.renderer;
        const canvas = renderer && renderer.canvas;
        const canvasWidth = (canvas && canvas.clientWidth) || 480;
        const canvasHeight = (canvas && canvas.clientHeight) || 360;
        const margin = 0.001;
        const sx = Math.min(Math.max(scratchX, -240), 240);
        const sy = Math.min(Math.max(scratchY, -180), 180);
        const x = Math.min(Math.max(((sx / 480) + 0.5) * canvasWidth, margin), canvasWidth - margin);
        const y = Math.min(Math.max((0.5 - (sy / 360)) * canvasHeight, margin), canvasHeight - margin);
        return {x, y, canvasWidth, canvasHeight};
    }

    /**
     * Post mouse data to the mouse IO device.
     * @param {number} scratchX - x in Scratch coordinates
     * @param {number} scratchY - y in Scratch coordinates
     * @param {object} [extra] - additional data such as isDown and wasDragged
     */
    postMouseData (scratchX, scratchY, extra) {
        const mouse = this.mouse;
        if (!mouse) return;
        mouse.postData(Object.assign(this.scratchToClient(scratchX, scratchY), extra));
    }

    /**
     * Find a draggable sprite at the position.
     * @param {number} scratchX - x in Scratch coordinates
     * @param {number} scratchY - y in Scratch coordinates
     * @return {?RenderedTarget} - draggable target at the position
     */
    pickDraggableTarget (scratchX, scratchY) {
        const renderer = this.runtime.renderer;
        if (!renderer) return null;
        const draggableTargets = this.runtime.targets.filter(
            target => !target.isStage && target.draggable && Number.isFinite(target.drawableID)
        );
        if (draggableTargets.length === 0) return null;
        const client = this.scratchToClient(scratchX, scratchY);
        const drawableID = renderer.pick(
            client.x, client.y, 1, 1,
            draggableTargets.map(target => target.drawableID)
        );
        if (drawableID === null || typeof drawableID === 'undefined') return null;
        return draggableTargets.find(target => target.drawableID === drawableID) || null;
    }

    /**
     * Move the mouse pointer. Drag the sprite if the mouse button is pressed on a draggable sprite.
     * @param {number} scratchX - x in Scratch coordinates
     * @param {number} scratchY - y in Scratch coordinates
     */
    mouseMove (scratchX, scratchY) {
        this.postMouseData(scratchX, scratchY);
        const state = this.mouseState;
        if (!state.isDown) return;
        if (!state.dragTarget && state.dragCandidate &&
            (scratchX !== state.downX || scratchY !== state.downY)) {
            const target = state.dragCandidate;
            state.dragCandidate = null;
            if (this.runtime.targets.indexOf(target) >= 0) {
                target.goToFront();
                target.startDrag();
                state.dragTarget = target;
            }
        }
        if (state.dragTarget) {
            state.dragTarget.setXY(
                scratchX + state.dragOffsetX,
                scratchY + state.dragOffsetY,
                true
            );
        }
    }

    /**
     * Press the mouse button at the current position.
     */
    mouseDown () {
        const state = this.mouseState;
        if (state.isDown) return;
        const pos = this.getMousePosition();
        const target = this.pickDraggableTarget(pos.x, pos.y);
        state.isDown = true;
        state.downX = pos.x;
        state.downY = pos.y;
        state.dragCandidate = target;
        state.dragTarget = null;
        if (target) {
            state.dragOffsetX = target.x - pos.x;
            state.dragOffsetY = target.y - pos.y;
        }
        this.postMouseData(pos.x, pos.y, {isDown: true});
    }

    /**
     * Release the mouse button at the current position.
     */
    mouseUp () {
        const state = this.mouseState;
        if (!state.isDown) return;
        const pos = this.getMousePosition();
        const dragTarget = state.dragTarget;
        state.isDown = false;
        state.dragCandidate = null;
        state.dragTarget = null;
        if (dragTarget) {
            dragTarget.stopDrag();
        }
        this.postMouseData(pos.x, pos.y, {isDown: false, wasDragged: !!dragTarget});
    }

    /**
     * Stop the running mouse process (click or drag) and release the mouse button.
     */
    stopMouseProcess () {
        if (this.mouseProcess) {
            this.mouseProcess.finish();
        }
    }

    /**
     * Start a mouse process which is finished by calling 'finish' or the timer.
     * @param {function} step - function called with the process to proceed it.
     * @return {Promise} - a Promise that resolves when the process finished.
     */
    startMouseProcess (step) {
        this.stopMouseProcess();
        this.mouseUp();
        const mouseProcess = {};
        this.mouseProcess = mouseProcess;
        return new Promise(resolve => {
            mouseProcess.finish = () => {
                if (mouseProcess.finished) return;
                mouseProcess.finished = true;
                clearTimeout(mouseProcess.timeout);
                if (this.mouseProcess === mouseProcess) {
                    this.mouseProcess = null;
                }
                this.mouseUp();
                resolve();
            };
            step(mouseProcess);
        });
    }

    /**
     * Move the mouse pointer to the position.
     * @param {object} args - the block's arguments.
     * @param {number} args.X - x in Scratch coordinates
     * @param {number} args.Y - y in Scratch coordinates
     */
    moveMouseTo (args) {
        this.mouseMove(Cast.toNumber(args.X), Cast.toNumber(args.Y));
    }

    /**
     * Press the mouse button at the position and release it after the hold time.
     * @param {object} args - the block's arguments.
     * @param {number} args.X - x in Scratch coordinates
     * @param {number} args.Y - y in Scratch coordinates
     * @param {number} args.HOLD_TIME - duration time to hold the button in ms
     * @return {Promise} - a Promise that resolves after the button was released.
     */
    clickMouseAt (args) {
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const holdTime = Math.max(0, Cast.toNumber(args.HOLD_TIME));
        return this.startMouseProcess(mouseProcess => {
            this.mouseMove(x, y);
            this.mouseDown();
            mouseProcess.timeout = setTimeout(() => mouseProcess.finish(), holdTime);
        });
    }

    /**
     * Press or release the mouse button at the current position.
     * @param {object} args - the block's arguments.
     * @param {string} args.MOUSE_STATE - 'down' or 'up'
     */
    setMouseButton (args) {
        this.stopMouseProcess();
        if (args.MOUSE_STATE === 'down') {
            this.mouseDown();
        } else {
            this.mouseUp();
        }
    }

    /**
     * Drag the mouse from the start position to the end position in the time.
     * @param {object} args - the block's arguments.
     * @param {number} args.X1 - start x in Scratch coordinates
     * @param {number} args.Y1 - start y in Scratch coordinates
     * @param {number} args.X2 - end x in Scratch coordinates
     * @param {number} args.Y2 - end y in Scratch coordinates
     * @param {number} args.TIME - duration time to drag in ms
     * @return {Promise} - a Promise that resolves after the button was released.
     */
    dragMouse (args) {
        const x1 = Cast.toNumber(args.X1);
        const y1 = Cast.toNumber(args.Y1);
        const x2 = Cast.toNumber(args.X2);
        const y2 = Cast.toNumber(args.Y2);
        const duration = Math.max(0, Cast.toNumber(args.TIME));
        const interval = 1000 / 60;
        return this.startMouseProcess(mouseProcess => {
            this.mouseMove(x1, y1);
            this.mouseDown();
            const startTime = Date.now();
            const step = () => {
                const progress = duration > 0 ? Math.min((Date.now() - startTime) / duration, 1) : 1;
                this.mouseMove(
                    Math.round(x1 + ((x2 - x1) * progress)),
                    Math.round(y1 + ((y2 - y1) * progress))
                );
                if (progress >= 1) {
                    mouseProcess.finish();
                    return;
                }
                mouseProcess.timeout = setTimeout(step, interval);
            };
            mouseProcess.timeout = setTimeout(step, interval);
        });
    }

    stopAll () {
        Object.keys(this.keyProcesses).forEach(keyValue => {
            this.stopKeyProcess(keyValue);
        });
        this.stopMouseProcess();
        this.mouseUp();
    }
}

export {KeyEventsBlocks as default, KeyEventsBlocks as blockClass};
