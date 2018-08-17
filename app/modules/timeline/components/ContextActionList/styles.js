import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontFamily, fontSize, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        marginTop: 10
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text2,
        marginBottom: 10,
        marginLeft: 10
    }

});

export default styles;