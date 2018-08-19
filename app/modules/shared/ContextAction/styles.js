import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
        marginLeft: 5,
        maxWidth: 85,
    },
    avatar: {
        marginBottom: 5,
    },
    avatarBackgroundSelected: {
        backgroundColor: theme.color.blue,
    },
    avatarBackgroundNoSelected: {
        backgroundColor: theme.color.light_blue,
    },
    text: {
        fontSize: theme.fontSize.text4,
        marginBottom: 5,
        textAlign: 'center'
    },
    textSelected: {
        fontSize: theme.fontSize.text4,
        fontWeight: 'bold'
    }
});

export default styles;