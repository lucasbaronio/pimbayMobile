import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { fontFamily, fontSize } = theme;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 10
    },
    activityIndicatorCenter: {
        flex: 1,
        height: 200,
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
        fontSize: fontSize.text1,
        marginLeft: 10
    }

});

export default styles;