/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
//api stuffs
const STR_KEY = "sod_rdx";
const BASE_URL = "http://192.168.8.101/sod/api";
export const ASSETS_URL = "http://192.168.8.101/sod/";
import AsyncStorage from '@react-native-community/async-storage';

//fetch login details
export async function isLogin() {
    try {
        const value = await AsyncStorage.getItem(STR_KEY);
        if (value !== null) {
            // value previously stored
            return JSON.parse(value);
        } else {
            return false;
        }
    } catch (e) {
        // error reading value
        throw e.message;
    }
}
//set is login
export async function setIsLogin(data) {
    try {
        const jsonValue = JSON.stringify(data);
        return await AsyncStorage.setItem(STR_KEY, jsonValue)
    } catch (e) {
        // saving error
        throw e.message;
    }
}

export function remakeHeader() {
    return {
        headers: {
            'ssk': 'f94fd990390d8a05629708a22b133ccf9756ad4f',
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'mode': 'cors',
            'redirect': 'follow',
        }, method: 'POST',
    };
}
//header settings
let headersParse = {};

//login functions
export async function doLogin(data) {
    headersParse = remakeHeader();
    headersParse.body = JSON.stringify(data);
    let res = await fetch(BASE_URL + "?cmd=add-user", headersParse);
    return await res.json();
}

//get list functions
export async function getList() {
    headersParse = remakeHeader();
    let res = await fetch(BASE_URL + "?cmd=all", headersParse);
    return await res.json();
}