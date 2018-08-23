import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize } = theme;

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
        fontSize: fontSize.text3,
        color : color.black,
        backgroundColor: color.white,
        borderColor: color.light_grey,
        borderWidth: 1,
        borderRadius: 15,
        minHeight: 50,
    },
    descriptionFocused: {
        minHeight: 70,
    },
    descriptionView: {
        flex: 1,
        maxHeight: 300,
    },
    eventContainer: {
        marginHorizontal: 10, 
        marginVertical: 10
    },
});

export default styles;
