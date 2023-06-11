import {View, Image, Text, StyleSheet} from 'react-native';
import React from 'react';

const StarRating = ({
    avgRating,
    reviewcount,
    showCountReview,
    containerStyle,
}) => {
    const arrayRating = [1, 2, 3, 4, 5];
    const renderStar = arrayRating.map(element => {
        return (
            <View activeOpacity={0.7} key={element + ''}>
                <Image
                    style={styles.Star}
                    source={
                        element - 0.5 <= avgRating
                            ? require('../assets/icons/star_filled.png')
                            : require('../assets/icons/star_corner.png')
                    }
                />
            </View>
        );
    });
    return (
        <View style={[styles.viewStatr, containerStyle]}>
            {renderStar}
            {showCountReview && (
                <Text style={styles.numberStatr}>
                    ({!reviewcount ? 0 : reviewcount})
                </Text>
            )}
        </View>
    );
};
const styles = StyleSheet.create({
    Star: {
        resizeMode: 'cover',
        tintColor: '#F4DF4EFF',
        marginBottom: 3,
        marginRight: 4,
        width: 15,
        height: 15,
    },
    numberStatr: {
        color: '#23D2FF',
        fontSize: 15,
    },
    viewStatr: {
        flexDirection: 'row',
    },
});

export default StarRating;
