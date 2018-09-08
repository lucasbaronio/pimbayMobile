import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontSize, color, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        margin: 5
    },
    overlay: {
        opacity: 0.5
    },
    avatar: {
        marginBottom: 5
    },
    avatarBackgroundSelected: {
        backgroundColor: color.blue
    },
    avatarBackgroundNoSelected: {
        backgroundColor: color.light_blue
    },
    text: {
        fontFamily: fontFamily.regular,
        textAlign: 'center'
    },
    textMedium: {
        fontSize: fontSize.text4
    },
    textSmall: {
        fontSize: fontSize.text5
    },
    textSelected: {
        fontFamily: fontFamily.bold
    }
});

export default styles;