/**
 * This is an extension for Xcratch.
 */

import iconURL from './entry-icon.png';
import insetIconURL from './inset-icon.svg';
import translations from './translations.json';
import {version as packageVersion} from '../../../../../../package.json';

/**
 * Formatter to translate the messages in this extension.
 * This will be replaced which is used in the React component.
 * @param {object} messageData - data for format-message
 * @returns {string} - translated message for the current locale
 */
let formatMessage = messageData => messageData.defaultMessage;

const version = `v${packageVersion}`;

const entry = {
    get name () {
        return formatMessage({
            id: 'keyEvents.entry.name',
            defaultMessage: 'Key Events',
            description: 'name of the extension'
        });
    },
    extensionId: 'keyEvents',
    extensionURL: 'https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: iconURL,
    insetIconURL: insetIconURL,
    get description () {
        return `${formatMessage({
            defaultMessage: 'Press keyboard keys',
            description: 'Description for keyEvents extension for Xcratch',
            id: 'keyEvents.entry.description'
        })} (${version})`;
    },
    tags: ['function', 'key', 'keyboard'],
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: false,
    helpLink: 'https://github.com/yokobond/xcx-key-events/',
    setFormatMessage: formatter => {
        formatMessage = formatter;
    },
    translationMap: translations
};

export {entry}; // loadable-extension needs this line.
export default entry;
