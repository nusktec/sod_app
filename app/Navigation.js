/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from 'react';
import {} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//start navigation
const Stack = createStackNavigator();
//import screen
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import HomeScreen from './pages/Home';
//main container
export default () => {
    return (
        <>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="splash_screen">
                    <Stack.Screen component={SplashScreen} name="splash_screen" options={{headerShown: false}}/>
                    <Stack.Screen component={WelcomeScreen} name="welcome_screen" options={{headerShown: false}}/>
                    <Stack.Screen component={HomeScreen} name="home_screen" options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
        </>
    )
}