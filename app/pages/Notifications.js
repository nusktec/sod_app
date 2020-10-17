/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {View} from "react-native";
import {Text} from "galio-framework";
import {SvgImageView} from "react-native-svg-img";
import {imagesStore} from "../Themes";

//export main app
const Notifications: () => React$Node = (props) => {
    return (
        <>
        <View style={{flex: 1}}>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <SvgImageView
                    width={300}
                    height={200}
                    source={imagesStore().notif}
                />
                <Text bold h5>Notifications</Text>
                <Text bold muted>Only specified appears here...</Text>
            </View>
        </View>
        </>
    )
};

export default Notifications;