import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 5,
        paddingHorizontal: 10
    },
    selectedButtonStyle: {
        backgroundColor: color.blue,
    },
    buttonView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleForWhom: {
        fontSize: fontSize.text2,
    }
});

export default styles;