import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {BASE_URL, BASE_URL_LOCAL} from '../../constants/const';
import LinearGradient from 'react-native-linear-gradient';
import CommentsView from './CommentsView';
import {sendGet, sendPost} from '../../network/request';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import DropDownPicker from 'react-native-dropdown-picker';
import {useIsFocused} from '@react-navigation/native';
import {setUser} from 'src/redux/slice/user';
import {Loader} from '../../components';
import moment from 'moment';

const PlayVideo = ({navigation, route}) => {
    const dispatch = useDispatch();
    const {dataFilm} = route.params;
    const video = useRef();
    const isFocused = useIsFocused();

    const name = dataFilm.name;
    const dataUser = useSelector(state => state.user);

    const [dataCmts, setDataCmts] = useState(null);
    const [rating, setRating] = useState(4);
    const [cmt, setCmt] = useState('');
    const [loading, setLoading] = useState(false);
    // const [initVideo, setInitVideo] = useState(false);
    // const [initTime, setInitTime] = useState(0);
    const [currentTime, setCurrentTime] = useState(null);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(
        dataFilm?.episode?.data
            ? dataFilm?.episode?.data[0]?.value
            : dataFilm?.episode?.value,
    );

    const getDataCmts = async () => {
        const getData = await sendGet(`/cmts/data?idFilm=${dataFilm._id}`);

        setDataCmts(getData.data);
    };

    const ButtonCmtHandler = () => {
        setLoading(true);
        sendPost('/cmts/create', {
            idFilm: dataFilm._id,
            nameUser: dataUser.name,
            idUser: dataUser._id,
            content: cmt,
            rating: rating,
        }).then(res => {
            setDataCmts(res?.data);
            setLoading(false);
        });
        setCmt('');
    };

    const recordHistory = async () => {
        const dataEpisode = dataFilm?.episode?.data
            ? dataFilm?.episode?.data
            : dataFilm?.episode?.value;
        let currentEpisode = 0;
        if (value !== dataEpisode) {
            dataEpisode.forEach(e => {
                if (e?.value == value) {
                    currentEpisode = e;
                }
            });
        }
        if (currentTime > 0) {
            const res = await sendPost('/users/recordhistory', {
                idFilm: dataFilm._id,
                idUser: dataUser._id,
                currentTime: currentTime,
                currentEpisode: currentEpisode,
            });
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
        }
    };
    // const settingInitVideo = () => {
    //     setLoading(true);
    //     const dataHistory = dataUser.listHistory;

    //     const result = dataHistory.filter(e => {
    //         return e.idFilm === dataFilm._id;
    //     });
    //     if (result?.length > 0) {
    //         const history = result[0];

    //         const date = moment('2015-01-01')
    //             .startOf('day')
    //             .seconds(history?.currentTime)
    //             .format('H:mm:ss');
    //         Alert.alert(
    //             `Lần trước bạn đang xem ở ${
    //                 history.currentEpisode !== 0
    //                     ? `${history.currentEpisode.label}`
    //                     : ''
    //             } ${date} bạn có muốn xem tiếp không ?`,
    //             '',
    //             [
    //                 {
    //                     text: 'Không',
    //                     onPress: () => {
    //                         setInitTime(0);
    //                         setInitVideo(true);
    //                         setLoading(false);
    //                     },
    //                     style: 'cancel',
    //                 },
    //                 {
    //                     text: 'Có',
    //                     onPress: () => {
    //                         setInitTime(history?.currentTime);
    //                         setInitVideo(true);
    //                         setLoading(false);
    //                     },
    //                     style: 'default',
    //                 },
    //             ],
    //         );
    //     } else {
    //         setInitTime(0);
    //         setInitVideo(true);
    //         setLoading(false);
    //     }
    // };

    useEffect(() => {
        getDataCmts();
        // settingInitVideo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFocused]);

    return (
        <LinearGradient colors={['#333333', '#e9d362']} style={styles.flex1}>
            <View style={styles.mt40}>
                <TouchableOpacity
                    style={styles.ml10}
                    onPress={async () => {
                        recordHistory();
                        navigation.pop();
                    }}>
                    <Icon
                        name="chevron-back-outline"
                        size={30}
                        color={'black'}
                    />
                </TouchableOpacity>
            </View>
            <Text style={styles.Name}>{name}</Text>
            {/* {initVideo ? ( */}
            <Video
                ref={video}
                source={{
                    uri: `${BASE_URL_LOCAL}/video/?id=${value}`,
                }}
                onBuffer={this.onBuffer}
                controls
                onError={this.videoError}
                style={[styles.Video, styles.mt10]}
                paused={true}
                onProgress={progress => {
                    setCurrentTime(progress.currentTime);
                }}
                progressUpdateInterval={3000}
                onLoad={() => {
                    // video?.current?.seek(initTime);
                }}
            />
            {/* ) : null} */}
            {dataFilm?.episode?.total > 1 ? (
                <DropDownPicker
                    open={open}
                    value={value}
                    items={dataFilm?.episode?.data}
                    setOpen={setOpen}
                    setValue={setValue}
                    placeholder={'Chọn Tập'}
                    style={[styles.dropDown]}
                    containerStyle={[styles.dropDown, styles.mv10]}
                />
            ) : null}
            <View style={styles.flex1}>
                <Text style={styles.titleReview}>Đánh giá phim</Text>
                {loading ? null : (
                    <CommentsView
                        cmt={cmt}
                        setCmt={setCmt}
                        ButtonCmtHandler={ButtonCmtHandler}
                        dataCmts={dataCmts}
                        rating={rating}
                        setRating={setRating}
                    />
                )}
            </View>
            <Loader loading={loading} />
        </LinearGradient>
    );
};
export default PlayVideo;
