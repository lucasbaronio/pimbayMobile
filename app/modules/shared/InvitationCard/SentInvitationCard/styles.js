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
    userAvatarSectionContainer: {
        flex: 1,
        alignItems: 'center'
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
        color: color.grey, 
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
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20
    },
    buttonViewFinalizar: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
    },
    buttonViewChat: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginRight: 20
    },
    dividerImageStyle: {
        alignSelf: 'flex-start', 
        width: windowWidth
    },
    avatarBackground: {
        backgroundColor: color.light_blue
    },
    iconSentStyle: {
        top: 55, 
        right: 20, 
        position: 'absolute', 
        height: 22, 
        width: 22
    },
    avatarTextStyle: {
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular
    }
});

export { fontSize, windowWidth };
export default styles;