import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { actions as eventDetailActions } from "../index";
const { getEvent } = eventDetailActions;

import { connect } from 'react-redux';
import styles from './styles';


class EventDetail extends Component {

    state = {
        //isLoadingEvent: false,
        //event: null
    }

    componentWillMount() {
        const { item } = this.props;
        console.log("acaaaa");
        console.log(this.props);
        //this.props.getEvent(eventId);
    }

    renderEventInvitation = () => {
        //const { eventInvitation } = this.state;
        return (
            <View style={styles.eventContainer}>
                <EventCardCreateInvitation eventInvitation={eventInvitation} />
            </View>
        );
    }

    render() {
        //const { type } = this.props;
        return (
            <View >
                <Text>Event detail</Text>
            </View>
        );
    }
}
function mapStateToProps(state, props) {
    return {
        isLoadingEvent: state.eventDetailReducer.isLoadingEvent,
        event: state.eventDetailReducer.event
    }
}

export default connect(mapStateToProps, { getEvent })(EventDetail);