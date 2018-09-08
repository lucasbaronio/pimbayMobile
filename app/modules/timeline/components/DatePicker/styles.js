import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        // borderTopWidth: 1,
        // borderBottomWidth: 1,
        // borderColor: color.grey,
        backgroundColor: color.white,
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    titleTimerDueDate: {
        fontSize: fontSize.text2,
    },
    timerDueDate: {
        color: color.red,
        fontSize: fontSize.text2,
        fontFamily: fontFamily.bold,
        textAlign: 'center',
        marginVertical: 5,
    },
    buttonAndroid: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    datePickerIOSContainer: {
        backgroundColor: 'white', 
        borderRadius: 10,
        marginBottom: 10, 
    },
    datePickerIOSTitle: {
        marginVertical: 10,
        textAlign: "center",
        color: 'rgba(0, 0, 0, 0.70)'
    },
    dividerImageStyle: {
        alignSelf: 'flex-start', 
        width: windowWidth,
        height: 1,
        marginTop: 5,
        marginLeft: 30
    },
    text: {
        fontSize: fontSize.text4,
    },
    textDisable: {
        color: color.grey
    },
    toEventDate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});

export default styles;