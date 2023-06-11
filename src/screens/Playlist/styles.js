import {flex, spacing, text} from '../../styles';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export default {
    ...flex,
    ...spacing,
    ...text,
    header: {
        position: 'absolute',
        width: '100%',
        top: 40,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    viewHeader: {
        marginTop: 40,
    },
    textHeader: {
        marginTop: 5,
        alignItems: 'center',
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
    imageFilm: {
        width: 120,
        height: 180,
        borderRadius: 20,
    },
    text: {
        color: 'black',
        marginLeft: 5,
    },
    boxList: {
        borderRadius: 10,
    },
    buttonEdit: {
        backgroundColor: '#BEBFC5',
        width: 180,
        borderRadius: 10,
    },
    buttonExit: {
        backgroundColor: '#BEBFC5',
        width: 70,
        marginLeft: 20,
        borderRadius: 10,
    },
    inputDialog: {
        height: 40,
        borderRadius: 10,
    },
    boxInput: {
        borderRadius: 10,
        borderWidth: 1,
    },
    w22: {
        width: 22,
    },
    viewBottomButton: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    h50: {
        height: 50,
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
};
