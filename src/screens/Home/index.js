import {
    View,
    Text,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Image,
    SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {sendGet} from 'src/network/request';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {setDataFilm, setDataFilmWithTopics} from '../../redux/slice/film';
import {BASE_URL} from 'src/constants/const';
import styles from './styles';
import {Loader} from '../../components';

const Home = ({navigation}) => {
    const dispatch = useDispatch();

    const dataFilms = useSelector(state => state.films.dataWithTopics);

    const [loading, setLoading] = useState(false);

    const getDataFilms = async () => {
        await sendGet('/films/datawithtopic')
            .then(res => {
                dispatch(setDataFilmWithTopics(res.data));
            })
            .catch(function (error) {});
    };
    const getDataAllFilms = async () => {
        await sendGet('/films/data')
            .then(res => {
                dispatch(setDataFilm(res.data));
            })
            .catch(function (error) {});
    };
    const callGetData = async () => {
        setLoading(true);

        await Promise.all([getDataFilms(), getDataAllFilms()]);

        setLoading(false);
    };

    useEffect(() => {
        if (dataFilms.length === 0) {
            callGetData();
        }
        setInterval(() => {
            callGetData();
        }, 900000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderImage = ({item}) => {
        return (
            <TouchableOpacity
                style={styles.ItemPopular}
                key={item._id}
                onPress={() => {
                    navigation.navigate('Details', {idFilm: item._id});
                }}>
                <Image
                    source={{
                        uri: `${item.avatar}`,
                    }}
                    style={styles.imagePopular}
                    resizeMode="stretch"
                />
            </TouchableOpacity>
        );
    };

    const renderItem = item => {
        return (
            <View key={item.topic}>
                <Text style={[styles.popularTitle, styles.mh10]}>
                    {item.topic}
                </Text>
                <FlatList
                    horizontal={true}
                    data={item.data}
                    renderItem={renderImage}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        );
    };

    const goSearch = () => navigation.navigate('Search');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <View
                    style={[
                        styles.flexRow,
                        styles.justifyContentBetween,
                        styles.mh10,
                    ]}>
                    <Text style={styles.popularTitle}>App Film</Text>
                    <TouchableOpacity onPress={goSearch}>
                        <Icon name="search" size={20} color="#bdc3c7" />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {dataFilms.map(renderItem)}
                </ScrollView>
            </SafeAreaView>
            <Loader loading={loading} />
        </View>
    );
};

export default Home;
