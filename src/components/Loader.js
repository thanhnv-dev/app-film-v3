import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

const Loader = ({loading}) => {
    return loading ? (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    ) : null;
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#00000090',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default Loader;
