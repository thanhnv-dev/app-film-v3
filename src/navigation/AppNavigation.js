import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './RootNavigation';
import {
    Splash,
    Login,
    SignUp,
    Search,
    Details,
    PlayVideo,
    DetailsList,
} from '../screens';
import HomeStack from './BottomTabs';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="Splash" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
        </Stack.Navigator>
    );
};
const AppNavigation = () => {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                }}>
                <Stack.Screen name="AuthStack" component={AuthStack} />
                <Stack.Screen name="HomeStack" component={HomeStack} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Details" component={Details} />
                <Stack.Screen name="PlayVideo" component={PlayVideo} />
                <Stack.Screen name="DetailsList" component={DetailsList} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default AppNavigation;
