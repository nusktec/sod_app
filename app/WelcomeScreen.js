/**
 * Sample React Native WelcomeScreen
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from "react";
import {ImageBackground, SafeAreaView, StatusBar, View, Modal, TouchableOpacity, Linking} from "react-native";
import {Button, Icon, Input, Text} from "galio-framework";
import Toast from "react-native-toast-message";
import SvgImageView from 'react-native-svg-img';

import {imagesStore, themeColor} from "./Themes";
import {doLogin, setIsLogin} from "./Functions";

const WelcomeScreen: () => React$Node = (props) => {
    const [xtbar, setTBar] = useState('light-content');
    const [xloading, setLoading] = useState(false);
    const [xmodal, setModal] = useState(false);
    const [xphone, setXPhone] = useState('');
    const [xemail, setXEmail] = useState('');
    const [xnames, setXName] = useState('');
    const [xgender, setXGenger] = useState('M');

    //do final submission
    const submitReg = () => {
        //make all progress visible
        setModal(false);
        setLoading(true);
        let data = {
            mname: xnames,
            mphone: xphone,
            memail: xemail,
            mgender: xgender
        };
        doLogin(data).then(res => {
            //push to temp
            if (res.status) {
                setIsLogin(res.data).then(resp => {
                    //do login
                    Toast.show({
                        topOffset: 50,
                        text1: 'Logged In (' + res.data.mname + ')',
                        text2: 'Successfully logged, enjoy your readings...',
                        type: 'success'
                    });
                    //open home now
                    setTimeout(() => {
                        props.navigation.navigate("home_screen");
                    }, 2000);
                })
            } else {
                Toast.show({
                    topOffset: 50,
                    text1: 'Logging Failed !',
                    text2: 'Error logging in  at the moment...',
                    type: 'error'
                });
            }
            setModal(false);
            setLoading(true);
        }).catch(err => {
            Toast.show({
                topOffset: 50,
                text1: 'Logging Failed !',
                text2: 'Error logging in  at the moment...',
                type: 'error'
            });
            setModal(false);
            setLoading(false);
        });
    };

    return (
        <>
        <StatusBar barStyle={xtbar} backgroundColor={'transparent'} translucent/>
        <SafeAreaView style={{flex: 1, backgroundColor: themeColor().lightTheme.bgWhite}}>
            <ImageBackground source={imagesStore().bg11}
                             style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text bold h2 style={{color: themeColor().lightTheme.bgWhite, textAlign: 'center'}}>SEEDS OF DESTINY</Text>
                <Text h6 bold style={{color: themeColor().lightTheme.bgWhite}}>Newly Installed ?</Text>
            </ImageBackground>
            <View style={{
                flex: 1,
                backgroundColor: themeColor().lightTheme.bg,
                borderRadius: 20,
                alignItems: 'center',
                justifyContent: 'center',
                padding: 20,
                elevation: 1,
                marginTop: -50,
                marginHorizontal: 10,
                marginBottom: 20,
            }}>
                <View style={{alignItems: 'center', marginBottom: 10}}>
                    <Text bold muted style={{marginHorizontal: 20, marginBottom: 20}}>PLEASE SETUP YOUR
                        PROFILE</Text>
                    <Input onChangeText={(v) => setXName(v)} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                           placeholder="Names"
                           rounded={false} type="default" borderless={true} family={'feather'}
                           icon={'user'}/>
                    <Input onChangeText={(v) => setXPhone(v)} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                           placeholder="Phone"
                           rounded={false} type="number-pad" borderless={true} family={'feather'}
                           icon={'phone'}/>
                    <Input onChangeText={(v) => setXEmail(v)} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                           placeholder="Email"
                           rounded={false} type="email-address" borderless={true} family={'feather'}
                           icon={'mail'}/>
                </View>
                <View>
                    <Button loading={xloading} disabled={xloading} round size={'large'}
                            color={themeColor().lightTheme.INFO} onPress={() => {
                        //do sign up
                        if (xphone === '' || xemail === '' || xnames === '') {
                            Toast.show({
                                topOffset: 50,
                                text1: 'No input, check and try again !',
                                text2: 'Check form data and try again...',
                                type: 'error'
                            });
                            return;
                        }
                        //registration begins
                        setModal(true);

                    }}>CONTINUE</Button>
                    <Button round iconFamily={'feather'} icon={'youtube'} size={'large'} color="danger"
                            onPress={() => {
                                //open youtube
                                Linking.openURL('https://www.youtube.com/user/DrBeckyEnenche');
                            }}>YouTube</Button>
                </View>
            </View>
            <Modal onDismiss={() => {
                setTBar('light-content')
            }} onShow={() => {
                setTBar('dark-content')
            }} statusBarTranslucent
                   animationType="fade" visible={xmodal}>
                <TouchableOpacity onPress={() => {
                    setModal(false);
                }} style={{
                    position: 'absolute',
                    top: 30,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 10,
                    margin: 10
                }}>
                    <Icon color={themeColor().lightTheme.MUTED} family={'feather'} name={'x'} size={20} raised={true}/>
                </TouchableOpacity>
                <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Text h3 bold muted style={{marginVertical: 20}}>Select Gender</Text>
                    <SvgImageView
                        width={300}
                        height={200}
                        source={imagesStore().smile}
                    />
                    <Button style={{marginTop: 50}} round iconFamily={'feather'}
                            icon={(xgender === 'M' ? 'check' : 'x')}
                            size={'small'} color="success"
                            onPress={() => {
                                //open youtube
                                setXGenger('M');
                            }}>MALE</Button>
                    <Button round iconFamily={'feather'} icon={(xgender === 'F' ? 'check' : 'x')} size={'small'}
                            color="danger"
                            onPress={() => {
                                //open youtube
                                setXGenger('F');
                            }}>FEMALE</Button>
                    <TouchableOpacity onPress={() => {
                        //start reg...
                        submitReg();
                    }} style={{
                        position: 'absolute',
                        bottom: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                        <Icon color={'#000'} family={'feather'} name={'arrow-right'} size={20}/>
                        <Text bold h6>Continue</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
        </>
    );
};

export default WelcomeScreen;
