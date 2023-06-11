import {flex, spacing, text} from '../../styles';

export default {
    ...flex,
    ...spacing,
    ...text,
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    },
    popularTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#bdc3c7',
        marginBottom: 10,
    },
    ItemPopular: {
        marginHorizontal: 10,
        // alignItems: 'center',
        // borderRadius: 20,
        // shadowOpacity: 0.55,
        height: 200,
        // shadowOffset: {
        //     height: 5,
        //     width: 5,
        // },
        // shadowRadius: 4.5,
        // shadowColor: '#bdc3c7',
    },
    imagePopular: {
        width: 120,
        height: 180,
        borderRadius: 20,
    },
    View2: {
        flex: 2,
    },
    viewImage: {
        justifyContent: 'space-between',
        marginLeft: 10,
    },
    ItemTop: {
        flex: 1,
    },
    imageAvt: {
        width: 100,
        height: 150,
        borderRadius: 20,
        marginBottom: 10,
    },
    imageTop: {
        width: 50,
        height: 50,
        borderRadius: 15,
    },
    ImageBackground: {
        flex: 1,
        height: 220,
        flexDirection: 'row',
    },
    viewButton: {
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#7CDFF6',
        height: 40,
    },
    TypeButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        width: 170,
        height: 30,
    },
    textTypeButton: {
        fontSize: 20,
    },
    viewTitleBackGround: {
        justifyContent: 'flex-end',
        flex: 1,
        marginLeft: 10,
        marginBottom: 20,
    },
    viewDetails: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
        marginBottom: 80,
    },
    iconPlay: {
        flexDirection: 'row',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: '#7CDFF6',
        borderRadius: 20,
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 10,
        },
        shadowRadius: 4.5,
    },
    nameFilm: {
        fontSize: 20,
        color: '#000100',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    itemFilmAll: {
        flexDirection: 'row',
        borderRadius: 20,
        marginVertical: 10,
        marginLeft: 10,
        shadowOpacity: 0.55,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
    },
    imageFilmAll: {
        width: 120,
        height: 180,
        borderRadius: 20,
    },
    viewContentFilmAll: {
        marginLeft: 10,
        marginTop: 5,
    },
    textNameAll: {
        textAlign: 'center',
        color: '#0F2027',
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    ItemClassify: {
        marginHorizontal: 10,
        marginBottom: 15,
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
    },
    imageClasify: {
        width: 120,
        height: 180,
        borderRadius: 20,
    },
    viewClassify: {
        flex: 1,
        position: 'absolute',
    },
    viewClassifyItem: {
        flexDirection: 'row',
    },
    view3: {
        flex: 1,
    },
    textClassify: {
        fontSize: 20,
        marginLeft: 10,
        marginVertical: 10,
        color: '#2F0743',
        fontWeight: 'bold',
        textAlign: 'center',
        shadowOpacity: 0.7,
        shadowOffset: {
            height: 10,
            width: 10,
        },
        shadowRadius: 4.5,
        marginBottom: 15,
    },
};
