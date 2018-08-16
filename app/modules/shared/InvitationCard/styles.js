import { StyleSheet } from 'react-native';
import { theme } from "../../index"

const { windowWidth, fontSize } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: windowWidth, 
        justifyContent: 'flex-start',
        //marginBottom: 10
    },
    topSectionInvitation: {
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
    },
    userNameStyle: {
        fontSize: fontSize.text4,
        fontWeight: 'bold',
        flex: 1,
        marginTop: 5, 
        marginBottom: 20
    },
    dueDateStyle: {
        color: 'red', 
        fontSize: fontSize.text5,
    },
    middleSectionInvitation: {
        flex: 1, 
        marginTop: 10
    },
    descriptionStyle: {
        fontSize: fontSize.text3
    },
    bottomSectionInvitationTimeline: {
        alignItems: 'flex-end', 
        flex: 1, 
        marginTop: 10
    },
    bottomSectionInvitationSent: {
        flexDirection: 'row',
        alignItems: 'flex-start', 
        flex: 1, 
        marginTop: 10
    },
    containerButtonStyle: {
        marginRight: 0
    },
    buttonStyle: {
        backgroundColor: '#03A9F4',
        borderColor: "transparent",
        borderRadius: 5,
        borderWidth: 0,
        height: 40,
        width: 80
    },
    button: {
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 20,
    },
    buttonView: {
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginBottom: 5
    },
});

export { fontSize, windowWidth };
export default styles;