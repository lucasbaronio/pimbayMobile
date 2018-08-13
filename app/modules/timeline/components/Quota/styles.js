import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, fontSize, fontFamily, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderColor: color.grey,
        padding: 5,
        paddingHorizontal: 10
    },
    headerQuota: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    titleHasQuotaView: {
        flex: 1,
        justifyContent: 'center',
    },
    titleHasQuota: {
        fontSize: fontSize.regular,
    },
    switchHasQuota: {
        flex: 1,
    },
    bodyQuota: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    sliderView: {
        flex: 8,
        marginHorizontal: 3,
    },
    textSliderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5
    },
    colorCurrentQuota: {
        color: "green",
        fontSize: fontSize.regular,
    },
});

export default styles;