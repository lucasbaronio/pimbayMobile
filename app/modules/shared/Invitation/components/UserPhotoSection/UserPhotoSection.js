import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";

class UserPhotoSection extends Component {

    renderUserPhotoSection = (userAvatar, fullName, icon) => {
        var initials = fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return (
            <View style={styles.container}>
                <Avatar
                    rounded
                    medium
                    title={(!userAvatar) ? initials : null}
                    source={(userAvatar) ? { uri: userAvatar } : null}
                    containerStyle={{ marginTop: 20 }}
                />
                <Image source={icon} style={styles.iconSentStyle} />
            </View>
        );
    }

    render() {
        const { userAvatar, fullName, icon } = this.props;
        return this.renderUserPhotoSection(userAvatar, fullName, icon);
    }
}

export default UserPhotoSection;