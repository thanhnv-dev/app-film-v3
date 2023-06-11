import {flex, spacing, text} from '../../styles';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export default {
    ...flex,
    ...spacing,
    ...text,
    boxInput: {
        borderRadius: 20,
        height: 35,
        borderWidth: 1,
        color: '#353839',
    },
    shadow: {
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
    },
    imageAvt: {
        width: 100,
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
    },
    textName: {
        color: '#C04000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 10,
    },
    viewContentFilm: {
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
    },
    textnotfound: {
        color: '#C04000',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
};
