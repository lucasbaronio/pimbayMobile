import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";
// Las Actions (para navegar entre screens) se ejecutan desde el Timeline
// import { Actions } from "react-native-router-flux";

class ContextAction extends React.PureComponent {

    _onPressButton = () => {
        // this.setState({
        //     count: this.state.count+1
        // })
        const { item } = this.props;
        this.props.onPressItem(item);
    }

    render() {
        const { item, selected } = this.props;
        const colorAvatar = selected 
                ? styles.avatarBackgroundSelected
                : styles.avatarBackgroundNoSelected;

        return(
            <TouchableOpacity onPress={this._onPressButton}>
                <View style={styles.container}>
                    <View style={styles.avatar}>
                        <Avatar
                            large
                            rounded
                            overlayContainerStyle={colorAvatar}
                            source={(item.image) ? {uri: item.image} : null}
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