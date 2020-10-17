/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React from "react";
import {View} from "react-native";
import {Text} from "galio-framework";

//export main app
const Profile: () => React$Node = (props) => {
    return (
        <>
        <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Text>Profile</Text>
            </View>
        </View>
        </>
    )
};

export default Profile;