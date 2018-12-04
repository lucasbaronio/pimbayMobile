import React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
// import LinkPreview from 'react-native-link-preview';
// import CardMessageComponent from './CardMessageComponent';
// import { formatDate } from 'chatapp-core/build/utils/formatDate';
// import TimeComponent from './TimeComponent';

import { connect } from 'react-redux';

import styles, { color } from "./styles";

class Message extends React.Component {

    // state = {
    //     metadata = null
    // }

    // componentDidMount() {
	// 	const msg = this.props.message.text;
	// 	if(msg !== ""){
	// 		LinkPreview.getPreview(msg)
	// 		.then(data => {
	// 			const metadata = {};
	// 			metadata.url = data.url;
	// 			metadata.image = data.images[0];
	// 			metadata.title = data.title;
	// 			metadata.description = data.description;
	// 			this.setState({ metadata });

	// 		});
	// 	}
	// }

	render() {
        const { direction, message } = this.props;

		return (
			<View
				style={[
					styles.container,
					direction === 'in' ? styles.containerIn : styles.containerOut,
				]}
			>
				<View
					style={[
						styles.box,
						{ backgroundColor: (direction === 'in' ? color.white : color.grey) },
						// (this.props.message.photo) ? styles.boxImage : styles.boxText
					]}
				>
					{/* {this.state.metadata ? <CardMessageComponent {...this.state.metadata} /> : ''} */}
					{/* {
						!!(this.props.message.photo && this.props.message.photo === "GoesWithPhoto") ?
							<View style={{ justifyContent: 'center', alignItems: 'center', height: 350 }} >
								<ActivityIndicator
									size="large"
									color={(this.props.theme === LIGHT_THEME) ? LIGHT_THEME_FONT : DARK_THEME_FONT}
								/>
							</View>
						: !!this.props.message.photo &&
							<Image source={{ uri: this.props.message.photo }} style={{ width: '100%', height: 350, marginBottom: 5 }} />
					} */}
					<Text
						style={[styles.text, {
                            color: (direction === 'in') ? color.black : color.white
                        }]}
					>
						{message.text}
					</Text>
					{/* <TimeComponent
						direction={direction}
						time={formatDate(new Date(this.props.time))}
					/> */}
				</View>
			</View>
		)
    }
}

export default connect(null, {  })(Message);