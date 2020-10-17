/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from "react";
import Navigation from "./app/Navigation";
import {GalioProvider} from "galio-framework";
import {themeColor} from "./app/Themes";
import Toast from 'react-native-toast-message';

const App: () => React$Node = () => {
    return (
        <>
        <GalioProvider theme={themeColor().lightTheme}>
            <Navigation/>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </GalioProvider>
        </>
    );
};

export default App;