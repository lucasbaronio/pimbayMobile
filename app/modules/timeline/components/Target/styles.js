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
    ageUsersPicker: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export { color };
export default styles;