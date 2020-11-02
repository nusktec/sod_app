/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {
    Dimensions,
    FlatList,
    ImageBackground,
    Linking,
    ScrollView,
    Share,
    StatusBar,
    TouchableOpacity,
    View
} from "react-native";
import {Button as Buttonx, Icon, Input, Text} from "galio-framework";
import {addViews, ASSETS_URL, getComments, setComments} from "./../Functions";
import {themeColor} from "../Themes";
import {Avatar, Badge, Button, Card} from "react-native-elements";
import HTML from "react-native-render-html";
import Tts from "react-native-tts";
import BottomSheet from "react-native-simple-bottom-sheet";
import Toast from "react-native-toast-message";
//export main app
let _mounted = false;
class BookReader extends React.Component {
    state = {
        uid: this.props.route.params.u.mid,
        xcomm: '',
        xwait: false,
        cbody: '<html></html>',
        cimage: 'https://images.unsplash.com/photo-1547185942-2b5661136b1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80',
        cdata: {users: [], comm: []},
        ...this.props.route.params.d
    };

    componentDidMount() {
        addViews({mid: this.state.uid, cid: this.state.cid}).then(res => {
        }).done();
        this.loadComments();
        //bottom sheet
        // setTimeout(() => {
        //     if (_mounted)
        //         this.btnSheet.togglePanel();
        // }, 10000);
        _mounted = true;
        Tts.addEventListener('tts-start', (event) => {});
        Tts.addEventListener('tts-finish', (event) => {});
        Tts.addEventListener('tts-cancel', (event) => {});
    }

    componentWillUnmount() {
        _mounted = false;
    }

    loadComments = () => {
        //start loading comments
        getComments({uid: this.state.uid, cid: this.state.cid}).then(res => {
            this.setState({cdata: res.data});
            this.flatList.scrollToEnd({animated: true})
        });
    };

    onShare = async (msg, title) => {
        try {
            const result = await Share.share({
                message: msg,
                title: title
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            // alert(error.message);
        }
    };

    //special color picker
    colorFX = () => {
        let _colors = ['#C2185B', '#512DA8', '#448AFF', '#00796B', '#FF9800', '#0097A7'];
        return _colors[Math.floor(Math.random() * _colors.length)];
    };

    //user list
    UserList = (d, k) => {
        return (
            <>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                overflow: 'hidden',
                backgroundColor: '#f8f8f8',
                margin: 2,
                borderRadius: 100,
                padding: 5
            }} key={k}>
                <Avatar
                    titleStyle={{fontWeight: 'bold'}}
                    containerStyle={{backgroundColor: this.colorFX(), marginEnd: 5}}
                    size={25}
                    rounded
                    title={d.mname.substr(0, 1).toUpperCase()}
                    onPress={() => null}
                    activeOpacity={0.7}
                />
                <Text muted>{d.mname.split(' ')[0]}</Text>
            </View>
            </>
        )
    };

    toTimestamp = (strDate) => {
        let revtime = strDate.replace(/-/g, '/');
        let datum = Date.parse(revtime);
        return datum / 1000;
    };

    static TimeAgo(ts) {

        let seconds = Math.floor((new Date() - new Date(ts.toString().replace(" ","T"))) / 1000);

        let interval = Math.floor(seconds / 31536000);

        if (interval > 1) {
            return interval + " years";
        }
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {
            return interval + " months";
        }
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {
            return interval + " days";
        }
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {
            return interval + " hours";
        }
        interval = Math.floor(seconds / 60);
        if (interval > 1) {
            return interval + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    //comments view
    ItemList = (d, k) => {
        return (
            <>
            <View style={{
                overflow: 'hidden',
                backgroundColor: '#f8f8f8',
                margin: 5,
                borderRadius: 10,
                paddingHorizontal: 5,
                padding: 10
            }} key={k}>
                <View style={{padding: 10}}>
                    <Text>{d.cbody}</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', padding: 0}}>
                    <Avatar
                        titleStyle={{fontWeight: 'bold'}}
                        containerStyle={{backgroundColor: this.colorFX(), marginEnd: 5}}
                        size={15}
                        rounded
                        title={d.mname.substr(0, 1).toUpperCase()}
                        onPress={() => null}
                        activeOpacity={0.7}
                    />
                    <Text muted italic>{d.mname} - {BookReader.TimeAgo(d.createdAt)}</Text>
                </View>
            </View>
            </>
        )
    };

    render() {
        return (
            <>
            <ScrollView style={{paddingHorizontal: 0, paddingBottom: 100}} showsVerticalScrollIndicator={false}>
                <View style={{flex: 1}}>
                    <StatusBar translucent barStyle="light-content" backgroundColor={'transparent'}/>
                    <ImageBackground source={{uri: ASSETS_URL + '/' + this.state.cimage}}
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
                                marginVertical: 40,
                                zIndex: 99999,
                            }}>
                                <Icon color={'white'} family={'feather'} name={'arrow-left'} size={25} raised={true}/>
                            </TouchableOpacity>
                            <View style={{alignSelf: 'center', padding: 10}}>
                                <Text numberOfLines={1} bold h6 color={'#fff'}>{this.state.ctopic}</Text>
                                <Text bold color={'#fff'}>{this.state.cuptime.split(' ')[0]}</Text>
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
                                        titleStyle={{color: 'white', fontSize: 12}}
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
                                        titleStyle={{color: 'white', fontSize: 12}}
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
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                backgroundColor: '#fff',
                elevation: 5,
                marginBottom: 15
            }}>
                <Buttonx onPress={() => {
                    //share or invite user to download app
                    this.onShare('*Dunamis Int\'l Gospel Centre*\nToday\'s Seeds Of Destiny.\n\n*Today: ' + this.state.cuptime + '*\nTopic: ' + this.state.ctopic + '\nScripture: ' + this.state.cscripture + '\n\nDownload to read full text\nhttps://play.google.com/store/apps/details?id=com.nsc.sodapp', 'Invite a friend');
                }} onlyIcon icon="share-2" iconFamily="feather" color="#fff" iconColor="#000"
                         size={'small'}>Share</Buttonx>
                <Buttonx onPress={() => {
                    //share or invite user to download app
                    this.onShare('*Dunamis Int\'l Gospel Centre*\nDownload Seeds Of Destiny (x3) mobile app. and enjoy daily devotional messages.\nhttps://play.google.com/store/apps/details?id=com.nsc.sodapp', 'Invite a friend');
                }} onlyIcon icon="users" iconFamily="feather" color="#fff" iconColor="#000"
                         size={'small'}>Invites</Buttonx>
                <Buttonx onPress={() => {
                    //open bottom sheet for comment
                    this.btnSheet.togglePanel();
                }} onlyIcon icon="message-circle" iconFamily="feather" color="#fff" iconColor="#000" size={'small'}>Add
                    Comments</Buttonx>
            </View>
            <BottomSheet ref={ref => this.btnSheet = ref} sliderMinHeight={0}
                         sliderMaxHeight={Dimensions.get('window').height - 200}>
                <View style={{padding: 10}}>
                    <Text bold h6 muted>Seeds Of Destiny</Text>
                    <Text numberOfLine={1} bold
                          muted>{this.state.cdata.users.length > 0 ? this.state.cdata.users.length + '+ member(s) also studied ' + this.state.ctopic : 'You are the first to study this to topic'}</Text>
                </View>
                <View>
                    <FlatList horizontal showsHorizontalScrollIndicator={false}
                              showsVerticalScrollIndicator={false}
                              data={this.state.cdata.users} keyExtractor={ext => {
                        return ext.id
                    }} renderItem={({item, index}) => this.UserList(item, index)}/>
                </View>
                <View style={{margin: 10}}>
                    <Text bold muted>{this.state.cdata.comm.length}+ Members comment</Text>
                </View>
                <FlatList onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                          onLayout={() => this.flatList.scrollToEnd({animated: true})} ref={ref => this.flatList = ref}
                          showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                          data={this.state.cdata.comm} keyExtractor={ext => {
                    return ext.id
                }} renderItem={({item, index}) => this.ItemList(item, index)}/>
                <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
                    <Input style={{width: Dimensions.get('window').width - 100, backgroundColor: '#eeeeee'}}
                           multiline={true} onChangeText={(v) => {
                        this.setState({xcomm: v})
                    }}
                           placeholderTextColor={themeColor().lightTheme.PLACEHOLDER}
                           placeholder="Write comment..."
                           rounded={false} type="default" borderless={true} family={'feather'}
                           icon={'message-square'} value={this.state.xcomm}/>
                    <Buttonx onPress={() => {
                        //send comment
                        if (this.state.xcomm === '') {
                            Toast.show({
                                topOffset: 50,
                                text1: 'Enter comment and send...',
                                text2: 'No comment to post...',
                                type: 'error'
                            });
                        } else {
                            //Oya send
                            this.setState({xwait: true});
                            let _data = {cbody: this.state.xcomm, uid: this.state.uid, cid: this.state.cid, ctime: new Date().toISOString()};
                            setComments(_data).then(res => {
                                this.setState({xwait: false});
                                Toast.show({
                                    topOffset: 50,
                                    text1: 'Comment Added !',
                                    text2: 'Comment added...',
                                    type: 'success'
                                });
                                this.setState({xcomm: ''});
                                this.loadComments();
                                this.flatList.scrollToEnd({animated: true})
                            }).catch(err => {
                                Toast.show({
                                    topOffset: 50,
                                    text1: 'Comment not delivered',
                                    text2: 'Retry again...',
                                    type: 'error'
                                });
                                this.setState({xwait: false});
                            })
                        }
                    }} loading={this.state.xwait} disabled={this.state.xwait} size={10} style={{
                        marginHorizontal: 10, height: 30, width: 50
                    }}>
                        Send
                    </Buttonx>
                </View>
            </BottomSheet>
            </>
        )
    }
}

export default BookReader;