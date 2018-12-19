import { StyleSheet } from 'react-native';
import { theme } from "../../../index"

const { windowHeight, windowWidth, fontSize, color, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        // alignItems: 'center',
        backgroundColor: color.white,
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    invitationView: {
        maxHeight: windowHeight * 0.3,
        marginTop: 10,
    },
    badgeView: {
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeContainer: {
        marginHorizontal: 5,
        marginVertical: 5
    },
    badgeText: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.bold
    },
    title: {
        fontSize: fontSize.text2,
        fontFamily: fontFamily.bold,
        marginVertical: 10,
        marginHorizontal: 10
    }

});

export { color, windowWidth };
export default styles;