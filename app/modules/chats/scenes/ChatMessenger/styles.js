import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, windowWidth, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
        backgroundColor: color.white,
    },
    changeChatName: {
        height: 50
    },
    changeChatNameView: { 
        flexDirection: 'row',
        height: 40,
        padding: 5,
        borderBottomColor: color.light_grey,
        borderBottomWidth: 1,
        // alignItems: 'center', 
        // justifyContent: 'center' 
    },
    confirmButton: {
        width: 40,
        marginLeft: 5,
    },
    changeChatNameInput: { 
        flex: 1,
        width: '100%',
        // borderColor: 'gray',
        // borderWidth: 1,
        // borderRadius: 25,
        paddingHorizontal: 10,
        fontSize: fontSize.text2,
        color : color.black,
        backgroundColor: color.white,
    },
    listChatUsers: { 
        flex: 1, 
        flexDirection: 'column', 
        marginHorizontal: 10 
    },
    dividerImageStyle: {
        alignSelf: 'flex-start', 
        width: windowWidth
    },
    activityIndicatorCenter: {
        flex: 1,
        height: 200,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
});

export { fontSize, color };
export default styles;
