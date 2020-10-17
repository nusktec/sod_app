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
    return{
        logox: require('./../assets/logox.png'),
        logo: require('./../assets/logo.png'),
        drPaul: require('./../assets/bg_1.jpg'),
        bg1: require('./../assets/seed_bg_1.jpg'),
        bg2: require('./../assets/seedBg.jpg'),
        bg6: require('./../assets/bg_6d.jpg'),
        smile: require('./../assets/svgs/smile_1.svg'),
        player: require('./../assets/svgs/player_1.svg'),
        read: require('./../assets/svgs/read_1.svg'),
        read1: require('./../assets/svgs/read_2.svg'),
        male: require('./../assets/svgs/male.svg'),
        female: require('./../assets/svgs/female.svg'),
    }
}