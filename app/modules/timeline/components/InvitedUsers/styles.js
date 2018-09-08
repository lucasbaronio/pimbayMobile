import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontFamily, fontSize, color } = theme;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        backgroundColor: color.white,
        paddingVertical: 10,
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text2,
        marginLeft: 10
    }
});

export default styles;