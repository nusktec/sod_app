/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {Text} from "galio-framework";
//export main app
const Home = (props) => {
    return (
        <>
        <StatusBar translucent barStyle="dark-content" backgroundColor="transparent"/>
        <View>
            <Text h3>Hello One !</Text>
        </View>
        </>
    )
};

export default Home;