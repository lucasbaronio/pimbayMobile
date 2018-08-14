import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { fontSize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center"
    },
    text: {
        fontSize: fontSize.text4,
    },
});

export default styles;