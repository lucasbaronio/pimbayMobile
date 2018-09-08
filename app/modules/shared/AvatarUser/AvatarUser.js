import React from 'react';
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Avatar } from 'react-native-elements';

import styles from "./styles";
import { Ionicons } from '@expo/vector-icons';

class AvatarUser extends React.PureComponent {

    state = {
        selectedToggle: false
    }

    componentWillMount() {
        const { item } = this.props;
        this.setState({ selectedToggle: item.selected });
    }

    onPress = () => {
        const { item, selectable, onPressInviteButtom, onSelectUser, onDeselectUser } = this.props;
        if (selectable) {
            this.setState({
                selectedToggle: !this.state.selectedToggle
            }, () => this.state.selectedToggle ? onSelectUser(item) : onDeselectUser(item))
        } else {
            onPressInviteButtom && onPressInviteButtom();
        }
    }

    renderAvatar = ({ item, initials }) => {
        if (item.avatar && item.avatar.startsWith('../')) {
            return (
                <View style={styles.inviteButton}>
                    <Image
                        style={{ width: 32, height: 32 }}
                        source={require('../../../assets/icons/adduser.png')}
                    />
                </View>
            )
        } else {
            return (
                <Avatar
                    medium
                    rounded
                    title={(!item.avatar) ? initials : null}
                    source={(item.avatar) ? { uri: item.avatar } : null}
                />
            )
        }

    }

    render() {
        const { item } = this.props;
        var initials = item.fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

        return (
            <TouchableOpacity onPress={this.onPress}>
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        {this.renderAvatar({ item, initials })}
                        {
                            !!this.state.selectedToggle &&
                            <Ionicons name="ios-checkmark-circle" size={22} color="green" style={styles.icon} />
                        }
                    </View>
                    <View>
                        <Text style={styles.text}>
                            {item.userName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default AvatarUser;