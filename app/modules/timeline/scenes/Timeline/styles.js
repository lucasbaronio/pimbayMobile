import {StyleSheet} from 'react-native';
import {theme} from "../../index"
const { fontFamily, fontSize, windowWidth, color } = theme;

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
    activityIndicatorBottom: {
        flex: 1, 
        marginVertical: 20
    },
    createInvitationTextInput: {
        height: 40,
        width: windowWidth,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text2,
        marginLeft: 10
    },
    titleInvitationsSection: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text2,
        marginLeft: 10,
        marginBottom: 10
    }
});

export { color };
export default styles;