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

//export main app
class Calendar extends React.Component {

    listSODx = (d, k) => {
        return (
            <>
            <TouchableOpacity key={k} activeOpacity={0.8} style={{marginHorizontal: 5}}>
                <ImageBackground source={bgCardShuffle()} style={{width: 120, height: 150, borderRadius: 15, overflow: 'hidden', elevation: 2, margin: 5, borderWidth: 2, borderColor: '#fff'}}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0,5)'}}>

                    </View>
                </ImageBackground>
            </TouchableOpacity>
            </>
        )
    };

    listSODxy = (d, k) => {
        return (
            <>
            <TouchableOpacity key={k} activeOpacity={0.8} style={{marginHorizontal: 5}}>
                <ImageBackground source={bgCardShuffle()} style={{width: 80, height: 80, borderRadius: 15, overflow: 'hidden', elevation: 2, margin: 5, borderWidth: 2, borderColor: '#fff'}}>
                    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0,5)'}}>

                    </View>
                </ImageBackground>
            </TouchableOpacity>
            </>
        )
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
                    elevation: 5,
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
                        <Text bold h6 color="yellow">{this.props.d.cuptime}</Text>
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
                              data={this.props.dx.previous} keyExtractor={ext => {return ext.id}}
                              renderItem={({item, index}) =>this.listSODx(item, index)} />
                </View>
                <View style={{padding: 15}}>
                    <Text muted h4 bold>Future Seeds</Text>
                    <Text muted bold>{'Browser new seeds of destiny...'}</Text>
                </View>
                <View style={{margin: 1}}>
                    <FlatList horizontal={true} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                              data={this.props.dx.future} keyExtractor={ext => {return ext.id}}
                              renderItem={({item, index}) =>this.listSODxy(item, index)} />
                </View>
            </View>
            </>
        )
    }
}
;

export default Calendar;