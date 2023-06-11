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
import {sendPost, sendGet} from 'src/network/request';
import {setUser} from 'src/redux/slice/user';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import {useIsFocused} from '@react-navigation/native';
import {Loader} from '../../components';
import {BASE_URL} from 'src/constants/const';

const DetailsList = props => {
    const {idList} = props.route.params;

    const dispatch = useDispatch();

    const isFocused = useIsFocused();

    const dataUser = useSelector(state => state.user);
    const listLike = useSelector(state => state.user.listLike);

    const dataFilms = useSelector(state => state.films.data);

    const [loading, setLoading] = useState(false);

    const [dataList, setDataList] = useState({});
    const [editMode, setEditMode] = useState(false);
    const [select, setSelect] = useState([]);

    const [dataListFilms, setDataListFilms] = useState([]);

    const fillDataFilms = data => {
        const results = dataFilms.filter(element => {
            return data.indexOf(element._id) !== -1;
        });
        setDataListFilms(results);
    };

    const getDataList = async () => {
        setLoading(true);
        const res = await sendPost('/users/getdatalist', {
            idList: idList,
            idUser: dataUser._id,
        });
        if (res.status === 200) {
            setDataList(res.data);
            fillDataFilms(res?.data?.data);
            // setDataList()
        }
        setLoading(false);
    };
    const renderList = (element, index, parent) => {
        return (
            <Text key={element.toString()}>
                {element}
                {index < parent.length - 1 ? ', ' : ''}
            </Text>
        );
    };
    const filmStatus = dataFilm => {
        if (dataFilm?.episode?.current === 0) {
            return 'Trailer';
        } else {
            if (dataFilm?.episode?.total > 1) {
                //bộ
                return `${dataFilm?.episode.current}/${dataFilm.episode.total} Tập`;
            } else {
                //lẻ
                return 'Hoàn Thành';
            }
        }
    };
    const checkSelectList = (value1, value2) => {
        return value1?.some(element => {
            return element === value2;
        });
    };

    const onPressItemFilm = id => {
        if (editMode) {
            let newDataSelect = [...select];

            if (checkSelectList(newDataSelect, id)) {
                newDataSelect = newDataSelect.filter(value => value !== id);
            } else {
                newDataSelect?.push(id);
            }

            setSelect(newDataSelect);
        } else {
            props.navigation.navigate('Details', {
                idFilm: id,
            });
        }
    };

    const renderFilm = ({item}) => {
        return (
            <TouchableOpacity
                style={[
                    styles.itemFilm,
                    styles.mh10,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                        borderWidth: checkSelectList(select, item._id) ? 1 : 0,
                    },
                ]}
                onPress={() => onPressItemFilm(item._id)}>
                <Image
                    source={{
                        uri: `${item.avatar}`,
                    }}
                    style={styles.imageAvt}
                    resizeMode="stretch"
                />
                <View style={[styles.viewContentFilm, styles.ml10]}>
                    <Text style={styles.textName}>{item.name}</Text>
                    <View
                        style={[styles.flexRow, styles.justifyContentBetween]}>
                        <View>
                            <Text>
                                Điểm yêu thích:{' '}
                                <Text style={styles.bold}>{item?.point}</Text>
                            </Text>
                            <Text>
                                Chất Lượng:{' '}
                                <Text style={styles.bold}>
                                    {item?.status.map(renderList)}
                                </Text>
                            </Text>
                        </View>
                        {editMode ? (
                            <View>
                                <Icon
                                    name={
                                        checkSelectList(select, item._id)
                                            ? 'ios-trash-sharp'
                                            : 'trash-outline'
                                    }
                                    size={30}
                                    color={
                                        checkSelectList(select, item._id)
                                            ? '#C04000'
                                            : 'black'
                                    }
                                />
                            </View>
                        ) : null}
                    </View>
                    {item.episode ? (
                        <Text>
                            {'Trạng Thái: '}
                            <Text
                                style={[
                                    styles.bold,
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    {
                                        color:
                                            filmStatus(item) === 'Trailer'
                                                ? '#BA160C'
                                                : 'green',
                                    },
                                ]}>
                                {filmStatus(item)}
                            </Text>
                        </Text>
                    ) : null}
                    <Text>
                        Thời Lượng:
                        <Text style={styles.bold}>{item?.durations} phút</Text>
                    </Text>
                    <Text>
                        Thể loại:{' '}
                        <Text style={styles.bold}>
                            {item?.genre.map(renderList)}
                        </Text>
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    const removeItem = async () => {
        if (select.length > 0) {
            setLoading(true);
            if (idList) {
                const res = await sendPost('/users/removefilmfromlist', {
                    idUser: dataUser._id,
                    select: select,
                    idList: idList,
                });
                setSelect([]);
                if (res.status === 200) {
                    setSelect([]);
                    getDataList();
                } else {
                    // lỗi tạo danh sách mới
                    console.log(res);
                }
                setLoading(false);
            } else {
                //List Yêu thích
                const res = await sendPost('/users/removelistLike', {
                    idUser: dataUser._id,
                    select: select,
                });
                setSelect([]);
                if (res.status === 200) {
                    setSelect([]);
                    const callDataUser = await sendPost('/users/getdata', {
                        userId: dataUser._id,
                    });
                    if (callDataUser.status === 200) {
                        dispatch(setUser(callDataUser.data));
                        fillDataFilms(callDataUser.data.listLike);
                    }
                } else {
                    // lỗi tạo danh sách mới
                    console.log(res);
                }
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        if (isFocused && idList) {
            getDataList();
        } else {
            fillDataFilms(listLike);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
        <LinearGradient
            colors={['#2980B9', '#6DD5FA', '#FFFFFF']}
            style={styles.flex1}>
            <View
                style={[
                    styles.mt40,
                    styles.flexRow,
                    styles.justifyContentBetween,
                    styles.alignItemsCenter,
                    styles.mh15,
                ]}>
                <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Icon name={'chevron-back'} size={30} />
                </TouchableOpacity>
                <View style={styles.textHeader}>
                    <Text style={styles.title}>
                        {dataList?.title ?? 'Phim yêu thích'}
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => {
                        setEditMode(!editMode);
                    }}>
                    <Icon
                        name={
                            editMode ? 'ios-settings' : 'ios-settings-outline'
                        }
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            {dataListFilms.length > 0 ? (
                <>
                    <FlatList data={dataListFilms} renderItem={renderFilm} />
                    {editMode ? (
                        <View
                            style={[
                                styles.flexRow,
                                styles.center,
                                styles.mbt10,
                                styles.viewBottomButton,
                            ]}>
                            <TouchableOpacity
                                onPress={removeItem}
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
                                    {`  Xoá ${select.length} phim`}
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
                                <Icon2
                                    name={'remove'}
                                    size={24}
                                    color={'black'}
                                />
                                <Text style={styles.bold18}>{'Huỷ'}</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}
                </>
            ) : null}
            <Loader loading={loading} />
        </LinearGradient>
    );
};

export default DetailsList;
