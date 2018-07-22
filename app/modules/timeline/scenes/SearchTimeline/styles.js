import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
import { Constants } from 'expo';
const { padding, color, fontSize, fontFamily, statusBarHeight, windowWidth, windowHeight } = theme;

const resizeMode = 'contain';
export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.white
    },
    header: {
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // flex: 1,
    },
    searchView:{
        flex: 5,
        width: windowWidth * 0.8,
        // marginTop: statusBarHeight,
        // backgroundColor: '#fff',
    },
    search:{
        // backgroundColor: 'transparent',
        backgroundColor: color.transparent,
        borderBottomColor: color.transparent,
        borderTopColor: color.transparent,
        marginTop: windowHeight * 0.005,
        // height: '100%',
        // width: '100%',
        
    },
    buttonView:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        marginTop: statusBarHeight,
        // marginRight: 5,
        // backgroundColor: 'steelblue',
    },
    buttonText:{
        fontSize: fontSize.regular,
        color: color.black,
        fontFamily: fontFamily.medium
    },
});

export default styles;
