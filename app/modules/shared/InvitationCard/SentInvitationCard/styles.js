import { StyleSheet } from 'react-native';
import { theme } from "../../../index"

const { windowWidth, fontSize, color } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth, 
        justifyContent: 'flex-start',
    },
    userAvatarSectionContainer: {
        flex: 1,
        alignItems: 'center'
    },
    userNameStyle: {
        fontSize: fontSize.text4,
        fontWeight: 'bold',
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
    },
    createdTimeStyle: {
        color: color.grey, 
        fontSize: fontSize.text5,
    },
    descriptionContainerStyle: {
        marginRight: 15, 
        marginTop: 10
    },
    descriptionStyle: {
        fontSize: fontSize.text3
    },
    button: {
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5
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
        right: 5, 
        top: 0, 
        fontSize: fontSize.text5, 
        position: 'absolute'
    }

});

export { fontSize, windowWidth };
export default styles;