import {flex, spacing, text} from '../../styles';

export default {
    ...flex,
    ...spacing,
    ...text,
    colorButton: {color: '#3366FF'},
    colorTitle: {
        color: '#7303c0',
    },
    input: {
        height: 40,
        marginHorizontal: 30,
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
        color: '#3300FF',
    },
    inputPassword: {
        height: 40,
        flex: 9,
        marginVertical: 5,
        borderLeftWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        color: '#3300FF',
    },
    buttonLogin: {
        marginHorizontal: 100,
        marginVertical: 15,
        borderWidth: 1,
        borderRadius: 100,
        height: 30,
        justifyContent: 'center',
        backgroundColor: '#9999FF',
    },
    iconEye: {
        height: 15,
        width: 15,
    },
    borderIcon: {
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
};
