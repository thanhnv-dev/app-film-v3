import {flex, spacing, text} from '../../styles';
import {Dimensions} from 'react-native';
const {width: screenWidth} = Dimensions.get('window');

export default {
    ...flex,
    ...spacing,
    ...text,
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconHeader: {
        position: 'absolute',
        marginLeft: 10,
        marginTop: 10,
    },
    textHeader: {
        marginTop: 5,
        alignItems: 'center',
    },
    viewName: {
        alignItems: 'center',
        textAlign: 'center',
        alignContent: 'center',
    },
    TextName: {
        textAlign: 'center',
        fontSize: 27,
        fontWeight: 'bold',
        color: '#f85032',
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    buttonPlay: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 5,
            width: 5,
        },
        shadowRadius: 4.5,
        padding: 5,
    },
    imageAvt: {
        width: 100,
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
    },
    viewAvt: {
        // shadowOpacity: 0.55,
        marginLeft: 10,
        // shadowOffset: {
        //     height: 5,
        //     width: 5,
        // },
        shadowRadius: 4.5,
    },
    viewDetails: {
        flex: 1,
        marginHorizontal: 10,
        justifyContent: 'center',
    },
    textNameEn: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewContent: {
        marginBottom: 10,
    },
    titleContent: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
    },
    viewCast: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        alignItems: 'center',
        marginBottom: 30,
    },
    textCast: {
        marginTop: 10,
        fontSize: 16,
        color: '#c31432',
        fontWeight: 'bold',
    },
    viewImageCast: {
        marginBottom: 10,
        // shadowOpacity: 0.55,
        // shadowOffset: {
        //     height: 5,
        //     width: 5,
        // },
        shadowRadius: 4.5,
    },
    imagesCast: {
        height: 70,
        width: 70,
        borderRadius: 30,
    },
    nameCast: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    viewButtonDetailsCmts: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 40,
        marginTop: 10,
        // shadowOpacity: 0.55,
        // shadowOffset: {
        //     height: 5,
        //     width: 5,
        // },
    },
    buttonDetailsCmts: {
        height: 30,
        width: 115,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    textButtonDetailsCmts: {
        color: 'white',
    },
    viewCmts: {
        flex: 1,
    },
    viewInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center',
    },
    boxInput: {
        marginRight: 10,
        borderRadius: 5,
        paddingTop: 10,
        paddingBottom: 10,
        shadowRadius: 5,
        backgroundColor: '#F2F3F4',
        color: 'black',
        width: (screenWidth / 10) * 8,
    },
    itemCmts: {
        marginHorizontal: 10,
        marginTop: 10,
    },
    nameUser: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    day: {
        fontSize: 12,
        color: 'gray',
    },
    content: {
        fontSize: 16,
        color: 'white',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: 'white',
    },
    image: {
        width: screenWidth,
        height: 220,
        alignItems: 'center',
    },
    dot: {
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
        backgroundColor: '#f85032',
    },
    absolute: {position: 'absolute'},
    DialogTitle: {
        color: 'gray',
    },
    inputDialog: {
        height: 30,
    },
    buttonAddList: {
        height: 30,
        width: 140,
        borderRadius: 20,
        backgroundColor: 'yellow',
    },
    Star: {
        resizeMode: 'cover',
        tintColor: '#F4DF4EFF',
        marginBottom: 3,
        marginRight: 4,
        width: 30,
        height: 30,
    },
    cmtBox: {
        padding: 5,
        borderRadius: 10,
        backgroundColor: '#949398FF',
    },
    viewInputDialog: {
        borderWidth: 1,
        borderRadius: 10,
    },
    buttonAddFilm: {
        height: 30,
        backgroundColor: '#949398FF',
        borderRadius: 10,
        marginTop: 10,
    },
    scrollDialog: {
        height: 300,
    },
    shadow: {
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
    },
};
