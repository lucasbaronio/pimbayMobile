import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontFamily, fontSize } = theme;

const styles = StyleSheet.create({
    container: {
        // height: 120
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    activityIndicatorBottom: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center",
        alignItems: 'center',
        marginHorizontal: 10
    },
    title: {
        fontFamily: fontFamily.bold,
        fontSize: fontSize.text2,
        marginLeft: 10
    }

});

export default styles;