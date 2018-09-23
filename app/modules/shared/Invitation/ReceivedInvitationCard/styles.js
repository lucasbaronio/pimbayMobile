import { StyleSheet } from 'react-native';
import { theme } from "../../../index";

const { windowWidth, fontSize, color, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth, 
        justifyContent: 'flex-start'
    },
    userNameStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.bold,
        flex: 1,
        marginTop: 20
    },
    invitationInfoSectionContainer: {
        flex: 3, 
        justifyContent: 'center'
    },
    dueDateStyle: {
        marginLeft: 5,
        color: color.blood, 
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular
    },
    createdTimeStyle: {
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular
    },
    descriptionContainerStyle: {
        marginRight: 15, 
        marginTop: 10
    },
    descriptionWithContextContainerStyle: {
        marginTop: 10,
        flexDirection: 'row'
    },
    descriptionWithEventStyle: {
        marginTop: 10,
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular
    },
    descriptionStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular
    },
    descriptionWithContextStyle : {
        marginRight: 15,
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular,
        marginLeft: 10
    },
    button: { 
        backgroundColor: color.transparent, 
        fontSize: fontSize.text4, 
        color: color.orange
    },
    buttonViewReject: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    buttonViewConfirm: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 20
    },
    dividerImageStyle: {
        alignSelf: 'flex-start', 
        width: windowWidth
    },
    iconSentStyle: {
        top: 55, 
        right: 20, 
        position: 'absolute', 
        height: 22, 
        width: 22
    },
    iAmOutBackgroundColor: {
        backgroundColor: color.grey, 
    }
});

export { fontSize, windowWidth, color };
export default styles;