import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color, fontSize, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: color.white,
        padding: 5,
        paddingHorizontal: 10,
        marginBottom: 10
    },
    headerQuota: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: fontSize.text2,
    },
    chooseQuotaView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10,
    },
    pickerTitle: {
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
});

export default styles;