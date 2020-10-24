/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {ActivityIndicator, FlatList, View, TouchableOpacity, Modal, Dimensions} from "react-native";
import {Text} from "galio-framework";
import {SvgImageView} from "react-native-svg-img";
import {imagesStore, themeColor} from "../Themes";
import {Icon, Image} from "react-native-elements";
import {getAllSODs, ASSETS_URL} from "../Functions";
import LottieView from 'lottie-react-native';

//export main app
class List extends React.Component {
    state = {
        isModal: false,
        focusImage: '',
        focusTopic: '',
        focusData: {},
        loading: false,
        data: [],
    };

    componentDidMount() {
        // do more of internet
        setTimeout(() => {
            getAllSODs().then(res => {
                this.setState({loading: false});
                this.setState({data: res.data});
            })
        }, 10);
    }

    PlaceHolder = () => {
        return (
            <>
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <LottieView style={{width: 200, height: 200}} source={imagesStore().lottie_loader2} autoPlay loop/>
                    <Text bold h5>Seeds Of Destiny</Text>
                    <Text bold muted>Looking For...</Text>
                    <ActivityIndicator animating={this.state.loading} color="black" style={{margin: 10}}/>
                </View>
            </View>
            </>
        )
    };

    //get date data
    getDate = (d, isDay) => {
        let tmpd = d.split(" ")[0];
        if (isDay === 1) {
            return tmpd.split('-')[2];
        }
        if (isDay === 2) {
            let ma = tmpd.split('-')[1];
            switch (parseInt(ma)) {
                case 1:
                    return 'JAN';
                    break;
                case 2:
                    return 'FEB';
                    break;
                case 3:
                    return 'MAR';
                    break;
                case 4:
                    return 'APR';
                    break;
                case 5:
                    return 'MAY';
                    break;
                case 6:
                    return 'JUN';
                    break;
                case 7:
                    return 'JUL';
                    break;
                case 8:
                    return 'AUG';
                    break;
                case 9:
                    return 'SPE';
                    break;
                case 10:
                    return 'OCT';
                    break;
                case 11:
                    return 'NOV';
                    break;
                case 12:
                    return 'DEC';
                    break;
                default:
                    return 'MMM'
            }
        }
        if (isDay === 3) {
            return tmpd.split('-')[0];
        }
    };

    //notifications badge
    ItemList = (d, k) => {
        return (
            <>
            <TouchableOpacity activeOpacity={0.8} onPress={() =>{
                this.setState({focusImage: ASSETS_URL + "/" + d.cimage, focusTopic: d.ctopic, focusData: d}); this.setState({isModal: true})}} style={{
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 0,
                backgroundColor: (d.isToday === "1" ? '#ffe6e9' : '#fff'),
                overflow: 'hidden',
                borderRadius: 5,
                margin: 3,
                height: 80,
                width: '100%',
                elevation: 1,
                alignItems: 'center'
            }}>
                <Image source={{uri: ASSETS_URL + "/" + d.cimage}}
                       style={{width: 80, height: '100%', resizeMode: 'cover'}}/>
                <View style={{padding: 8, alignItems: 'center'}}>
                    <Text h4 bold>{this.getDate(d.cuptime, 1)}</Text>
                    <Text italic bold>{this.getDate(d.cuptime, 2)+' '+this.getDate(d.cuptime, 3).substr(2)}</Text>
                </View>
                <View style={{flex: 1, padding: 3}}>
                    <Text numberOfLines={1} h6 bold>{d.ctopic}</Text>
                    <Text numberOfLines={2} elipsizeMode={'tail'} italic>{d.cscripture}</Text>
                    <Text italic bold>{d.cuptime}</Text>
                </View>
            </TouchableOpacity>
            </>
        )
    };

    MainPage = () => {
        return (
            <>
            <View style={{padding: 10}}>
                <Text bold h3>Seeds Of Destiny</Text>
                <Text bold muted>All Data</Text>
            </View>
            <FlatList style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                      data={this.state.data} keyExtractor={ext => {
                return ext.id
            }} renderItem={({item, index}) => this.ItemList(item, index)}/>
            </>
        )
    };

    render() {
        return (
            <>
            <View style={{flex: 1}}>
                {this.state.data.length < 1 ? this.PlaceHolder() : null}
                {!this.state.loading && this.state.data.length > 0 ? this.MainPage() : null}
                <Modal onDismiss={() => {

                }} onShow={() => {

                }} statusBarTranslucent animationType="fade" visible={this.state.isModal}>
                    <TouchableOpacity activeOpacity={0.8} onPress={() => {
                        this.setState({isModal: false});
                    }} style={{
                        position: 'absolute',
                        top: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: 10,
                        margin: 10
                    }}>
                        <Icon color={'#000'} type={'feather'} name={'x'} size={20}
                              raised={true}/>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                        <Text h6 bold>{this.state.focusTopic}</Text>
                        <Image source={{uri: this.state.focusImage}}
                               style={{width: Dimensions.get('window').width, height: 400, resizeMode: 'cover'}}/>
                        <TouchableOpacity onPress={() => {
                            //start reg...
                            this.setState({isModal: false});
                            this.props.navigation.navigate('book_screen', {d: this.state.focusData, u: this.props.u})
                        }} style={{
                            position: 'absolute',
                            bottom: 30,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: 10
                        }}>
                            <Icon color={'#000'} family={'feather'} name={'arrow-right'}
                                  size={20}/>
                            <Text bold h6>Read Full</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            </>
        )
    }
}
export default List;