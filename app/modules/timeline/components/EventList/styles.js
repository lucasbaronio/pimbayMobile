import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, windowWidth } = theme;

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
    }

});

export default styles;