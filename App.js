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
import OneSignal from 'react-native-onesignal'; // Import package from node modules

class App extends React.Component {

    constructor(properties) {
        super(properties);
        //Remove this method to stop OneSignal Debugging
        OneSignal.setLogLevel(6, 0);

        // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
        OneSignal.init("ddc03fc9-d02c-44cf-af9c-d7f6342ccd27", {
            kOSSettingsKeyAutoPrompt: false,
            kOSSettingsKeyInAppLaunchURL: false,
            kOSSettingsKeyInFocusDisplayOption: 2
        });
        OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

        // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
        OneSignal.promptForPushNotificationsWithUserResponse(this.myiOSPromptCallback);

        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    }

    componentWillUnmount() {
        // OneSignal.removeEventListener('received', this.onReceived);
        // OneSignal.removeEventListener('opened', this.onOpened);
        // OneSignal.removeEventListener('ids', this.onIds);
    }

    onReceived = (notification) => {
        // console.log("Notification received: ", notification);
    };

    onOpened = (openResult) => {
        // console.log('Message: ', openResult.notification.payload.body);
        // console.log('Data: ', openResult.notification.payload.additionalData);
        // console.log('isActive: ', openResult.notification.isAppInFocus);
        // console.log('openResult: ', openResult);
    };

    onIds = (device) => {
        // console.log('Device info: ', device);
    };

    myiOSPromptCallback = (permission) => {
        // do something with permission value
    };

    render() {
        return (
            <>
            <GalioProvider theme={themeColor().lightTheme}>
                <Navigation/>
                <Toast ref={(ref) => Toast.setRef(ref)}/>
            </GalioProvider>
            </>
        )
    }
}

export default App;