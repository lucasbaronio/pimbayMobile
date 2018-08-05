import { StyleSheet } from 'react-native';
import { theme } from "../../index"

const { windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
    },
    topSectionInvitation: {
        alignItems: 'center',
        flex: 1, 
        flexDirection: 'row'
    },
    userNameStyle: {
        fontSize: 14, 
        fontWeight: 'bold',
        flex: 1, 
        marginLeft: 15
    },
    dueDateStyle: {
        alignSelf:'center', 
        color: 'red', 
        flex: 1, 
        fontSize: 14,
        marginRight: 10,
        textAlign: 'right'
    },
    middleSectionInvitation: {
        flex: 1, 
        marginTop: 10
    },
    descriptionStyle: {
        fontSize: 14
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
    }
});

export default styles;