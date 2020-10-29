/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {ActivityIndicator, FlatList, Image, View} from "react-native";
import {Text} from "galio-framework";
import {imagesStore, themeColor} from "../Themes";
import {getNotifications} from "./../Functions";
import {Icon} from "react-native-elements";


//export main app
class Notifications extends React.Component {
    state = {
        loading: true,
        data: [],
    };

    componentDidMount() {
        //do more of internet
        setTimeout(() => {
            getNotifications({nuid: this.props.u.mid}).then(res => {
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
                    <Image style={{width: 200, height: 200}} source={imagesStore().alert}/>
                    <Text bold h5>Notifications</Text>
                    <Text bold muted>Only specified appears here...</Text>
                    <ActivityIndicator animating={this.state.loading} color="black" style={{margin: 10}}/>
                </View>
            </View>
            </>
        )
    };

    //notifications badge
    ItemList = (d, k) => {
        return (
            <>
            <View style={{
                borderStartWidth: 4,
                borderStartColor: themeColor().lightTheme.INFO,
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 2,
                backgroundColor: '#fff',
                overflow: 'hidden',
                borderRadius: 2,
                margin: 3,
                height: 80,
                width: '100%',
                elevation: 1,
                alignItems: 'center'
            }}>
                <View style={{flex: 1, backgroundColor: '#fff', padding: 3}}>
                    <Text h6 muted>{d.ntitle}</Text>
                    <Text italic muted>{d.ntext}</Text>
                    <Text italic bold muted>{d.createdAt}</Text>
                </View>
                <Icon name="arrow-left" family="feather" color={themeColor().lightTheme.INFO}/>
            </View>
            </>
        )
    };

    MainPage = () => {
        return (
            <>
            <View style={{padding: 10}}>
                <Text bold h3 muted>Notifications</Text>
                <Text bold muted>Only specified appears here...</Text>
            </View>
            <FlatList style={{flex: 1}} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}
                      data={this.state.data} keyExtractor={ext => {return ext.id}}
                      renderItem={({item, index}) =>this.ItemList(item, index)} />
            </>
        )
    };

    render() {
        return (
            <>
            <View style={{flex: 1}}>
                {this.state.data.length < 1 ? this.PlaceHolder() : null}
                {!this.state.loading && this.state.data.length > 0 ? this.MainPage() : null}
            </View>
            </>
        )
    }
}
;

export default Notifications;