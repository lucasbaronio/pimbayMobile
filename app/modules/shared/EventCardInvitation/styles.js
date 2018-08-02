import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        flexDirection: "row", 
        justifyContent: "flex-start",
        margin: 10
    },
    image: {
        // flex: 1, 
        width: windowWidth/3.5, 
        height: windowWidth/3.5
    },
    title: {
        
    }

});

export default styles;