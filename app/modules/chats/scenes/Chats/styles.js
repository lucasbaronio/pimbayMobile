import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.white,
    },
    listChatUsers: { 
        flex: 1, 
        flexDirection: 'column', 
        marginHorizontal: 10 
    }
});

export default styles;
