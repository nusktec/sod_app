/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {ActivityIndicator, FlatList, View} from "react-native";
import {Text} from "galio-framework";
import {SvgImageView} from "react-native-svg-img";
import {imagesStore, themeColor} from "../Themes";
import {getNotifications} from "./../Functions";
import {Icon, Image} from "react-native-elements";


//export main app
class List extends React.Component {
    state = {
        loading: false,
        data: [{}],
    };

    componentDidMount() {
        //do more of internet
        // setTimeout(() => {
        //     getNotifications({nuid: this.props.u.mid}).then(res => {
        //         this.setState({loading: false});
        //         this.setState({data: res.data});
        //     })
        // }, 10);
    }

    PlaceHolder = () => {
        return (
            <>
            <View style={{flex: 1}}>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <SvgImageView
                        width={300}
                        height={200}
                        source={imagesStore().smile}
                    />
                    <Text bold h5>All Seeds Of Destiny</Text>
                    <Text bold muted>Looking For...</Text>
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
                flexDirection: 'row',
                justifyContent: 'center',
                paddingVertical: 0,
                backgroundColor: '#fff',
                overflow: 'hidden',
                borderRadius: 3,
                margin: 3,
                height: 80,
                width: '100%',
                elevation: 1,
                alignItems: 'center'
            }}>
                <Image source={{uri: 'https://i.pinimg.com/236x/84/97/68/849768009d5792d5d83c1bb6e0b3572d.jpg'}} style={{width: 80, height: '100%', resizeMode: 'cover'}}/>
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
                <Text bold h3 muted>Seeds Of Destiny</Text>
                <Text bold muted>All Data</Text>
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

export default List;