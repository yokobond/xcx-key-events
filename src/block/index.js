const BlockType = require('../../extension-support/block-type');
const ArgumentType = require('../../extension-support/argument-type');
// const cast = require('../../util/cast');
// const log = require('../../util/log');

/**
 * Formatter which is used for translating.
 * When it was loaded as a module, 'formatMessage' will be replaced which is used in the runtime.
 * @type {Function}
 */
let formatMessage = require('format-message');

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
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        this.setupTranslations();
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
                }
            ],
            menus: {
                keyValueMenu: {
                    acceptReporters: true,
                    items: this.KEY_VALUE_MENU
                }
            },
            // eslint-disable-next-line no-use-before-define
            translationMap: extensionTranslations
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
     * Dispatch events of key down and repeat while the time then return after the key up.
     * @param {object} args - the block's arguments.
     * @param {string} args.KEY_VALUE - key value of the event to dispatch.
     * @param {number} args.HOLD_TIME - duration time to hold the key.
     * @return {Promise} - a Promise that resolves after the key up event.
     */
    pressKeyWhile (args) {
        const keyValue = args.KEY_VALUE;
        const holdTime = parseInt(args.HOLD_TIME, 10);
        const keyRepeat = true; // It's always repeating to simulate real key events.
        if (this.keyProcesses[keyValue]) {
            this.stopKeyProcess(keyValue);
        }
        document.dispatchEvent(new KeyboardEvent('keydown', {key: keyValue, repeat: false}));
        const keyProcess = {};
        this.keyProcesses[keyValue] = keyProcess;
        const repeatDelayTime = 200;
        const repeatIntervalTime = 100;
        if (keyRepeat) {
            keyProcess.repeatStarter = setTimeout(() => {
                keyProcess.keyRepeater = setInterval(() => {
                    document.dispatchEvent(new KeyboardEvent('keydown', {key: keyValue, repeat: true}));
                }, repeatIntervalTime);
            }, repeatDelayTime);
        }
        return new Promise(resolve => {
            const keyProcesses = this.keyProcesses;
            keyProcess.keyEndUp = () => {
                if (!keyProcesses[keyValue]) return;
                if (keyProcess.repeatStarter) {
                    clearTimeout(keyProcess.repeatStarter);
                    if (keyProcess.keyRepeater) clearInterval(keyProcess.keyRepeater);
                }
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

    stopAll () {
        Object.keys(this.keyProcesses).forEach(keyValue => {
            this.stopKeyProcess(keyValue);
        });
    }

    /**
     * Setup format-message for this extension.
     */
    setupTranslations () {
        const localeSetup = formatMessage.setup();
        if (localeSetup && localeSetup.translations[localeSetup.locale]) {
            Object.assign(
                localeSetup.translations[localeSetup.locale],
                // eslint-disable-next-line no-use-before-define
                extensionTranslations[localeSetup.locale]
            );
        }
    }
}

const extensionTranslations = {
    'ja': {
        'keyEvents.pressKeyWhile': '[KEY_VALUE] キーを [HOLD_TIME] ミリ秒間押す',
        'keyEvents.keyValue.space': 'スペース',
        'keyEvents.keyValue.arrowUp': '上向き矢印',
        'keyEvents.keyValue.arrowDown': '下向き矢印',
        'keyEvents.keyValue.arrowRight': '右向き矢印',
        'keyEvents.keyValue.arrowLeft': '左向き矢印'
    },
    'ja-Hira': {
        'keyEvents.pressKeyWhile': '[KEY_VALUE] キーを [HOLD_TIME] みりびょうかんおす',
        'keyEvents.keyValue.space': 'スペース',
        'keyEvents.keyValue.arrowUp': 'うえむきやじるし',
        'keyEvents.keyValue.arrowDown': 'したむきやじるし',
        'keyEvents.keyValue.arrowRight': 'みぎむきやじるし',
        'keyEvents.keyValue.arrowLeft': 'ひだりむきやじるし'
    }
};

exports.blockClass = KeyEventsBlocks; // loadable-extension needs this line.
module.exports = KeyEventsBlocks;
