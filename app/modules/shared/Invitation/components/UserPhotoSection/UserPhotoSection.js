import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";

class UserPhotoSection extends Component {

    renderUserPhotoSection = (userAvatar, icon) => {
        return (
            <View style={styles.container}>
                <Avatar
                    rounded
                    medium
                    large
                    source={{ uri: userAvatar }}
                    containerStyle={{ marginTop: 20 }}
                />
                <Image source={icon} style={styles.iconSentStyle} />
            </View>
        );
    }

    render() {
        const { userAvatar, icon } = this.props;
        return this.renderUserPhotoSection(userAvatar, icon);
    }
}

export default UserPhotoSection;