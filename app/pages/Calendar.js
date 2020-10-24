/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {View, ImageBackground, TouchableOpacity, FlatList} from "react-native";
import {Text} from "galio-framework";
import {bgCardShuffle} from "./../Themes";
import {Button, Icon} from "react-native-elements";
import Toast from "react-native-toast-message";

//export main app
class Calendar extends React.Component {

    listSODx = (d, k) => {
        return (
            <>
            <TouchableOpacity onPress={() => this.props.navigation.navigate("book_screen", {
                d: d,
                u: this.props.u
            })} key={k} activeOpacity={0.8} style={{marginHorizontal: 0}}>
                <ImageBackground source={bgCardShuffle()} style={{width: 120, height: 150, borderRadius: 15, overflow: 'hidden', elevation: 2, margin: 5, borderWidth: 2, borderColor: '#fff'}}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{padding: 3, alignItems: 'center'}}>
                            <Text color="white" h2 bold>{this.getDate(d.cuptime, 1)}</Text>
                            <Text color="white" italic bold>{this.getDate(d.cuptime, 2)+' '+this.getDate(d.cuptime, 3).substr(2)}</Text>
                        </View>
                        <Text numberOfLines={2} style={{textAlign: 'center'}} color="white" bold>{d.ctopic}</Text>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
            </>
        )
    };

    listSODxy = (d, k) => {
        return (
            <>
            <TouchableOpacity onPress={()=>{
                //open old sod
                Toast.show({
                    topOffset: 50,
                    text1: 'Future SOD Locked',
                    text2: 'SOD Topic and text is locked till date',
                    type: 'error'
                });
            }} key={k} activeOpacity={0.8} style={{marginHorizontal: 0}}>
                <ImageBackground source={bgCardShuffle()} style={{width: 80, height: 80, borderRadius: 15, overflow: 'hidden', elevation: 2, margin: 5, borderWidth: 2, borderColor: '#fff'}}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                        <View style={{padding: 3, alignItems: 'center'}}>
                            <Text color="white" h2 bold>{this.getDate(d.cuptime, 1)}</Text>
                            <Text color="white" italic bold>{this.getDate(d.cuptime, 2)+' '+this.getDate(d.cuptime, 3).substr(2)}</Text>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
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

    render() {
        return (
            <>
            <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{padding: 15}}>
                    <Text h2 bold>Welcome Back</Text>
                    <Text bold>{this.props.u.mname}</Text>
                </View>
                <ImageBackground source={bgCardShuffle()} style={{
                    margin: 10,
                    height: 210,
                    overflow: 'hidden',
                    borderRadius: 10,
                    elevation: 1,
                    borderWidth: 0,
                    borderColor: '#fff',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0
                    }}>

                    </View>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                        padding: 10,
                        paddingHorizontal: 20
                    }}>
                        <Text bold h3 color="white">SEEDS</Text>
                        <Text italic bold h5 color="white">OF</Text>
                        <Text bold h5 color="white">DESTINY</Text>
                        <Text bold h1 color="white">TODAY</Text>
                    </View>
                    <View style={{
                        width: '50%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        paddingHorizontal: 10
                    }}>
                        <Text bold h6 color="yellow">{this.props.d.cuptime.split(' ')[0]}</Text>
                        <Text h6 bold color="white"
                              style={{marginTop: 20, textAlign: 'center'}}>{this.props.d.ctopic}</Text>
                        <Text ellipsizeMode="tail" numberOfLines={3} italic color="white"
                              style={{marginBottom: 20, textAlign: 'center'}}>{this.props.d.cscripture}</Text>
                        <Button
                            disabled={this.props.d.cstatus === 0}
                            type={'outline'}
                            buttonStyle={{borderColor: 'white', height: 30}}
                            titleStyle={{color: 'white'}}
                            icon={
                                <Icon
                                    name="arrow-right"
                                    size={15}
                                    color="white"
                                />
                            }
                            title="Read Now"
                            onPress={() => this.props.navigation.navigate("book_screen", {
                                d: this.props.d,
                                u: this.props.u
                            })}
                        />
                    </View>
                </ImageBackground>
                <View style={{padding: 15}}>
                    <Text muted h4 bold>Previous Seeds</Text>
                    <Text muted bold>{'Browser old seeds of destiny...'}</Text>
                </View>
                <View style={{margin: 1}}>
                    <FlatList horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                              data={this.props.dx.previous} keyExtractor={(ext, dx) => {return ext.id}}
                              renderItem={({item, index}) =>this.listSODx(item, index)} />
                </View>
                <View style={{padding: 15}}>
                    <Text muted h4 bold>Future Seeds</Text>
                    <Text muted bold>{'Browser new seeds of destiny...'}</Text>
                </View>
                <View style={{margin: 1}}>
                    <FlatList horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                              data={this.props.dx.future} keyExtractor={(ext, dx) => {return ext.id}}
                              renderItem={({item, index}) =>this.listSODxy(item, index)} />
                </View>
            </View>
            </>
        )
    }
}
;

export default Calendar;