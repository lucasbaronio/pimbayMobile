import React, { Component } from 'react';
import { View, FlatList, ActivityIndicator, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { pimbayType } from '../../../../../shared/constants';
import EventCardMedium from '../../../../../shared/Event/EventCardMedium';
import { actions as profileActions } from "../../../../../profile/index";
const { getUserData } = profileActions;
import { actions as timelineActions } from "../../../../../timeline/index";
const { getEventLocation } = timelineActions;

import styles from "./styles";

class SearchTimelineEvent extends Component {

    onPressEvent = (item) => {
        this.props.showActionSheet({
            actionSheetPimbayType: pimbayType.EVENT,
            actionSheetItem: item
        });
    }

    onPressViewEvent = (item) => {
        const { getEventLocation } = this.props;
        const { place } = item;
        getEventLocation(
            place, 
            (location) => Actions.push("EventDetail", { 
                onPressCreateInvitation: this.onPressEvent, 
                item: { ...item, location }
            }), 
            this.onError
        );
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    renderItem = ({ item, index }) => {
        return (
            <EventCardMedium
                item={item}
                search={true}
                onPressItem={this.onPressEvent}
                onPressViewEvent={this.onPressViewEvent} />
        )
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            const { searchedEvents, emptySearchInput } = this.props;
            return (
                <View style={styles.container}>
                    <FlatList
                        data={searchedEvents}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() => {
                            return (
                                <View style={{ alignItems: 'center' }}>
                                {
                                    emptySearchInput
                                        ? <Text style={{ paddingTop: 100 }}>Realice una búsqueda...</Text>
                                        : <Text style={{ paddingTop: 100 }}>No se encontraron eventos...</Text>
                                }
                                </View>
                            );
                        }}
                    />
                </View>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        searchedEvents: state.timelineReducer.searchedEvents,
        isLoading: state.timelineReducer.isLoadingSearchedEvents,
        emptySearchInput: state.timelineReducer.emptySearchInput,
    }
}

export default connect(mapStateToProps, { getUserData, getEventLocation })(SearchTimelineEvent);