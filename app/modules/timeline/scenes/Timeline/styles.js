import {StyleSheet} from 'react-native';
import {theme} from "../../index"
const { normalize, windowWidth, color } = theme;

export { color };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    activityIndicatorCenter: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    activityIndicatorBottom: {
        flex: 1, 
        marginVertical: 20
    },
    createInvitationTextInput: {
        height: 40,
        width: windowWidth,
        paddingVertical: 5,
        paddingHorizontal: 10,
    }
});

export default styles;