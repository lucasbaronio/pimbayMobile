import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { connect } from "react-redux";

import { contextActionSize } from '../constants';
import styles from "./styles";

class ContextAction extends React.PureComponent {

    _onPressButton = () => {
        const { item, onPressItem } = this.props;
        onPressItem && onPressItem(item);
    }

    render() {
        const { item, size, selectable, selected } = this.props;
        const colorAvatar = !selectable
                ? styles.avatarBackgroundSelected
                : selected
                    ? styles.avatarBackgroundSelected
                    : styles.avatarBackgroundNoSelected
        const text = size === contextActionSize.MEDIUM
                ? styles.textMedium
                : styles.textSmall

        return(
            <TouchableOpacity onPress={this._onPressButton}>
                <View style={[styles.container, { maxWidth: (size === contextActionSize.MEDIUM) ? 80 : 40 }]}>
                    <View style={styles.avatar}>
                        <Avatar
                            medium={size === contextActionSize.MEDIUM}
                            small={size === contextActionSize.SMALL}
                            rounded
                            avatarStyle={selectable && !selected && styles.overlay}
                            overlayContainerStyle={colorAvatar}
                            source={(item.image) ? {uri: item.image} : null}
                            containerStyle={{ marginHorizontal: 5 }}
                            icon={(item.icon && item.type) ? {name: item.icon, type: item.type} : null}
                        />
                    </View>
                    <View>
                        <Text style={[styles.text, text, selectable && selected && styles.textSelected]}>
                            {item.title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

export default connect(null, { })(ContextAction);