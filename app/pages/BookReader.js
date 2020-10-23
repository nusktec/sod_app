/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {View, TouchableOpacity, StatusBar, ImageBackground, Linking, ScrollView} from "react-native";
import {Icon, Text, Button as Buttonx} from "galio-framework";
import {ASSETS_URL, addViews} from "./../Functions";
import {themeColor} from "../Themes";
import {Badge, Button, Card} from "react-native-elements";
import HTML from 'react-native-render-html';
import Tts from 'react-native-tts';
//export main app
class BookReader extends React.Component {

    state = {
        cimage: 'https://images.unsplash.com/photo-1547185942-2b5661136b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
    };

    componentDidMount() {
        setTimeout(() => {
            //add views
            addViews({mid: this.props.route.params.u.mid, cid: this.state.cid}).then(null).done();
        }, 20);
        this.setState(this.props.route.params.d)
    }

    render() {
        return (
            <>
            <ScrollView style={{paddingHorizontal: 0, paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <StatusBar translucent barStyle="light-content" backgroundColor={'transparent'}/>
                    <ImageBackground source={{uri: ASSETS_URL + this.state.cimage}}
                                     style={{width: '100%', height: 300, backgroundColor: '#000'}}>
                        <View style={{backgroundColor: 'rgba(0,0,0,0.5)', flex: 1}}>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.pop();
                            }} style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: 5,
                                marginHorizontal: 20,
                                marginVertical: 40
                            }}>
                                <Icon color={'white'} family={'feather'} name={'arrow-left'} size={25} raised={true}/>
                            </TouchableOpacity>
                            <View style={{alignSelf: 'center', padding: 10}}>
                                <Text bold h3 color={'#fff'}>{this.state.ctopic}</Text>
                                <Text bold color={'#fff'}>{this.state.cuptime}</Text>
                                <View
                                    style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
                                    <Badge value={this.state.cviews + ' Views'} status="error"
                                           badgeStyle={{borderWidth: 0}}/>
                                    <Badge value={this.state.ccomments + ' Comments'} status="error"
                                           containerStyle={{marginHorizontal: 8}} badgeStyle={{borderWidth: 0}}/>
                                </View>

                                <View style={{flexDirection: 'row'}}>
                                    <Button
                                        icon={
                                            <Icon
                                                family={'feather'}
                                                name="youtube"
                                                size={15}
                                                color="white"
                                            />
                                        }
                                        containerStyle={{marginVertical: 30}}
                                        type={'outline'}
                                        buttonStyle={{borderColor: 'white', height: 30, width: 100}}
                                        titleStyle={{color: 'white'}}
                                        title=" YouTube"
                                        onPress={() => {
                                            //open youtube
                                            Linking.openURL(this.state.cyoutube);
                                        }}
                                    />
                                    <Button
                                        icon={
                                            <Icon
                                                family={'feather'}
                                                name="play"
                                                size={15}
                                                color="white"
                                            />
                                        }
                                        containerStyle={{marginVertical: 30, marginHorizontal: 10}}
                                        type={'outline'}
                                        buttonStyle={{borderColor: 'white', height: 30, width: 100}}
                                        titleStyle={{color: 'white'}}
                                        title=" Listen"
                                        onPress={() => {
                                            //open youtube
                                            Tts.speak("Today's scripture. " + this.state.cscripture);
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                    <Card containerStyle={{
                        borderTopLeftRadius: 10,
                        borderTopEndRadius: 10,
                        marginTop: -15,
                        margin: 0,
                        borderWidth: 0
                    }} borderless={true}>
                        <Card.Title>-SCRIPTURE-</Card.Title>
                        <Text italic bold style={{paddingHorizontal: 10, fontSize: 18}}>{this.state.cscripture}</Text>
                    </Card>
                    <Card containerStyle={{marginTop: 5, margin: 0, marginBottom: 5, paddingTop: 0, borderWidth: 0}}
                          borderless={true}>
                        <HTML baseFontStyle={{fontSize: 20, fontWeight: '500'}} ptSize={2} html={this.state.cbody}/>
                    </Card>
                </View>
            </ScrollView>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', position: 'absolute', bottom: 0, backgroundColor: '#fff', elevation: 5, left: 0, right: 0}}>
                <Buttonx onlyIcon icon="share-2" iconFamily="feather" color="#fff" iconColor="#000" size={'small'}>Share</Buttonx>
                <Buttonx onlyIcon icon="users" iconFamily="feather" color="#fff" iconColor="#000" size={'small'}>Invites</Buttonx>
                <Buttonx onlyIcon icon="message-circle" iconFamily="feather" color="#fff" iconColor="#000" size={'small'}>Add Comments</Buttonx>
            </View>
            </>
        )
    }
}

export default BookReader;