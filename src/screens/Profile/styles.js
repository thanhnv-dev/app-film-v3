import {flex, spacing, text} from '../../styles';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export default {
    ...flex,
    ...spacing,
    ...text,
    viewHeader: {
        marginTop: 45,
        justifyContent: 'flex-end',
        marginRight: 10,
    },
    viewUser: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowOpacity: 0.5,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
    },
    boderUser: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'gray',
        borderRadius: 30,
        padding: 20,
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF4F00',
    },
    email: {
        color: '#FF9966',
        fontSize: 16,
    },
    viewLike: {
        marginHorizontal: 10,
    },
    viewHistory: {
        marginHorizontal: 10,
        marginTop: 20,
    },
    textLike: {
        fontSize: 20,
        color: '#f85032',
    },
    textHistory: {
        fontSize: 20,
    },
    Item: {
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 10,
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 20,
    },
    buttonEdit: {
        position: 'absolute',
        bottom: 10,
        right: 15,
    },
    inputDialog: {
        height: 40,
        padding: 10,
        borderWidth: 0.7,
        borderRadius: 5,
    },
    buttonUpdate: {
        height: 40,
        width: 100,
        borderRadius: 10,
        backgroundColor: '#00FFFF',
    },
    imageAvt: {
        width: 100,
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
    },
    viewFilm: {
        flex: 1,
        marginBottom: 80,
    },
    itemFilm: {
        flexDirection: 'row',
        borderRadius: 20,
        marginVertical: 10,
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
        borderColor: '#C04000',
    },
    viewContentFilm: {
        flex: 1,
        marginLeft: 10,
        marginTop: 5,
    },
    textName: {
        color: '#C04000',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        marginRight: 10,
    },
};
