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
import {themeColor, imagesStore, bgShuffler} from "./Themes";
import {isLogin} from "./Functions";

const SplashScreen: () => React$Node = (props) => {
    useEffect(() => {
        //do main timeout
        setTimeout(() => {
            isLogin().then(res=>{
                if(res && typeof res ==='object'){
                    props.navigation.replace('home_screen');
                }else{
                    props.navigation.replace('welcome_screen');
                }
            }).catch(err=>{
                props.navigation.replace('welcome_screen');
            })
        }, 3000);
    });
    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor={'transparent'} translucent/>
            <ImageBackground source={bgShuffler()} style={{flex: 1, alignItems: 'center', justifyContent: 'center', resizeMode: 'contain'}}>
                <Image style={{width: 100, height: 100, marginVertical: 50}} source={imagesStore().logo}/>
                <Text bold h3 style={{color: themeColor().lightTheme.bgWhite}}>SEEDS OF DESTINY</Text>
                <Text bold p style={{fontSize: 13, color: '#fff'}}>Mobile x3</Text>
                <Text bold p style={{color: '#fff', fontSize: 12, position: 'absolute', bottom: 20}}>RSC BYTE LTD</Text>
            </ImageBackground>
        </>
    );
};

export default SplashScreen;
