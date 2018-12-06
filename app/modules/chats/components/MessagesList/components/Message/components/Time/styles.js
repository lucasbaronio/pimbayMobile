import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        width: '100%', 
        flexDirection: 'row'
    },
    avatar: {
        margin: 5,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.white,
        borderRadius: 35,
        width: 70,
        height: 70
    },
    chatInfo: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'center',
        marginLeft: 10
    },
    arrowForward: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        paddingRight: 10
    },
    unreadMessageCount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        // paddingRight: 10
    },
    lastMessage: {
        color: color.grey
    }
});

export { color };
export default styles;
