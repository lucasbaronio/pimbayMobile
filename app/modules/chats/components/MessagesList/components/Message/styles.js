import { StyleSheet } from 'react-native';
import { theme } from "../../../../index";
const { color, fontSize, windowWidth, fontFamily } = theme;

const styles = StyleSheet.create({
    container: {
		flexDirection: 'row',
		alignItems: 'center',
		zIndex: 1,
		marginBottom: 10,
		marginTop: 2,
	},
    containerIn: {
		justifyContent: 'flex-start',
		marginLeft: 5,
		marginRight: 0,
	},
	containerOut: {
		justifyContent: 'flex-end',
		marginLeft: 0,
		marginRight: 5,
    },
    box: {
		maxWidth: '80%',
		position: 'relative',
		display: 'flex',
		padding: 10,
		paddingBottom: 17,
		borderRadius: 6,
		shadowOffset: { width: 1, height: 0.5 },
		shadowColor: 'black',
		shadowOpacity: 0.30,
	},
	boxText: {
		minWidth: '40%',
	},
	boxImage: {
		minWidth: '80%',
	},
	boxIn: {
		backgroundColor: color.white,
	},
});

export { color };
export default styles;
