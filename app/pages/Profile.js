/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React, {useState} from "react";
import {View, TouchableOpacity, Dimensions, ScrollView, Alert, Image, Modal, Linking} from "react-native";
import {Button, Input, Text} from "galio-framework";
import Toast from "react-native-toast-message";
import {imagesStore, themeColor} from "../Themes";
import {logOut, setIsLogin, updateProfile} from "../Functions";
import {Card, Icon} from "react-native-elements";

//export main app
const Profile: () => React$Node = (props) => {
    const [xloading, setLoading] = useState(false);
    const [xphone, setXPhone] = useState(props.u.mphone);
    const [xemail, setXEmail] = useState(props.u.memail);
    const [xnames, setXName] = useState(props.u.mname);
    const [xgender, setXGender] = useState(props.u.mgender);
    const [xmodal, setXModal] = useState(false);

    return (
        <>
        <ScrollView style={{paddingHorizontal: 0, marginTop: 40}} showsVerticalScrollIndicator={false}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Image style={{width: 200, height: 200, resizeMode: 'contain'}} source={imagesStore().profilex}/>
                <View style={{
                    backgroundColor: '#fff',
                    borderRadius: 15,
                    alignItems: 'center',
                    justifyContent: 'center',
                    elevation: 0,
                    marginHorizontal: 10
                }}>
                    <View style={{alignItems: 'center', marginBottom: 10, padding: 20}}>
                        <Text bold muted style={{marginHorizontal: 20, marginBottom: 20}}>USER PROFILE</Text>
                        <Input onChangeText={(v) => setXName(v)}
                               placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                               placeholder="Names"
                               rounded={false} type="default" borderless={true} family={'feather'}
                               icon={'user'} value={xnames}/>
                        <Input onChangeText={(v) => setXPhone(v)}
                               placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                               placeholder="Phone"
                               rounded={false} type="number-pad" borderless={true} family={'feather'}
                               icon={'phone'} value={xphone}/>
                        <Input disabled={true} onChangeText={(v) => setXEmail(v)}
                               placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                               placeholder="Email"
                               rounded={false} type="email-address" borderless={true} family={'feather'}
                               icon={'mail'} value={xemail}/>
                        <View style={{flexDirection: 'row', width: Dimensions.get('window').width - (80), padding: 5}}>
                            <TouchableOpacity onPress={() => setXGender('M')} style={{
                                borderWidth: 0,
                                padding: 5,
                                borderRadius: 5,
                                backgroundColor: (xgender === 'M' ? themeColor().lightTheme.INFO : '#e7e7e7')
                            }}>
                                <Text bold color={(xgender === 'M' ? '#fff' : '#000')}>Male</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setXGender('F')} style={{
                                borderWidth: 0,
                                padding: 5,
                                borderRadius: 5,
                                backgroundColor: (xgender === 'F' ? themeColor().lightTheme.INFO : '#e7e7e7'),
                                marginHorizontal: 10
                            }}>
                                <Text bold color={(xgender === 'F' ? '#fff' : '#000')}>Female</Text>
                            </TouchableOpacity>
                        </View>
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
                            setLoading(true);
                            let data = {
                                mname: xnames,
                                mphone: xphone,
                                memail: xemail,
                                mgender: xgender
                            };
                            //begins updates...
                            updateProfile(data).then(res => {
                                if (res.status) {
                                    setIsLogin(res.data).then(resp => {
                                        //console.log(res);
                                    });
                                }
                                Toast.show({
                                    topOffset: 50,
                                    text1: 'Recent update made okay !',
                                    text2: 'Your account was updated successfully',
                                    type: 'success'
                                });
                                setLoading(false);
                            });
                        }}>Update Profile</Button>

                        <Button round iconFamily={'feather'} icon={'code'} size={'large'} color={themeColor().lightTheme.INFO}
                                onPress={() => {
                                    //show modal
                                    setXModal(true);
                                }}>Contact Us | Complaint</Button>

                        <Button round iconFamily={'feather'} icon={'log-out'} size={'large'} color="danger"
                                onPress={() => {
                                    //logout
                                    Alert.alert(
                                        "Logout",
                                        "Really want to logout your account ?",
                                        [
                                            {
                                                text: "Cancel",
                                                onPress: null,
                                                style: "cancel"
                                            },
                                            { text: "Yes", onPress: () => {
                                                logOut().then().done();
                                                Alert.alert("You profile has been cleared, login required on next launch")
                                            } }
                                        ],
                                        { cancelable: false }
                                    );
                                }}>Logout</Button>

                    </View>
                </View>
            </View>
        </ScrollView>

        <Modal onDismiss={() => {
            //setTBar('light-content')
        }} onShow={() => {
            //setTBar('dark-content')
        }} statusBarTranslucent
               animationType="fade" visible={xmodal}>
            <TouchableOpacity onPress={() => {
                setXModal(false);
            }} style={{
                position: 'absolute',
                top: 30,
                zIndex: 99999,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
                margin: 10
            }}>
                <Icon color={'#000'} type={'feather'} name={'arrow-left'} size={30} raised={true}/>
            </TouchableOpacity>
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Image style={{width: 200, height: 200, resizeMode: 'contain'}} source={imagesStore().developer}/>
                <Text h4 style={{marginBottom: 10}}>App Info</Text>
                <Card>
                    <Card.Title>Seeds Of Destiny | App Developer</Card.Title>
                    <Card.Divider/>
                    <Text style={{marginBottom: 10}}>Company: RSC BYTE LTD</Text>
                    <Text bold style={{marginBottom: 10}}>Licensed: Dunamis Int'l Gospel Centre</Text>
                    <Text style={{marginBottom: 10}}>Web: www.seedsofdestiny.live</Text>
                    <Text style={{marginBottom: 10}}>Email: nusktecsoft@gmail.com</Text>
                    <Text style={{marginBottom: 10}}>Phone: 234-8164242320</Text>
                </Card>
                <Button onPress={() => {
                    //start reg...
                    Linking.openURL(`whatsapp://send?phone=2348164242320&text=${"Seeds Of Destiny Contact Form: Hello ?"}`)
                }}  style={{
                }}><Text color="white" bold>Chat With Developer</Text></Button>
            </View>
        </Modal>

        </>
    )
};

export default Profile;