import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";

class AvatarUser extends React.PureComponent {

    onPressAvatar = () => {
        const { item } = this.props;
        // this.props.onPressAvatar(item);
    }

    render() {
        const { item } = this.props;
        var initials = item.fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

        return(
            <TouchableOpacity onPress={this.onPressAvatar}>
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        <Avatar
                            large
                            rounded
                            // overlayContainerStyle={colorAvatar}
                            title={(!item.avatar) ? initials : null}
                            source={(item.avatar) ? {uri: item.avatar} : null}
                        />
                    </View>
                    <View>
                        <Text style={[styles.text]}>
                            {item.username}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default connect(null, { })(AvatarUser);