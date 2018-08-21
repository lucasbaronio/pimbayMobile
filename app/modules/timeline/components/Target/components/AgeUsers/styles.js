import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { color };
export default styles;