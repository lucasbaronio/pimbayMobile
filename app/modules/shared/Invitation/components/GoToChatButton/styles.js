import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { fontSize, color } = theme;

const styles = StyleSheet.create({
    buttonText: { 
        backgroundColor: color.transparent, 
        fontSize: fontSize.text4, 
        color: color.orange,
        marginRight: 10
    },
    buttonImage: { 
        height: 10, 
        width: 10 
    }
});

export default styles;