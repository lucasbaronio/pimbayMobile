import { StyleSheet } from 'react-native';
import { theme } from "../../index"
// import { fontSize } from '../../../../styles/theme';
const { normalize, color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: color.grey,
        padding: 5,
        paddingHorizontal: 10
    },
    titleTimerDueDate: {
        fontSize: fontSize.text2,
    },
    timerDueDate: {
        color: color.red,
        fontSize: fontSize.title2,
        fontFamily: fontFamily.bold,
        textAlign: 'center',
        marginVertical: 5,
    },
    buttonAndroid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default styles;