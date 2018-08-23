import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";

// Borrar luego de que obtengamos la info de backend
import { getUserInfo } from '../../backendInfoTmp';

class UserPhotoSection extends Component {

    render() {
        const { userAvatar, icon } = this.props;
        // const userInfo = getUserInfo(userId);
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
        )
    }
}

export default UserPhotoSection;