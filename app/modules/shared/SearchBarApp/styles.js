import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color, windowHeight } = theme;

const styles = StyleSheet.create({
    search: {
        backgroundColor: color.transparent,
        borderBottomColor: color.transparent,
        borderTopColor: color.transparent,
    },
});

export default styles;