/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {View} from "react-native";
import {Button, Input, Text} from "galio-framework";
import Toast from "react-native-toast-message";
import {imagesStore, themeColor} from "../Themes";
import {SvgImageView} from "react-native-svg-img";

//export main app
class Profile extends React.Component {
    constructor(){
        super();
        this.state = {
            uname: 'loading...',
            uphone: 'loading...',
            uemail: 'loading...',
            loading: false
        }
    }
    render(){
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
                        <Input onChangeText={(v) => null} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER} placeholder="Names"
                               rounded={false} type="default" borderless={true} family={'feather'}
                               icon={'user'} value={this.state.uname}/>
                        <Input onChangeText={(v) => null} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                               placeholder="Phone"
                               rounded={false} type="number-pad" borderless={true} family={'feather'}
                               icon={'phone'} value={this.props.u.mname}/>
                        <Input onChangeText={(v) => null} placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                               placeholder="Email"
                               rounded={false} type="email-address" borderless={true} family={'feather'}
                               icon={'mail'} value={this.state.uphone}/>
                    </View>
                    <View>
                        <Button loading={this.state.loading} disabled={this.state.loading} round size={'large'} color={themeColor().lightTheme.INFO} onPress={() => {
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
                            //begins updates...


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
    }
};

export default Profile;