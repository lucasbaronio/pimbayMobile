import { StyleSheet } from 'react-native';
import { theme } from "../../../index"
const { normalize, color, windowWidth, fontFamily, fontSize } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "flex-start",
    },
    image: {
        width: 110, 
        height: 100,
        borderRadius: 5
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text4,
        marginBottom: 10
    },
    realizationDate: {
        fontSize: fontSize.text5,
        fontFamily: fontFamily.regular,
        marginRight: 10,
        marginLeft: 5,
        color: color.blood,
        marginBottom: 10
    }

});

export default styles;