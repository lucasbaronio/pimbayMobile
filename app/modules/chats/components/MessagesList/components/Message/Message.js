import React from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import LinkPreview from 'react-native-link-preview';
import CardMessage from './components/CardMessage';
import { formatFullDate } from '../../../../../shared/utils/date';
import Time from './components/Time';
import AvatarUser from '../../../../../shared/AvatarUser';

import { connect } from 'react-redux';
import { actions as profileActions } from "../../../../../profile/index";
const { getUserData } = profileActions;

import styles, { color } from "./styles";

class Message extends React.Component {

    state = {
        metadata: null
    }

    componentDidMount() {
		const msg = this.props.message.text;
		if(msg !== ""){
			LinkPreview.getPreview(msg)
			.then(data => {
				const metadata = {};
				metadata.url = data.url;
				metadata.image = data.images[0];
				metadata.title = data.title;
				metadata.description = data.description;
				this.setState({ metadata });
			});
		}
	}

	onPressUser = (item) => {
		console.log(item);
        const { getUserData } = this.props;
        getUserData(item.id, this.onSuccess, this.onError);
    }

    onSuccess(isLoggedUser) {
        Actions.push("ProfileUser", { isNotLoggedUser: !isLoggedUser });
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

	render() {
		const { direction, message } = this.props;
		const { user } = message;
		var date = new Date(Number(message.inserted_at)*1000);

		return (
			<View
				style={[
					styles.container,
					direction === 'in' ? styles.containerIn : styles.containerOut,
				]} >
				{
					!!(direction === 'in') &&
					<View style={{marginRight: 5}}>
						<AvatarUser
							small={true}
							item={{
								id: user.id,
								userName: user.display_name,
								fullName: user.display_name,
								avatar: user.avatar_url
							}}
							onPressButtom={this.onPressUser}
						/>
					</View>
				}
				<View
					style={[
						styles.box,
						styles.boxText,
						{ backgroundColor: (direction === 'in' ? color.white : color.grey) },
						// (this.props.message.photo) ? styles.boxImage : styles.boxText
					]}
				>
					{!!this.state.metadata && <CardMessage {...this.state.metadata} />}
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
					<Time
						direction={direction}
						time={formatFullDate(date)}
					/>
				</View>
			</View>
		)
    }
}

export default connect(null, { getUserData })(Message);