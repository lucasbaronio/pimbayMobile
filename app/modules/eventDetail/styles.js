import {StyleSheet} from 'react-native';
import { theme } from "../index";
const { fontSize, fontFamily, color, windowWidth } = theme;

const styles = StyleSheet.create({
    scrollViewStyle: {
        backgroundColor: color.white
    },
    eventImageStyle: {
        height: 200,
        width: windowWidth,
        alignSelf: 'stretch'
    },
    eventInfoContainerStyle: {
        padding: 10
    },
    eventTitleStyle: {
        fontSize: fontSize.text1,
        fontFamily: fontFamily.bold,
        marginBottom: 5
    },
    eventDateStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular,
        marginBottom: 5
    },
    dividerLineViewStyle: {
        marginTop: 5,
        marginBottom: 5,
        borderBottomColor: color.grey,
        borderBottomWidth: 0.25
    },
    eventDetailContainerStyle: {
        paddingHorizontal: 10
    },
    eventDetailHeaderStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.bold,
        marginBottom: 5
    },
    eventDetailDescriptionStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular
    },
    eventDescriptionViewMoreStyle: {
        fontSize: fontSize.text4,
        fontFamily: fontFamily.regular,
        color: color.grey
    },
    eventMapViewContainerStyle: {
        padding: 10
    },
    eventMapViewHeaderStyle: {
        fontSize: fontSize.text4, 
        fontFamily: fontFamily.bold, 
        marginBottom: 5
    },
    eventMapViewPlaceStyle: {
        fontSize: fontSize.text4, 
        fontFamily: fontFamily.bold, 
        marginLeft: 5, 
        marginBottom: 5
    },
    eventMapViewComponentStyle: {
        marginHorizontal: 5, 
        height: 250, 
        width: (windowWidth - 30)
    }
});

export default styles;