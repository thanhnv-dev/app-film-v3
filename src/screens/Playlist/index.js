import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    Image,
    StatusBar,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {sendPost} from 'src/network/request';
import {setUser} from 'src/redux/slice/user';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../../components';

const PlaylistScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const dataUser = useSelector(state => state.user);
    const dataLikeList = dataUser.listLike;

    const dataPlayList = [
        {title: 'Phim yêu thích', data: dataLikeList, _id: false},
        ...dataUser.listPlay,
    ];
    const isFocused = useIsFocused();
    const [loading, setLoading] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [select, setSelect] = useState([]);
    const [input, setInput] = useState('');

    const getDataUser = async () => {
        setLoading(true);
        const res = await sendPost('/users/getdata', {userId: dataUser._id});
        if (res.status === 200) {
            dispatch(setUser(res.data));
        }
        setLoading(false);
    };

    const checkSelectList = (value1, value2) => {
        return value1?.some(element => {
            return element === value2;
        });
    };

    const onPressList = id => {
        if (editMode) {
            let newDataSelect = [...select];

            if (checkSelectList(newDataSelect, id)) {
                newDataSelect = newDataSelect.filter(value => value !== id);
            } else {
                newDataSelect?.push(id);
            }

            setSelect(newDataSelect);
        } else {
            navigation.navigate('DetailsList', {
                idList: id,
            });
        }
    };

    const renderList = ({item, index}) => {
        return !item._id && editMode ? null : (
            <>
                <TouchableOpacity onPress={() => onPressList(item._id)}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#1c92d2', '#f2fcfe']}
                        style={[
                            styles.boxList,
                            styles.mv10,
                            styles.mh30,
                            styles.p10,
                            styles.flexRow,
                            // eslint-disable-next-line react-native/no-inline-styles
                            {
                                borderColor:
                                    checkSelectList(select, item._id) &&
                                    editMode
                                        ? 'red'
                                        : 'black',
                            },
                        ]}>
                        <Text style={[styles.flex1, styles.bold]}>
                            {item?.title}
                        </Text>
                        <Text style={styles.flex1}>{item?.data?.length}</Text>

                        {editMode ? (
                            <Icon3
                                name={
                                    checkSelectList(select, item._id)
                                        ? 'checkbox-marked'
                                        : 'checkbox-blank-outline'
                                }
                                size={20}
                                color={
                                    checkSelectList(select, item._id)
                                        ? 'red'
                                        : 'black'
                                }
                            />
                        ) : (
                            <Icon
                                name="arrow-forward-circle-outline"
                                size={20}
                                color={'black'}
                            />
                        )}
                    </LinearGradient>
                </TouchableOpacity>
                {dataPlayList.length - 1 === index ? (
                    <View style={styles.h50} />
                ) : null}
            </>
        );
    };
    const removeLists = async () => {
        setLoading(true);
        const res = await sendPost('/users/removelist', {
            idUser: dataUser._id,
            select: select,
        });
        setInput('');
        if (res.status === 200) {
            setSelect([]);
            const callDataUser = await sendPost('/users/getdata', {
                userId: dataUser._id,
            });
            if (callDataUser.status === 200) {
                dispatch(setUser(callDataUser.data));
            }
        } else {
            // lỗi tạo danh sách mới
            console.log(res);
        }
        setLoading(false);
    };

    const createNewList = async () => {
        if (input) {
            setLoading(true);
            const res = await sendPost('/users/createlist', {
                idUser: dataUser._id,
                title: input,
            });
            setInput('');
            if (res.status === 200) {
                const callDataUser = await sendPost('/users/getdata', {
                    userId: dataUser._id,
                });
                if (callDataUser.status === 200) {
                    dispatch(setUser(callDataUser.data));
                }
            } else {
                // lỗi tạo danh sách mới
                console.log(res);
            }
            setLoading(false);
        }
    };
    const onPressRemoveLists = async () => {
        if (editMode && select.length > 0) {
            Alert.alert(
                'Bạn có chắc chắn muốn xoá các danh sánh đã chọn không?',
                '',
                [
                    {
                        text: 'Không',
                        // onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Có',
                        onPress: () => removeLists(),
                        style: 'destructive',
                    },
                ],
            );
        } else {
            setEditMode(true);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getDataUser();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
        <TouchableWithoutFeedback
            style={styles.flex1}
            onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={['#333333', '#e9d362']}
                style={styles.flex1}>
                <View
                    style={[
                        styles.mt40,
                        styles.flexRow,
                        styles.justifyContentBetween,
                        styles.alignItemsCenter,
                        styles.mh15,
                    ]}>
                    <View style={styles.w22} />
                    <View style={styles.textHeader}>
                        <Text style={styles.title}>
                            {editMode
                                ? 'Chỉnh sửa danh sách'
                                : 'Danh Sách Phim'}
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            setEditMode(!editMode);
                        }}>
                        <Icon
                            name={
                                editMode
                                    ? 'ios-settings'
                                    : 'ios-settings-outline'
                            }
                            size={30}
                        />
                    </TouchableOpacity>
                </View>
                {editMode ? (
                    <View
                        style={[
                            styles.flexRow,
                            styles.center,
                            styles.boxInput,
                            styles.mh30,
                            styles.mv10,
                        ]}>
                        <TextInput
                            style={[
                                styles.inputDialog,
                                styles.mv5,
                                styles.flex1,
                            ]}
                            paddingLeft={10}
                            spellCheck={false}
                            placeholderTextColor={'gray'}
                            color={'gray'}
                            placeholder="Tạo mới danh sách"
                            maxLength={20}
                            onChangeText={setInput}
                            value={input}
                        />
                        <TouchableOpacity
                            style={styles.mr5}
                            onPress={createNewList}>
                            <Icon4
                                name="playlist-add"
                                size={30}
                                color={'black'}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={[styles.flexRow, styles.mh30, styles.mt10]}>
                    <Text style={[styles.flex1, styles.bold18]}>Tên</Text>
                    <Text style={[styles.flex1, styles.bold18]}>Số lượng </Text>
                    <View style={styles.w22} />
                </View>
                <FlatList data={dataPlayList} renderItem={renderList} />
                {editMode ? (
                    <View
                        style={[
                            styles.center,
                            styles.flexRow,
                            styles.viewBottomButton,
                        ]}>
                        <TouchableOpacity
                            onPress={onPressRemoveLists}
                            style={[
                                styles.flexRow,
                                styles.buttonEdit,
                                styles.p10,
                                styles.center,
                                styles.mv10,
                                // eslint-disable-next-line react-native/no-inline-styles
                                {
                                    backgroundColor: editMode
                                        ? 'red'
                                        : '#BEBFC5',
                                },
                            ]}>
                            <Icon2
                                name={editMode ? 'trash' : 'edit'}
                                size={24}
                                color={'black'}
                            />
                            <Text style={styles.bold18}>
                                {`  Xoá ${select.length} danh sách`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setEditMode(!editMode)}
                            style={[
                                styles.flexRow,
                                styles.buttonExit,
                                styles.p10,
                                styles.center,
                                styles.mv10,
                            ]}>
                            <Icon2 name={'remove'} size={24} color={'black'} />
                            <Text style={styles.bold18}>{'Huỷ'}</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <Loader loading={loading} />
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};
export default PlaylistScreen;
