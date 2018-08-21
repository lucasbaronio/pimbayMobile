import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";

class ContextAction extends React.PureComponent {

    _onPressButton = () => {
        const { item } = this.props;
        this.props.onPressItem(item);
    }

    render() {
        const { item, selected, timeline } = this.props;
        const colorAvatar = timeline
                ? styles.avatarBackgroundSelected
                : selected
                    ? styles.avatarBackgroundSelected
                    : styles.avatarBackgroundNoSelected

        return(
            <TouchableOpacity onPress={this._onPressButton}>
                    <View style={styles.container}>
                        <View style={styles.avatar}>
                            <Avatar
                                medium
                                rounded
                                avatarStyle={!timeline && !selected && styles.overlay}
                                overlayContainerStyle={colorAvatar}
                                source={(item.image) ? {uri: item.image} : null}
                                containerStyle={{marginLeft: 5, marginRight: 5}}
                                icon={(item.icon && item.type) ? {name: item.icon, type: item.type} : null}
                            />
                        </View>
                        <View>
                            <Text style={[styles.text, selected && styles.textSelected]}>
                                {item.title}
                            </Text>
                        </View>
                    </View>
            </TouchableOpacity>
        )
    }
}

export default connect(null, { })(ContextAction);