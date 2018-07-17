import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
import { Constants } from 'expo';
const { padding, color, fontSize, fontFamily, windowWidth, normalize } = theme;

const resizeMode = 'contain';
const { height, width } = Dimensions.get('window');

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
        width: width * 0.8,
        // marginTop: Constants.statusBarHeight,
        // backgroundColor: '#fff',
    },
    search:{
        // backgroundColor: 'transparent',
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        marginTop: height * 0.005,
        // height: '100%',
        // width: '100%',
        
    },
    buttonView:{
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        height: '100%',
        marginTop: Constants.statusBarHeight,
        // marginRight: 5,
        // backgroundColor: 'steelblue',
    },
    buttonText:{
        // fontSize: fontSize.regular,
        color: "#fff",
        // fontFamily: fontFamily.medium
    },
});

export default styles;
