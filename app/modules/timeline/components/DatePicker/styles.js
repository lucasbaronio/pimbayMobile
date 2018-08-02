import { StyleSheet } from 'react-native';
import { theme } from "../../index"
// import { fontSize } from '../../../../styles/theme';
const { normalize, color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: color.grey
    },
    titleTimerDueDate: {
        fontSize: fontSize.regular,
        fontFamily: fontFamily.bold,
    },
    timerDueDate: {
        color: color.red,
        fontSize: fontSize.large,
        fontFamily: fontFamily.bold,
        textAlign: 'center',
        marginVertical: 5,
    }
});

export default styles;