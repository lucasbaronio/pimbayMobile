import { StyleSheet } from 'react-native';
import { theme } from "../../index"

const { windowWidth, fontSize, color } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth, 
        justifyContent: 'flex-start',
    },
    userInfoSectionContainer: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    userNameStyle: {
        fontSize: fontSize.text4,
        fontWeight: 'bold',
        flex: 1,
        marginTop: 5, 
        marginBottom: 20
    },
    invitationInfoSectionContainer: {
        flex: 2, 
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
        alignSelf: 'flex-end',
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginTop: 5,
        marginBottom: 5
    },
    dividerImageStyle: {
        alignSelf: 'flex-start', 
        width: windowWidth
    },
    avatarBackground: {
        backgroundColor: color.light_blue
    },
    avatarContainerStyle: {
        top: 14, 
        right: 20, 
        position: 'absolute', 
        height: 30, 
        width: 30
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