import { StyleSheet } from 'react-native';
import { theme } from "../../index";
const { color, fontSize, normalize, fontFamily } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        width: '100%', 
        flexDirection: 'row'
    },
});

export { color };
export default styles;
