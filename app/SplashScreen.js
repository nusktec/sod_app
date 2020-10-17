/**
 * Sample React Native WelcomeScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from "react";
import {Image, SafeAreaView, StatusBar, Dimensions, View, ImageBackground} from "react-native";
import {Text, Button, Input} from "galio-framework";
import {themeColor, imagesStore} from "./Themes";

const SplashScreen: () => React$Node = (props) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate('welcome_screen');
        }, 3000);
    }, []);
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent/>
        <SafeAreaView style={{flex: 1, backgroundColor: themeColor().lightTheme.bgWhite}}>
            <ImageBackground source={imagesStore().bg6} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 150, height: 150}} source={imagesStore().logo}/>
                <Text bold h3 style={{color: themeColor().lightTheme.bgWhite}}>SEEDS OF DESTINY</Text>
                <Text bold p style={{fontSize: 13, color: '#fff'}}>Mobile v3</Text>
                <Text bold p style={{color: '#fff', fontSize: 12, position: 'absolute', bottom: 5}}>RSC BYTE LTD</Text>
            </ImageBackground>
        </SafeAreaView>
        </>
    );
};

export default SplashScreen;
