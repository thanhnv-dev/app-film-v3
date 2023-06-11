import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './styles';
import {Dialog} from '@rneui/themed';
import {sendPost, sendGet} from 'src/network/request';
import {setUser} from 'src/redux/slice/user';
import {Loader} from '../../components';
import {useIsFocused} from '@react-navigation/native';
import {BASE_URL} from 'src/constants/const';

const Profile = ({navigation}) => {
    const dispatch = useDispatch();
    const isFocused = useIsFocused();

    const dataUser = useSelector(state => state.user);
    const dataFilms = useSelector(state => state.films.data);
    const [dataHistory, setDataHistory] = useState([]);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState(dataUser.name);
    const [email, setEmail] = useState(dataUser.email);
    const toggleDialog = () => setVisible(false);
    const clearAll = async () => {
        try {
            await AsyncStorage.clear();
        } catch (e) {
            // clear error
        }
    };
    const logOut = () => {
        clearAll();
        navigation.navigate('AuthStack');
    };
    const updateUser = async () => {
        setVisible(false);
        if (name !== dataUser.name || email !== dataUser.email) {
            setLoading(true);
            const getData = await sendPost('/users/update', {
                idUser: dataUser._id,
                name: name,
                email: email,
            });
            if (getData.status === 200) {
                getDataUser();
            }
            setLoading(false);
        }
    };

    const getDataUser = async () => {
        setLoading(true);
        const res = await sendPost('/users/getdata', {userId: dataUser._id});
        if (res.status === 200) {
            dispatch(setUser(res.data));
        }
        setLoading(false);
    };

    const fillDataFilm = () => {
        const listHistory = dataUser?.listHistory;
        const data = [];
        listHistory?.forEach(list => {
            dataFilms.forEach(e => {
                if (e._id === list.idFilm) {
                    data.push({
                        ...list,
                        ...e,
                    });
                }
            });
        });
        setDataHistory(data);
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

    const renderFilm = ({item}) => {
        return (
            <TouchableOpacity
                style={[
                    styles.itemFilm,
                    styles.mh10,
                    // eslint-disable-next-line react-native/no-inline-styles
                ]}
                onPress={() =>
                    navigation.navigate('Details', {
                        idFilm: item._id,
                    })
                }>
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
    useEffect(() => {
        if (isFocused) {
            getDataUser();
            fillDataFilm();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
        <LinearGradient colors={['#C9D6FF', '#E2E2E2']} style={styles.flex1}>
            <View style={[styles.viewHeader, styles.flexRow]}>
                <TouchableOpacity
                    onPress={logOut}
                    style={[styles.flexRow, styles.alignItemsCenter]}>
                    <Text>Đăng Xuất </Text>
                    <Icon name="log-out" size={30} />
                </TouchableOpacity>
            </View>
            <View style={styles.viewUser}>
                <LinearGradient
                    colors={['#0F2027', '#203A43', '#2C5364']}
                    style={styles.boderUser}>
                    <Text style={styles.name}>{dataUser.name}</Text>
                    <Text style={[styles.email, styles.mbt10]}>
                        {dataUser.email}
                    </Text>
                    <TouchableOpacity
                        style={styles.buttonEdit}
                        onPress={() => setVisible(true)}>
                        <Icon name="edit" size={20} color={'white'} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <View style={[styles.viewHistory, styles.flex1]}>
                <Text style={styles.textHistory}>Lịch Sử</Text>
                <FlatList data={dataHistory} renderItem={renderFilm} />
            </View>
            {visible ? (
                <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
                    <Dialog.Title
                        title="Chỉnh sửa thông tin"
                        titleStyle={[
                            styles.DialogTitle,
                            styles.textAlignCenter,
                        ]}
                    />
                    <Text>Tên người dùng</Text>
                    <TextInput
                        style={[styles.inputDialog, styles.mv5]}
                        value={name}
                        onChangeText={setName}
                        paddingLeft={10}
                        spellCheck={false}
                        maxLength={20}
                    />
                    <Text>Địa chỉ email</Text>
                    <TextInput
                        style={[styles.inputDialog, styles.mv5]}
                        value={email}
                        onChangeText={setEmail}
                        paddingLeft={10}
                        spellCheck={false}
                        maxLength={30}
                    />
                    <View style={styles.center}>
                        <TouchableOpacity
                            style={[styles.buttonUpdate, styles.center]}
                            onPress={updateUser}>
                            <Text style={styles.bold}>Cập Nhật</Text>
                        </TouchableOpacity>
                    </View>
                    <TextInput />
                </Dialog>
            ) : null}
            <Loader loading={loading} />
        </LinearGradient>
    );
};
export default Profile;
