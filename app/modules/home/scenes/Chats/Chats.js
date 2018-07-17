import React from 'react';
import { View, Text } from 'react-native';
// import { SearchBar, Header } from 'react-native-elements';
// import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

// import { actions as home } from "../../index"
// const { getEventsOrInvitations } = home;

import styles from "./styles"

class Chats extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Lista de chats</Text>
            </View>
        );
    }
}

export default connect(null, { })(Chats);