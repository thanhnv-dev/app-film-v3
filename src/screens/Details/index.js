import {
    View,
    Text,
    FlatList,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Image,
    TextInput,
    Animated,
    useWindowDimensions,
    ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import YoutubePlayer from 'react-native-youtube-iframe';
import styles from './styles';
import {sendPost, sendGet} from 'src/network/request';
import {BASE_URL} from 'src/constants/const';
import {Loader} from 'src/components';
import {useSelector, useDispatch} from 'react-redux';
import {setUser} from 'src/redux/slice/user';
import {Dialog} from '@rneui/themed';
import StarRating from '../../components/StarRating';
import {useIsFocused} from '@react-navigation/native';

const Details = props => {
    const dispatch = useDispatch();

    const isFocused = useIsFocused();

    const {idFilm} = props.route.params;

    const dataUser = useSelector(state => state.user);

    const idUser = dataUser._id;

    const {width} = useWindowDimensions();

    const [dataFilm, setDataFilm] = useState(null);
    const [dataCmts, setDataCmts] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingCreateList, setLoadingCreateList] = useState(false);
    const [visible, setVisible] = useState(false);
    const [inputDialog, setInputDialog] = useState(null);
    const [listPlay, setListPlay] = useState(dataUser?.listPlay);

    const pageRef = useRef(null);
    const scrollX = useRef(new Animated.Value(0)).current;

    const checkLike = dataUser?.listLike?.some(
        value => value === dataFilm?._id,
    );

    const toggleDialog = () => setVisible(false);

    const goPlayVideo = () =>
        props.navigation.push('PlayVideo', {dataFilm: dataFilm});

    const getDataFilm = async () => {
        const getData = await sendPost('/films/details', {
            idFilm: idFilm,
        });

        setDataFilm(getData.data);
    };

    const getDataCmts = async () => {
        const getData = await sendGet(`/cmts/data?idFilm=${idFilm}`);

        setDataCmts(getData.data);
    };

    const callGetData = async () => {
        setLoading(true);

        await Promise.all([getDataFilm(), getDataCmts()]);

        setLoading(false);
    };

    const onPressLike = async () => {
        setLoading(true);

        await sendPost('/users/like', {
            idFilm: idFilm,
            idUser: idUser,
        });

        const res = await sendPost('/users/getdata', {userId: idUser});

        if (res.status === 200) {
            dispatch(setUser(res.data));
        }

        setLoading(false);
    };

    const onPressAddToList = async () => {
        setLoading(true);
        const reGetDataUser = await sendPost('/users/getdata', {
            userId: idUser,
        });
        setLoading(false);
        if (reGetDataUser.status === 200) {
            const newDataUser = reGetDataUser.data;

            dispatch(setUser(newDataUser));

            setListPlay(newDataUser?.listPlay);

            setVisible(true);
        } else {
            //Lỗi call api get data user
            console.log(reGetDataUser);
        }
    };
    const onPressAddToList2 = async () => {
        setLoadingCreateList(true);
        await sendPost('/users/addtolist', {
            idFilm: idFilm,
            idUser: idUser,
            listUpdate: listPlay,
        });
        const res = await sendPost('/users/getdata', {userId: idUser});
        if (res.status === 200) {
            dispatch(setUser(res.data));
            setListPlay(res.data?.listPlay);
        }
        setLoadingCreateList(false);
    };
    const onPressCreateList = async () => {
        if (inputDialog) {
            setLoadingCreateList(true);
            const res = await sendPost('/users/createlist', {
                idFilm: idFilm,
                idUser: idUser,
                title: inputDialog,
            });
            if (res.status === 200) {
                const callDataUser = await sendPost('/users/getdata', {
                    userId: idUser,
                });
                if (callDataUser.status === 200) {
                    dispatch(setUser(callDataUser.data));
                    setListPlay(callDataUser.data?.listPlay);
                }
            } else {
                // lỗi tạo danh sách mới
                console.log(res);
            }
            setLoadingCreateList(false);
        }
    };

    const renderImages = item => {
        return (
            <Image
                key={item.item.toString()}
                source={{uri: `${item.item}`}}
                style={styles.image}
                resizeMode="cover"
            />
        );
    };

    const renderPaginator = (_, index) => {
        const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
        ];

        const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 25, 10],
            extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.2, 1, 0.2],
            extrapolate: 'clamp',
        });
        return (
            <Animated.View
                style={[styles.dot, {width: dotWidth, opacity}]}
                key={index.toString()}
            />
        );
    };
    const avgRating = () => {
        const totalRating = dataCmts?.reduce((total, element) => {
            return total + parseInt(element.rating, 10);
        }, 0);
        return Math.round(totalRating / dataCmts?.length);
    };

    const filmStatus = () => {
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
    const renderList = (element, index, parent) => {
        return (
            <Text key={element.toString()}>
                {element}
                {index < parent.length - 1 ? ', ' : ''}
            </Text>
        );
    };

    const addSelectList = id => {
        let newPlaylist = [...listPlay];
        newPlaylist?.forEach((element, index) => {
            if (element._id === id) {
                let newData = [...newPlaylist[index].data];
                if (checkSelectList(element?.data, idFilm)) {
                    newPlaylist[index].data = newData.filter(
                        value => value !== idFilm,
                    );
                } else {
                    newData.push(idFilm);
                    newPlaylist[index].data = newData;
                }
            }
        });
        setListPlay(newPlaylist);
    };

    const checkSelectList = (value1, value2) => {
        return value1?.some(element => {
            return element === value2;
        });
    };
    const checkSelectList2 = idList => {
        let result = false;
        listPlay.forEach(element => {
            if (element._id === idList) {
                result = checkSelectList(element.data, idFilm);
            }
        });
        return result;
    };

    const renderListPlay = element => {
        return (
            <TouchableOpacity
                key={element?._id?.toString()}
                style={[
                    styles.flexRow,
                    styles.justifyContentBetween,
                    styles.mv10,
                ]}
                onPress={() => addSelectList(element?._id)}>
                <Text style={styles.bold}>{element.title}</Text>
                <Icon3
                    name={
                        checkSelectList2(element._id)
                            ? 'check-box'
                            : 'check-box-outline-blank'
                    }
                    size={24}
                />
            </TouchableOpacity>
        );
    };

    useEffect(() => {
        callGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataUser, isFocused]);

    return (
        <LinearGradient
            colors={['#333333', '#e9d362']}
            style={styles.container}>
            <StatusBar barStyle="light-content" />
            <View style={styles.mt40}>
                <View style={styles.textHeader}>
                    <Text style={styles.textTitle}>Chi Tiết Phim</Text>
                </View>
                <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={styles.iconHeader}>
                    <Icon
                        name="chevron-back-outline"
                        size={24}
                        color={'white'}
                    />
                </TouchableOpacity>
            </View>
            {dataFilm ? (
                <>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <YoutubePlayer
                            height={220}
                            width={width}
                            videoId={dataFilm.idTrailer}
                        />
                        <View style={styles.viewName}>
                            <Text style={[styles.TextName, styles.mv10]}>
                                {dataFilm.name}
                            </Text>
                        </View>
                        <View style={styles.viewButton}>
                            <TouchableOpacity onPress={onPressLike}>
                                <Icon
                                    name={
                                        checkLike
                                            ? 'ios-heart-sharp'
                                            : 'ios-heart-outline'
                                    }
                                    color={'#f85032'}
                                    size={35}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={
                                    // eslint-disable-next-line react-native/no-inline-styles
                                    {
                                        opacity:
                                            dataFilm?.episode?.current === 0
                                                ? 0.2
                                                : 1,
                                    }
                                }
                                disabled={dataFilm?.episode?.current === 0}
                                onPress={goPlayVideo}>
                                <LinearGradient
                                    colors={['#aa4b6b', '#6b6b83', '#3b8d99']}
                                    style={[
                                        styles.buttonPlay,
                                        // eslint-disable-next-line react-native/no-inline-styles
                                    ]}>
                                    <Icon
                                        name="ios-play-circle-outline"
                                        size={30}
                                        color={'white'}
                                    />
                                    <Text
                                        style={[styles.bold, {color: 'white'}]}>
                                        Xem Phim{' '}
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Icon2
                                    onPress={onPressAddToList}
                                    name={'playlist-plus'}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>

                        <View>
                            <View style={[styles.flexRow, styles.mt10]}>
                                <View style={[styles.viewAvt, styles.shadow]}>
                                    <Image
                                        source={{
                                            uri: `${dataFilm.avatar}`,
                                        }}
                                        style={styles.imageAvt}
                                        resizeMode="stretch"
                                    />
                                </View>
                                <View style={styles.viewDetails}>
                                    <StarRating avgRating={avgRating()} />
                                    <Text>
                                        Điểm yêu thích:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.point}
                                        </Text>
                                    </Text>
                                    <Text>
                                        Chất Lượng:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.status.map(renderList)}
                                        </Text>
                                    </Text>
                                    {dataFilm.episode ? (
                                        <Text>
                                            {'Trạng Thái: '}
                                            <Text
                                                style={[
                                                    styles.bold,
                                                    // eslint-disable-next-line react-native/no-inline-styles
                                                    {
                                                        color:
                                                            filmStatus() ===
                                                            'Trailer'
                                                                ? '#BA160C'
                                                                : '#66FF00',
                                                    },
                                                ]}>
                                                {filmStatus()}
                                            </Text>
                                        </Text>
                                    ) : null}
                                    <Text>
                                        Thời Lượng:
                                        <Text style={styles.bold}>
                                            {dataFilm?.durations} phút
                                        </Text>
                                    </Text>
                                    <Text>
                                        Thể loại:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.genre.map(renderList)}
                                        </Text>
                                    </Text>
                                </View>
                            </View>

                            <View style={styles.viewContent}>
                                <View style={styles.mh10}>
                                    <Text>
                                        Loại Phim:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.type}
                                        </Text>
                                    </Text>
                                    <Text>
                                        Quốc Gia:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.country}
                                        </Text>
                                    </Text>

                                    <Text>
                                        Ngày Ra Mắt:{' '}
                                        <Text style={styles.bold}>
                                            {dataFilm?.releaseDay}{' '}
                                        </Text>
                                    </Text>
                                </View>

                                <View style={[styles.image, styles.mt10]}>
                                    <FlatList
                                        renderItem={renderImages}
                                        data={dataFilm.listImage}
                                        horizontal
                                        showsHorizontalScrollIndicator={false}
                                        pagingEnabled
                                        bounces={false}
                                        onScroll={Animated.event(
                                            [
                                                {
                                                    nativeEvent: {
                                                        contentOffset: {
                                                            x: scrollX,
                                                        },
                                                    },
                                                },
                                            ],
                                            {
                                                useNativeDriver: false,
                                            },
                                        )}
                                        ref={pageRef}
                                    />
                                </View>
                                <View
                                    style={[
                                        styles.flexRow,
                                        styles.center,
                                        styles.mt10,
                                    ]}>
                                    {dataFilm?.listImage?.map(renderPaginator)}
                                </View>
                                <View style={styles.mbt30}>
                                    <Text style={styles.titleContent}>
                                        Nôi Dung Phim:
                                    </Text>
                                    <Text>{dataFilm.content}</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </>
            ) : null}
            {visible ? (
                <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
                    <Dialog.Title
                        title="Danh sách phim"
                        titleStyle={[
                            styles.DialogTitle,
                            styles.textAlignCenter,
                        ]}
                    />
                    <View
                        style={[
                            styles.flexRow,
                            styles.viewInputDialog,
                            styles.mt10,
                        ]}>
                        <TextInput
                            style={[
                                styles.inputDialog,
                                styles.mv5,
                                styles.flex1,
                            ]}
                            paddingLeft={10}
                            spellCheck={false}
                            placeholder="Tạo mới danh sách"
                            maxLength={20}
                            onChangeText={setInputDialog}
                        />
                        <View style={styles.center}>
                            <TouchableOpacity>
                                <Icon2
                                    onPress={onPressCreateList}
                                    name={'playlist-plus'}
                                    size={35}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    {loadingCreateList ? (
                        <ActivityIndicator size="large" />
                    ) : null}
                    <ScrollView
                        style={styles.scrollDialog}
                        showsVerticalScrollIndicator={false}>
                        {dataUser?.listPlay?.map(renderListPlay)}
                    </ScrollView>
                    <TouchableOpacity
                        style={[styles.buttonAddFilm, styles.center]}
                        onPress={onPressAddToList2}>
                        <Text>Thêm vào danh sách</Text>
                    </TouchableOpacity>
                </Dialog>
            ) : null}
            <Loader loading={loading} />
        </LinearGradient>
    );
};

export default Details;
