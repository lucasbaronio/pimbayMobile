import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color, fontSize, fontFamily, normalize } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
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
    }
});

export default styles;