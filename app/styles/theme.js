import { Dimensions, Platform } from 'react-native';
import { Constants } from 'expo';
import { moderateScale as normalize } from 'react-native-size-matters';

const color = {
    black: "#3B3031",
    light_black: "#414141",
    main: "rgb(99,139,250)",
    white: "#ffffff",
    light_grey: "#eaeaea",
    grey: "#ccc",
    red: "red",
    blue: "#2196F3",
    light_blue: "#90CAF9",
    orange: "#DE5134",
    blood: "#AC1010",
    underlayColor: "#ddd",
    transparent: "transparent"
}

const fontSize = {
    small: normalize(14),
    regular: normalize(17),
    large: normalize(21),

    title1: normalize(22),
    title2: normalize(20),
    text1: normalize(18),
    text2: normalize(16),
    text3: normalize(14),
    text4: normalize(12),
    text5: normalize(10),
}

const fontFamily = {
    // extrabold: "RobotoExtraBold",
    // bold: "RobotoBold",
    // medium: "RobotoMedium",
    // regular: "RobotoRegular",
    // light: "RobotoLight"

    extrabold: "SFProTextHeavy",
    bold: "SFProTextBold",
    medium: "SFProTextMedium",
    regular: "SFProTextRegular",
    light: "SFProTextLight",
    pimbay: "BoogalooRegular",
}

const padding = 8;
const navbarHeight = (Platform.OS === 'ios') ? 64 : 54;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const statusBarHeight = Constants.statusBarHeight;

const tabColor = (Platform.OS === "ios") ? "rgba(73,75,76, .5)" : "rgba(255,255,255,.8)";
const selectedTabColor = (Platform.OS === "ios") ? "rgb(73,75,76)" : "#fff";

const tabIconStyle = { size: 21, color: tabColor, selected: selectedTabColor }
const navTitleStyle = { fontSize: fontSize.text2 , fontFamily: fontFamily.bold, color: color.black }

export {
    color,
    fontSize,
    fontFamily,
    padding,
    navbarHeight,
    windowWidth,
    windowHeight,
    tabIconStyle,
    navTitleStyle,
    normalize,
    statusBarHeight
}
