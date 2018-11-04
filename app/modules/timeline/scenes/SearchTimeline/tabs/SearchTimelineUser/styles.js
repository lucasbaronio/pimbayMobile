import { StyleSheet } from 'react-native';
import { theme } from "../../../../index"
const { color, windowWidth } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
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
