import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: color.white,
    },
    description: {
        maxHeight: 90,
        borderColor: color.transparent,
        paddingHorizontal: 13,
        margin: 10,
        fontSize: 17,
        color : color.black,
        backgroundColor: color.white,
    },
    descriptionFocused: {
        minHeight: 70,
        borderColor: color.light_grey,
        borderWidth: 1,
        borderRadius: 15,
    },
    descriptionView: {
        flex: 1,
        maxHeight: 300,
    },
});

export default styles;
