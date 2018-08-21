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
});

export default styles;