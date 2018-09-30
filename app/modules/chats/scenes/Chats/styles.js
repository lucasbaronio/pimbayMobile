import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    createInvitationContainer: {
        margin: 10,
        height: 40,
    },
    createInvitationButton: {
        backgroundColor: color.orange,
        height: normalize(40)
    },
    createInvitationText: {
        fontSize: fontSize.text2,
        fontFamily: fontFamily.medium
    },
    loadingCreateInvitation: {
        justifyContent: 'center',
        borderRadius: 4,
        marginHorizontal: 15,
        marginVertical: 8,
        backgroundColor: color.orange,
        height: 42
    }
});

export default styles;
