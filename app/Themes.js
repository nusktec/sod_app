/**
 * Created by revelation on 16/10/2020.
 * Reedax.IO Technologies Limited *
 * Developer Revelation A.F *
 */
export function themeColor() {
    //main colors
    return {
        lightTheme: {
            SIZES: {BASE: 18,},
            // this will overwrite the Galio SIZES BASE value 16
            COLORS: {PRIMARY: 'red'},
            INFO: '#3B5998',
            PLACEHOLDER: '#656f85',
            ERROR: '#FE2472',
            ERROR2: '#9FA5AA',
            MUTED: '#9FA5AA',
            // this will overwrite the Galio COLORS PRIMARY color #B23AFC
            bg: '#f7fcff',
            bgWhite: '#FFF',
        }
    };
}

//images assets
export function imagesStore() {
    return {
        logox: require('./../assets/logox.png'),
        logo: require('./../assets/logo.png'),
        drPaul: require('./../assets/bg_1.jpg'),
        bg1: require('./../assets/seed_bg_1.jpg'),
        sod1: require('./../assets/sod1.jpg'),
        sod2: require('./../assets/sod2.jpg'),
        sod3: require('./../assets/sod3.jpg'),
        sod4: require('./../assets/sod4.jpg'),
        sod5: require('./../assets/sod5.jpg'),
        bg2: require('./../assets/seedBg.jpg'),
        bg9: require('./../assets/bg_9.jpg'),
        bg10: require('./../assets/bg_10.jpg'),
        bg11: require('./../assets/bg_11.jpg'),
        smile: require('./../assets/svgs/smile_1.svg'),
        player: require('./../assets/svgs/player_1.svg'),
        read: require('./../assets/svgs/read_1.svg'),
        notif: require('./../assets/svgs/noti.svg'),
        profilex: require('./../assets/profilex.png'),
        gender: require('./../assets/gender.png'),
        developer: require('./../assets/developer.png'),
        alert: require('./../assets/alert.png'),
        read1: require('./../assets/svgs/read_2.svg'),
        male: require('./../assets/svgs/male.svg'),
        female: require('./../assets/svgs/female.svg'),
        lottie_loader: require('./../assets/json/loader.json'),
        lottie_loader2: require('./../assets/json/loader_2.json'),
    }
}

export function bgShuffler() {
    let randNum = Math.floor(Math.random() * 3) + 1;
    if (randNum === 1)
        return imagesStore().bg9;
    if (randNum === 2)
        return imagesStore().bg10;
    if (randNum === 3)
        return imagesStore().bg11;
    else return imagesStore().bg9
}

export function bgCardShuffle() {
    let randNum = Math.floor(Math.random() * 5) + 1;
    if (randNum === 1)
        return imagesStore().sod1;
    if (randNum === 2)
        return imagesStore().sod2;
    if (randNum === 3)
        return imagesStore().sod3;
    if (randNum === 4)
        return imagesStore().sod4;
    else return imagesStore().sod5
}