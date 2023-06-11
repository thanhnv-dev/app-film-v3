import {flex, spacing, text} from '../../styles';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export default {
    ...flex,
    ...spacing,
    ...text,
    Video: {
        width: '100%',
        aspectRatio: 16 / 9,
    },
    Name: {
        fontSize: 25,
        textAlign: 'center',
        color: '#f85032',
        fontWeight: 'bold',
    },
    titleReview: {
        textAlign: 'center',
        fontSize: 25,
        color: '#2A3439',
        fontWeight: 'bold',
        marginVertical: 15,
    },
    episode: {
        height: 30,
        width: 50,
        borderRadius: 10,
    },
    dropDown: {
        width: 150,
        borderRadius: 10,
        backgroundColor: '#808080',
    },
};
