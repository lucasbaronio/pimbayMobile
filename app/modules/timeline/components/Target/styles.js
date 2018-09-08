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
    genderUsers: {
        flex: 1,
        flexDirection: 'column',
    },
    genderUsersItems: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5
    },
    title: {
        fontSize: fontSize.text2,
    },
    ageUsers: {
        flex: 1,
        flexDirection: 'column',
    },
    dividerImageStyle: {
        alignSelf: 'flex-start',
        width: windowWidth,
        height: 1,
        marginVertical: 3,
        marginLeft: 30
    }
});

export { color };
export default styles;