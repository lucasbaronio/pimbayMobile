import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontSize, color, windowWidth, fontFamily } = theme;

export { color };

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
        marginLeft: 15
    },
});

export default styles;