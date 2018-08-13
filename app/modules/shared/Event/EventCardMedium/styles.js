import { StyleSheet } from 'react-native';
import { theme } from "../../../index";
const { fontSize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
    },
    card: {
        borderWidth: 0,
        borderColor: color.transparent,

    },
    button: {
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 25,
        paddingVertical: 5,
        paddingHorizontal: 8,
    },
    buttonView: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginBottom: 5
    },
    title: {
        fontSize: fontSize.text2,
        fontWeight: 'bold',
        margin: 5,
    },
    eventDetail: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "flex-start", 
        alignItems: "center",
    },
    realizationDate: {
        fontSize: fontSize.text3,
        marginRight: 10,
        marginLeft: 5,
        color: color.blood
    }
});

export { fontSize };
export default styles;