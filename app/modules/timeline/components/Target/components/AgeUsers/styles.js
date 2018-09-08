import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { color, fontSize, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { color, fontSize, fontFamily };
export default styles;