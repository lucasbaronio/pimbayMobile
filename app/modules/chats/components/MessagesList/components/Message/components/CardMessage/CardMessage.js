import React from 'react';
import { Text, TouchableOpacity, Linking } from 'react-native';
import { URL_PROXY, NO_IMG_CARD } from "../../../../../../constants";
import { Card } from 'react-native-elements';

const CardMessage = ({ url, image, title, description }) => (
	<Card
		title={title}
		image={image ? { uri:image } : { uri: NO_IMG_CARD }}>
		<Text style={{ marginBottom: 10 }}>
			{description}
		</Text>
		<TouchableOpacity
			onPress={() => { Linking.openURL(url.replace(URL_PROXY,""))}} >
			<Text>
				{url.replace(URL_PROXY,"")}
			</Text>
		</TouchableOpacity>
	</Card>
)

export default CardMessage;