import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', 
        alignItems: 'flex-end', 
        height: 60, 
        borderTopColor: color.grey , 
        borderTopWidth: 1,
        backgroundColor: color.white,
    },
    cameraView: { 
        width: 50, 
        height: 50, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center'
    },
    cameraButton: {
        backgroundColor: color.orange,
        borderRadius: 25,
        padding: 12,
        width: 50,
        height: 50
    },
    messageInputView: { 
        flex: 4, 
        height: 50,
        margin: 5,
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    messageInput: { 
        flex: 1,
        width: '100%',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: fontSize.text2,
        color : color.black,
        backgroundColor: color.white,
    },
    sendMessageView: { 
        width: 50, 
        height: 50, 
        margin: 5, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },
    sendMessageButton: {
        backgroundColor: color.orange,
        borderRadius: 25,
        padding: 12,
        width: 50,
        height: 50
    },
});

export { color };
export default styles;
