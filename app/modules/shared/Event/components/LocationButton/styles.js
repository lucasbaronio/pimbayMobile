import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { fontSize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        alignItems: "center"
    },
    text: {
        fontSize: fontSize.text5,
        marginLeft: 5
    },
});

export default styles;