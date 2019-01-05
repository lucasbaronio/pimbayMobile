import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { fontSize, color, windowHeight } = theme;

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

export { windowHeight };
export default styles;