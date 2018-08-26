import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, fontFamily, statusBarHeight, windowWidth, windowHeight } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
});

export { windowWidth }
export default styles;
