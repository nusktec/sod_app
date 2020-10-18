/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React, {useEffect, useState} from 'react';
import {StatusBar, View, BackHandler, Alert, SafeAreaView, TouchableOpacity} from 'react-native';
import {Text, Button, Icon} from "galio-framework";
import {imagesStore, themeColor} from "./../Themes";
import LottieView from 'lottie-react-native';
import {Divider} from "react-native-elements";
import {getList, isLogin} from "./../Functions";
//import screen
import Calendar from "./Calendar";
import List from "./Lists";
import Notifications from "./Notifications";
import Profile from "./Profile";

//export main app
const Home: () => React$Node = (props) => {
    //use state
    const [loading, setXLoader] = useState(true);
    const [profile, setXProfile] = useState({});
    const [xtoday, setXToday] = useState({
        ctopic: 'No Seeds Of Destiny Uploaded Today...',
        cbody: 'No Content !',
        cimage: 'null',
        cscripture: 'No Scripture',
        cuptime: 'No Date Published !',
        cstatus: 0,
    });
    const [xdata, setXData] = useState([]);
    const [menu, setXMenu] = useState(1);
    useEffect(() => {
        //fetch users
        isLogin().then(r=>{
            setXProfile(r);
        });
        const backAction = () => {
            Alert.alert("Hold on !", "Are you sure you want to go quit ?", [
                {
                    text: "Cancel",
                    onPress: () => null,
                    style: "cancel"
                },
                {text: "Yes", onPress: () => BackHandler.exitApp()}
            ]);
            return true;
        };
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            backAction
        );
        return () => backHandler.remove();
    }, []);

    //main retry func
    const retryBox = () => {
        Alert.alert("Loading Failed", "Maybe issues with your network...", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            {text: "Retry", onPress: () => MainLoader()}
        ]);
    };
    //do main loader
    const MainLoader = () => {
        //do more of internet
        setTimeout(() => {
            getList().then(res => {
                if (res.status) {
                    setXLoader(false);
                    setXData(res.data);
                    setXToday(res.data.today);
                } else {
                    setXLoader(true);
                    retryBox();
                }
            }).catch(err => {
                setXLoader(true);
                retryBox();
            })
        }, 2000);
        return (
            <>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <LottieView style={{width: 200, height: 200}} source={imagesStore().lottie_loader2} autoPlay loop/>
            </View>
            </>
        )
    };
    return (
        <>
        <StatusBar barStyle="dark-content" backgroundColor={themeColor().lightTheme.bgWhite}/>
        <SafeAreaView style={{flex: 1, backgroundColor: themeColor().lightTheme.bgWhite}}>
            {
                loading ? <MainLoader/> :
                    <>
                    <View style={{flex: 1}}>
                        <View style={{flex: 1}}>
                            {menu === 1 ? <Calendar {...props} dx={xdata} d={xtoday} u={profile}/> : null}
                            {menu === 2 ? <List {...props} d={xdata} u={profile}/> : null}
                            {menu === 3 ? <Notifications {...props} u={profile}/> : null}
                            {menu === 4 ? <Profile {...props} u={profile}/> : null}
                        </View>
                        <Divider style={{backgroundColor: '#f0f0f0'}}/>
                        <View style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Button color={'#fff'}
                                    iconColor={(menu === 1 ? 'red' : themeColor().lightTheme.PLACEHOLDER)} iconSize={20}
                                    iconFamily={'feather'}
                                    icon={'calendar'} onlyIcon={true} onPress={() => {
                                //change menu crown
                                setXMenu(1);

                            }}>B</Button>
                            <Button color={'#fff'}
                                    iconColor={(menu === 2 ? 'red' : themeColor().lightTheme.PLACEHOLDER)} iconSize={20}
                                    iconFamily={'feather'} icon={'list'} onlyIcon={true} onPress={() => {
                                //change menu crown
                                setXMenu(2);
                            }}>B</Button>
                            <Button color={'#fff'}
                                    iconColor={(menu === 3 ? 'red' : themeColor().lightTheme.PLACEHOLDER)} iconSize={20}
                                    iconFamily={'feather'} icon={'bell'} onlyIcon={true} onPress={() => {
                                //change menu crown
                                setXMenu(3);
                            }}>B</Button>
                            <Button color={'#fff'}
                                    iconColor={(menu === 4 ? 'red' : themeColor().lightTheme.PLACEHOLDER)} iconSize={20}
                                    iconFamily={'feather'} icon={'user'} onlyIcon={true} onPress={() => {
                                //change menu crown
                                setXMenu(4);
                            }}>B</Button>
                        </View>
                    </View>
                    </>
            }
        </SafeAreaView>
        </>
    )
};

export default Home;