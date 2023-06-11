import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home, Profile, Search, Playlist} from '../screens';
import {
    HomeIcon,
    SearchIcon,
    PlaylistIcon,
    UserIcon,
} from 'src/components/IconTab';

const Tab = createBottomTabNavigator();

const HomeStack = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarIcon: ({focused}) => <HomeIcon focused={focused} />,
                }}
            />
            <Tab.Screen
                name="Playlist"
                component={Playlist}
                options={{
                    tabBarIcon: ({focused}) => (
                        <PlaylistIcon focused={focused} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({focused}) => <UserIcon focused={focused} />,
                }}
            />
        </Tab.Navigator>
    );
};

export default HomeStack;
