import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontFamily, fontSize, color } = theme;

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginTop: 10,
        backgroundColor: color.white,
        marginBottom: 10
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text1,
        marginBottom: 10,
        marginLeft: 10
    },
    fire: {
        fontSize: fontSize.title1,
    }
});

export default styles;