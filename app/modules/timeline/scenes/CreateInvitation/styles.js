import { StyleSheet, Dimensions } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize, normalize, fontFamily, windowHeight } = theme;

const styles = StyleSheet.create({
    container:{
        flex: 1,
        // backgroundColor: color.white,
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
        backgroundColor: color.white,
        marginBottom: 10
    },
    createInvitationContainer: {
        margin: 10,
        height: 40,
    },
    createInvitationButton: {
        backgroundColor: color.orange,
        height: normalize(40)
    },
    createInvitationText: {
        fontSize: fontSize.text2,
        fontFamily: fontFamily.medium
    },
    loadingCreateInvitation: {
        justifyContent: 'center',
        borderRadius: 4,
        marginHorizontal: 15,
        marginVertical: 8,
        backgroundColor: color.orange,
        height: 42
    }
});

export default styles;
