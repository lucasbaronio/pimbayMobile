import React from 'react';
import { View, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

// import { actions as home } from "../../index"
// const { getEventsOrInvitations } = home;

import styles, { colorBackgroundHeader } from "./styles"
import SearchBarApp from '../../../shared/SearchBarApp/SearchBarApp';

class SelectUsersFromList extends React.Component {

    // componentDidMount() {
    //     this.props.getEventsOrInvitations((error) => alert(error.message))
    // }

    onChangeText = () => {

    }

    onClearText = () => {

    }

    renderSearchBar() {
        return (
            <View style={styles.searchView}>
                <SearchBarApp 
                    onChangeText={this.onChangeText}
                    onClearText={this.onClearText}
                    placeholder={"Buscar..."} />
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Aca se van a seleccionar lo usuarios</Text>
            </View>
        );
    }
}

// function mapStateToProps(state, props) {
//     return {
//         isLoading: state.timelineReducer.isLoading,
//         eventsOrInvitations: state.timelineReducer.eventsOrInvitations
//     }
// }

export default connect(null, { })(SelectUsersFromList);