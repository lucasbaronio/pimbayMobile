import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color, fontSize, fontFamily, statusBarHeight, windowWidth, windowHeight } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
});

export default styles;