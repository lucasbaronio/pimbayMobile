import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";

// Borrar luego de que obtengamos la info de backend
import { getUserInfo } from '../../backendInfoTmp';

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

    renderPublicPhotoSection = (icon) => {
        return (
            <View style={styles.container}>
                <Image source={icon} style={{height: 45, width: 45, marginTop: 20}} />
            </View>
        );
    }

    render() {
        const { userAvatar, icon, isPublic } = this.props;
        // const userInfo = getUserInfo(userId);
        if (isPublic) return this.renderPublicPhotoSection(icon);
        else return this.renderUserPhotoSection(userAvatar, icon);
    }
}

export default UserPhotoSection;