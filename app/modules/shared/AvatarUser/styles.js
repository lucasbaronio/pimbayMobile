import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { color } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 5,
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
        marginBottom: 5,
        textAlign: 'center',
    },
    textSelected: {
        fontWeight: 'bold',
    },
    icon: {
        top: -5,
        left: 35,
        position: 'absolute',
        height: 22,
        width: 22
    },
    inviteButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: color.light_grey
    }
});

export default styles;