import {StyleSheet} from 'react-native';
import {theme} from "../../../index"
const { normalize, windowWidth, color } = theme;

export { color };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: color.white,
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
});

export default styles;