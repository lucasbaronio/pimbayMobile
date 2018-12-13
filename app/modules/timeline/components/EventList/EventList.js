import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { actions as timeline } from "../../index";
const { getEvents } = timeline;

import EventCardMedium from "../../../shared/Event/EventCardMedium";

import { API_EVENT_SIZE } from '../../constants';
import styles from "./styles";

class EventList extends React.Component {

    state = {
        start: 0,
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getEvents(start, (error) => alert(error.message))
    }

    onPressItem = (item) => {
        this.props.onPressEvent(item);
    };

    onPressViewEvent = (item) => {
        this.props.onPressViewEvent(item);
    };

    renderItem = ({ item, index }) => {
        return (
            <EventCardMedium
                item={item}
                search={false}
                onPressItem={this.onPressItem}
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
            return (
                <View style={styles.container}>
                    <Text style={styles.title}>
                        Eventos de tu interés
                    </Text>
                    <FlatList
                        horizontal
                        data={this.props.events}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => {
                            if (!this.onEndReachedCalledDuringMomentum) {
                                this.setState({
                                    start: this.state.start + API_EVENT_SIZE
                                }, () => this.props.getEvents(this.state.start, (error) => alert(error.message)))
                                this.onEndReachedCalledDuringMomentum = true;
                            }
                        }}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        ListFooterComponent={() => {
                            return (
                                this.props.isLoadingMore &&
                                <View style={styles.activityIndicatorBottom}>
                                    <ActivityIndicator size="small" />
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
        isLoading: state.timelineReducer.isLoadingEvents,
        isLoadingMore: state.timelineReducer.isLoadingMoreEvents,
        events: state.timelineReducer.events
    }
}

export default connect(mapStateToProps, { getEvents })(EventList);