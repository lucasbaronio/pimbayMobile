import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, windowWidth, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        flexDirection: 'column',
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

export { fontSize };
export default styles;
