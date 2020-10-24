/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React, {useState} from "react";
import {View, TouchableOpacity, Dimensions} from "react-native";
import {Button, Input, Text} from "galio-framework";
import Toast from "react-native-toast-message";
import {imagesStore, themeColor} from "../Themes";
import {SvgImageView} from "react-native-svg-img";
import {setIsLogin, updateProfile} from "../Functions";

//export main app
const Profile: () => React$Node = (props) => {
    const [xloading, setLoading] = useState(false);
    const [xphone, setXPhone] = useState(props.u.mphone);
    const [xemail, setXEmail] = useState(props.u.memail);
    const [xnames, setXName] = useState(props.u.mname);
    const [xgender, setXGender] = useState(props.u.mgender);

    return (
        <>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <SvgImageView
                width={300}
                height={200}
                source={imagesStore().read}
            />
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 15,
                alignItems: 'center',
                justifyContent: 'center',
                elevation: 0,
                marginHorizontal: 10,
            }}>
                <View style={{alignItems: 'center', marginBottom: 10, padding: 20}}>
                    <Text bold muted style={{marginHorizontal: 20, marginBottom: 20}}>USER PROFILE</Text>
                    <Input onChangeText={(v) => setXName(v)} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                           placeholder="Names"
                           rounded={false} type="default" borderless={true} family={'feather'}
                           icon={'user'} value={xnames}/>
                    <Input onChangeText={(v) => setXPhone(v)} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
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
                    <Button round iconFamily={'feather'} icon={'log-out'} size={'large'} color="danger"
                            onPress={() => {
                                //logout

                            }}>Logout</Button>
                </View>
            </View>
        </View>
        </>
    )
};

export default Profile;