import React from 'react';
import {FormattedMessage} from 'react-intl';

import keyEventsIconURL from './entry-icon.png';
import keyEventsInsetIconURL from './inset-icon.svg';

const translationMap = {
    'ja': {
        'gui.extension.keyEvents.description': 'Xcratch 拡張の例'
    },
    'ja-Hira': {
        'gui.extension.keyEvents.description': 'Xcratch (えくすくらっち)かくちょうのれい'
    }
};

const entry = {
    name: 'Xcratch Example',
    extensionId: 'keyEvents',
    extensionURL: 'https://yokobond.github.io/xcx-key-events/dist/keyEvents.mjs',
    collaborator: 'Yengawa Lab',
    iconURL: keyEventsIconURL,
    insetIconURL: keyEventsInsetIconURL,
    description: (
        <FormattedMessage
            defaultMessage="example extension for Xcratch"
            description="Description for example extension for Xcratch"
            id="gui.extension.keyEvents.description"
        />
    ),
    featured: true,
    disabled: false,
    bluetoothRequired: false,
    internetConnectionRequired: true,
    helpLink: 'https://github.com/yokobond/xcx-key-events/',
    translationMap: translationMap
};

export {entry}; // loadable-extension needs this line.
export default entry;
