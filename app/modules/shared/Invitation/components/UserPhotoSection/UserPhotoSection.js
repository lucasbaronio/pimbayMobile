import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { Avatar } from 'react-native-elements';
import styles from "./styles";
import SentIcon from '../../../../../assets/icons/sentIcon.png';

// Borrar luego de que obtengamos la info de backend
import { getUserInfo } from '../../backendInfoTmp';

class UserPhotoSection extends Component {

    render() {
        const { invitedUsers } = this.props;
        const userInfo = getUserInfo(invitedUsers[0]);
        return (
            <View style={styles.container}>
                {/* <View style={styles.userAvatarSectionContainer}> */}
                    <Avatar
                        rounded
                        medium
                        large
                        source={{ uri: userInfo.avatar }}
                        containerStyle={{ marginTop: 20 }}
                    />
                {/* </View> */}
                {/* <Image source={require('../../../../assets/icons/sentIcon.png')} style={styles.iconSentStyle} /> */}
                <Image source={SentIcon} style={styles.iconSentStyle} />
            </View>
        )
    }
}

export default UserPhotoSection;