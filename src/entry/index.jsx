import React from 'react';
import {FormattedMessage} from 'react-intl';

import keyEventsIconURL from './entry-icon.png';
import keyEventsInsetIconURL from './inset-icon.svg';

const translationMap = {
    'ja': {
        'gui.extension.keyEvents.description': 'キーボードを押す'
    },
    'ja-Hira': {
        'gui.extension.keyEvents.description': 'キーボード を おす'
    }
};

const entry = {
    name: 'Key Events',
    extensionId: 'keyEvents',
    extensionURL: 'https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: keyEventsIconURL,
    insetIconURL: keyEventsInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="Press keyboard keys"
            description="Description for keyEvents extension for Xcratch"
            id="gui.extension.keyEvents.description"
        />
    ),
    tags: ['function', 'key', 'keyboard'],
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/yokobond/xcx-key-events/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
