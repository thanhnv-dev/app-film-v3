import {
    View,
    Text,
    TouchableOpacity,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TextInput,
    Dimensions,
    ScrollView,
    ImageBackground,
    FlatList,
    SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {BASE_URL} from 'src/constants/const';
import {useSelector} from 'react-redux';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({navigation}) => {
    const dataFilms = useSelector(state => state.films.data);
    const [resultsData, setResultsData] = useState([]);

    useEffect(() => {}, []);

    const convertetText = text =>
        text
            .trim()
            .toLocaleLowerCase()
            .replaceAll(' ', '')
            .replaceAll(':', '')
            .replaceAll('`', '')
            .replaceAll("'", '')
            .replaceAll('-', '');

    const onChangeInputText = text => {
        if (text !== '') {
            const results = dataFilms.filter(element => {
                const text1 = convertetText(element.name);

                const text2 = convertetText(text);

                return text1.includes(text2);
            });
            setResultsData(results);
        } else {
            setResultsData([]);
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
                style={[styles.itemFilm, styles.mh10, styles.flexRow]}
                onPress={() => {
                    navigation.navigate('Details', {
                        idFilm: item._id,
                    });
                }}>
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

    return (
        <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            style={styles.flex1}>
            <LinearGradient
                colors={['#DAE2F8', '#D6A4A4']}
                style={styles.flex1}>
                <SafeAreaView>
                    <View
                        style={[
                            styles.flexRow,
                            styles.justifyContentBetween,
                            styles.alignItemsCenter,
                            styles.mh15,
                            styles.mbt10,
                        ]}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name={'chevron-back'} size={30} />
                        </TouchableOpacity>
                        <Text style={styles.titleSearch}>Tìm Kiếm</Text>
                        <View style={{width: 22}} />
                    </View>
                    <View
                        style={[
                            styles.shadow,
                            styles.boxInput,
                            styles.mh15,
                            styles.justifyContentCenter,
                        ]}>
                        <TextInput
                            paddingLeft={10}
                            clearButtonMode="always"
                            keyboardType="default"
                            secureTextEntry={false}
                            placeholder={'Nhập tên phim'}
                            placeholderTextColor="#353839"
                            onChangeText={onChangeInputText}
                        />
                    </View>
                    <View style={styles.mt10}>
                        {resultsData.length > 0 ? (
                            <FlatList
                                data={resultsData}
                                renderItem={renderFilm}
                            />
                        ) : (
                            <View>
                                <Text
                                    style={[
                                        styles.bold18,
                                        styles.textAlignCenter,
                                        styles.textnotfound,
                                    ]}>
                                    Không có kết quả!
                                </Text>
                            </View>
                        )}
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    );
};

export default Search;
