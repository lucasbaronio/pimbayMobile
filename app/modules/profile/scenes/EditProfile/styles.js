import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color, fontSize, fontFamily, normalize, windowWidth } = theme;

export const colorBackgroundHeader = color.white;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.white
    },
    saveButtonContainer: {
        margin: 10,
        height: 40,
        position: 'absolute',
        bottom:0,
        width: windowWidth*0.9      
    },
    saveButton: {
        backgroundColor: color.orange,
        height: normalize(40)
    },
    saveButtonText: {
        fontSize: fontSize.text2,
        fontFamily: fontFamily.medium
    }
});

export default styles;