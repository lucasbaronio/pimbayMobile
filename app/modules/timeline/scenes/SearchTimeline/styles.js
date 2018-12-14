import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
import { Constants } from 'expo';
const { padding, color, fontSize, fontFamily, statusBarHeight, windowWidth, windowHeight } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // backgroundColor: color.white
    },
    header: {
        
    },
    searchView: {
        justifyContent: "center",
        width: windowWidth * 0.80,
    },
    buttonView: {
        flex: 1,
        justifyContent: "center"
    },
    buttonText: {
        fontSize: fontSize.text4,
        color: color.black,
        fontFamily: fontFamily.medium
    },
});

export default styles;
