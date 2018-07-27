import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { normalize, color, windowWidth } = theme;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
    },
    card: {

    },
    // cardImage: {
    //     opacity: 0.3
    // },
    titleCard: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    subtitleCard: {
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    }

});

export default styles;