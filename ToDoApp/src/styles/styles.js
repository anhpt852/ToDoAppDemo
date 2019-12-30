import React, {
    StyleSheet
} from 'react-native';

import Config from '../commons/Config';

export default StyleSheet.create({
    smallText: {
        color: '#22242a',
        fontSize: 18,
        // fontFamily: 'Roboto',
    },
    mediumText: {
        color: '#22242a',
        fontSize: 18,
        // fontFamily: 'Roboto',
    },
    largeText: {
        color: '#000000',
        fontSize: 18,
        // fontFamily: 'Roboto',
    },
    colorMain: {
        color: Config.colorMain
    },
    backgroundColorMain: {
        backgroundColor: Config.colorMain
    }
});