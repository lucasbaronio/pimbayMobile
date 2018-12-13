import React from 'react';
import { View, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

import { connect } from 'react-redux';

import { actions as timeline } from "../../index"
const { searchUsersByUserNameOrFullName, searchEvents } = timeline;

import styles, { colorBackgroundHeader } from "./styles"
import SearchBarApp from '../../../shared/SearchBarApp/SearchBarApp';

class SearchTimeline extends React.Component {

    onChangeText = (value) => {
        const { searchUsersByUserNameOrFullName, searchEvents } = this.props;
        switch (Actions.currentScene) {
            case '_SearchTimelineUser': {
                searchUsersByUserNameOrFullName(value, this.onError);
                break;
            }
            case '_SearchTimelineEvent': {
                searchEvents(value, this.onError);
                break;
            }
        }
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
            <SafeAreaView style={{backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <Header
                        leftComponent={{ text: '' }}
                        centerComponent={this.renderSearchBar()}
                        rightComponent={this.renderCancelButton()}
                        // innerContainerStyles={styles.header}
                        backgroundColor={colorBackgroundHeader}
                    />
                </View>
            </SafeAreaView>
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
export default connect(null, { searchUsersByUserNameOrFullName, searchEvents })(SearchTimeline);