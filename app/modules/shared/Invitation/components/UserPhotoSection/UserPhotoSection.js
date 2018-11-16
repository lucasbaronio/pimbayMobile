import React, { Component } from 'react';
import { connect } from "react-redux";
import { Image, TouchableOpacity, Alert } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";
import { Actions } from 'react-native-router-flux';

import { actions as profileActions } from "../../../../profile/index";
const { getUserData } = profileActions;

class UserPhotoSection extends Component {

    onPress = () => {
        const { getUserData, userId } = this.props;
        getUserData(userId, this.onSuccess, this.onError);
    }

    onSuccess(isLoggedUser) {
        Actions.push("ProfileUser", { isLoggedUser });
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    renderUserPhotoSection = (userAvatar, fullName, icon) => {
        var initials = fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
        return (
            <TouchableOpacity style={styles.container} onPress={this.onPress}>
                <Avatar
                    rounded
                    medium
                    title={(!userAvatar) ? initials : null}
                    source={(userAvatar) ? { uri: userAvatar } : null}
                    containerStyle={{ marginTop: 20 }}
                />
                <Image source={icon} style={styles.iconSentStyle} />
            </TouchableOpacity>
        );
    }

    render() {
        const { userAvatar, fullName, icon } = this.props;
        return this.renderUserPhotoSection(userAvatar, fullName, icon);
    }
}

// export default UserPhotoSection;
export default connect(null, { getUserData })(UserPhotoSection);