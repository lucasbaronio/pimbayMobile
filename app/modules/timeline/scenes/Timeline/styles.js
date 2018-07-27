import {StyleSheet} from 'react-native';
import {theme} from "../../index"
const { normalize } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        // padding: 5,
        backgroundColor: '#fff',
    },
    activityIndicatorCenter:{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: "center"
    },
    activityIndicatorBottom:{
        flex: 1, 
        marginVertical: 20
    }
});

export default styles;