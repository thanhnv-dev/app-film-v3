import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {
    home,
    home_active,
    search,
    search_active,
    playlist,
    playlist_active,
    user,
    user_active,
} from 'src/assets/icons';

const HomeIcon = ({focused}) => {
    return <Image source={focused ? home_active : home} style={styles.icon} />;
};
const SearchIcon = ({focused}) => {
    return (
        <Image source={focused ? search_active : search} style={styles.icon} />
    );
};
const PlaylistIcon = ({focused}) => {
    return (
        <Image
            source={focused ? playlist_active : playlist}
            style={styles.icon}
        />
    );
};
const UserIcon = ({focused}) => {
    return <Image source={focused ? user_active : user} style={styles.icon} />;
};

export {HomeIcon, SearchIcon, PlaylistIcon, UserIcon};

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});
