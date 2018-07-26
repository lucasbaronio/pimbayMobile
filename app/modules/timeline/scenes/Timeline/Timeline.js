import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

// import eventsOrInvitations from './events.json';

import { actions as timeline } from "../../index";
const { getEventsOrInvitations } = timeline;

import styles from "./styles";
import EventCard from "../../../shared/EventCard";
// import InvitationCard from "../../../shared/InvitationCard";

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
            size: 10,
        }
    }

    componentDidMount() {
        const { start, size } = this.state;
        this.props.getEventsOrInvitations(start, size, (error) => alert(error.message))
    }

    renderItem = ({item, index}) => {
        return (item.type === "EVENT")
        ? <EventCard item={item}/>
        // : <InvitationCard item={item}/>
        : null
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicator}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.eventsOrInvitations}
                        // data={eventsOrInvitations}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}/>
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoading,
        eventsOrInvitations: state.timelineReducer.eventsOrInvitations
    }
}

export default connect(mapStateToProps, { getEventsOrInvitations })(Timeline);
// export default connect(null, { })(Timeline);