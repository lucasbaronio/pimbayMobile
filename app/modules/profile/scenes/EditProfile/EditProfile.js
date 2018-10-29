import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

import styles from "./styles"

class EditProfile extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>EditProfile</Text>
            </View>
        );
    }
}

export default connect(null, {})(EditProfile);