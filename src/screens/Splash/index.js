import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View, Button} from 'react-native';
import {useDispatch} from 'react-redux';
import {setUser} from 'src/redux/slice/user';
import {sendPost} from 'src/network/request';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
    const dispatch = useDispatch();
    const [data, setData] = useState('init');
    console.log('data', data);
    const initApp = async () => {
        const userId = await AsyncStorage.getItem('id');

        const token = await AsyncStorage.getItem('token');

        if (userId && token) {
            setTimeout(async () => {
                const res = await sendPost('/users/getdata', {userId: userId});
                if (res.status === 200) {
                    dispatch(setUser(res.data));

                    navigation.replace('HomeStack');
                } else {
                    navigation.replace('Login');
                }
            }, 1000);
        } else {
            navigation.replace('Login');
        }
    };

    const getData = () => {
        setTimeout(() => {
            //call api
            //hoàn thành và có data
            // setData('res');
        }, 1000);
    };

    useEffect(() => {
        console.log('call useEffect');
        getData();
        // initApp();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     //logic
    // }, []);

    return (
        <View style={styles.container}>
            {console.log('render view')}
            <ActivityIndicator size="large" />
            <Button title="setState" onPress={() => setData(['123'])} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});
export default Splash;
