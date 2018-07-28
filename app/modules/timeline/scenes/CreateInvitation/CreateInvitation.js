import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import { connect } from 'react-redux';

// import { actions as home } from "../../index"
// const { getEventsOrInvitations } = home;


class CreateInvitation extends React.Component {

    render() {
        return (
            <View>
                <Text>Crear invitacion</Text>
                <Text>{this.props.contextAction.id}</Text>
                <Text>{this.props.contextAction.title}</Text>
                <Text>{this.props.contextAction.icon}</Text>
                <Text>{this.props.contextAction.typle}</Text>
            </View>
        );
    }
}

export default connect(null, { })(CreateInvitation);