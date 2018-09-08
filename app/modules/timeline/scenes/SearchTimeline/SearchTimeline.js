import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

// import { actions as home } from "../../index"
// const { getEventsOrInvitations } = home;

import styles, { colorBackgroundHeader } from "./styles"
import SearchBarApp from '../../../shared/SearchBarApp/SearchBarApp';

class SearchTimeline extends React.Component {

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

    renderCancelButton() {
        return (
            <View style={styles.buttonView}>
                <TouchableOpacity onPress={Actions.pop}>
                    <Text style={styles.buttonText}>
                        Cancelar
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={{ text: '' }}
                    centerComponent={this.renderSearchBar()}
                    rightComponent={this.renderCancelButton()}
                    // innerContainerStyles={styles.header}
                    backgroundColor={colorBackgroundHeader}
                />
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

// export default connect(mapStateToProps, { getEventsOrInvitations })(SearchTimeline);
export default connect(null, {})(SearchTimeline);