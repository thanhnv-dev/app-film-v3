import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    ScrollView,
    Image,
} from 'react-native';
import React, {useState} from 'react';
import styles from '../Details/styles';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from '../../components/StarRating';

const CommentsView = ({
    cmt,
    setCmt,
    ButtonCmtHandler,
    dataCmts,
    rating,
    setRating,
}) => {
    const renderCmts = (element, index) => {
        return (
            <View key={index} style={[styles.mh10, styles.mt10]}>
                <Text style={styles.bold18}>{element.nameUser}</Text>
                <Text>{element.createdAt.slice(0, 10)}</Text>
                <View>
                    <StarRating avgRating={element.rating} />
                </View>
                <Text style={styles.content}>{element.content}</Text>
            </View>
        );
    };

    const arrayRating = [1, 2, 3, 4, 5];

    const renderStar = arrayRating.map(element => {
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                key={element + ''}
                onPress={() => setRating(element)}>
                <Image
                    style={styles.Star}
                    source={
                        element <= rating
                            ? require('../../assets/icons/star_filled.png')
                            : require('../../assets/icons/star_corner.png')
                    }
                />
            </TouchableOpacity>
        );
    });
    return (
        <View style={styles.viewCmts}>
            <View style={[styles.center, styles.cmtBox, styles.mh10]}>
                <Text>Chọn sao đánh giá</Text>
                <View style={[styles.flexRow, styles.mv5]}>{renderStar}</View>
                <View style={styles.viewInput}>
                    <TextInput
                        paddingLeft={10}
                        autoCapitalize="none"
                        clearButtonMode="while-editing"
                        selectionColor="black"
                        placeholderTextColor={'black'}
                        spellCheck={false}
                        multiline={true}
                        style={[styles.boxInput]}
                        value={cmt}
                        onChangeText={setCmt}
                        placeholder={'...'}
                    />
                    <TouchableOpacity>
                        <Icon
                            name="arrow-redo"
                            size={30}
                            onPress={ButtonCmtHandler}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.mbt30}>{dataCmts?.map(renderCmts)}</View>
            </ScrollView>
        </View>
    );
};

export default CommentsView;
