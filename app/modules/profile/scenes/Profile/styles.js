import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontSize, color, fontFamily, windowWidth, windowHeight } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    fullNameStyle: {
        fontSize: fontSize.text3,
        fontFamily: fontFamily.medium,
        marginTop: 15
    },
    bioStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular,
        marginTop: 5
    },
    userInfoLabel: {
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular,
        color: color.grey
    },
    horizontalLineStyle: {
        marginTop: 10,
        borderBottomColor: color.light_grey,
        borderBottomWidth: 1,
        alignSelf: 'stretch'
    },
    interestsTitleStyle: {
        fontSize: fontSize.text3,
        fontFamily: fontFamily.medium,
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15
    },
    interestTextStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.medium,
        backgroundColor: '#fcedea',
        marginRight: 10,
        marginBottom: 10,
        borderColor: 'transparent',
        borderWidth: 0,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    button: {
        marginTop: 20,
        borderColor: color.orange,
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    optionsViews: { 
        flex: 1, 
        height: 60, 
        alignItems: 'center', 
        marginHorizontal: 10 
    },
    optionsSelected: {
        borderBottomColor: color.orange,
        borderBottomWidth: 1,
    }
});

export { color, fontSize, windowWidth, windowHeight };
export default styles;