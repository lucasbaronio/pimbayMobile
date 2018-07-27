import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

import { actions as timeline } from "../../index";
const { getEventsOrInvitations } = timeline;

import { API_EVENT_SIZE } from '../../constants';

import styles from "./styles";
import EventCard from "../../../shared/EventCard";
// import InvitationCard from "../../../shared/InvitationCard";

class Timeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            start: 0,
        }
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getEventsOrInvitations(start, (error) => alert(error.message))
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
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        // bounces={false}
                        data={this.props.eventsOrInvitations}
                        renderItem={this.renderItem}
                        initialNumToRender={5}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => {
                            if (!this.onEndReachedCalledDuringMomentum) {
                                this.setState({
                                    start: this.state.start + API_EVENT_SIZE
                                }, () => this.props.getEventsOrInvitations(this.state.start, (error) => alert(error.message)))
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
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoading,
        isLoadingMore: state.timelineReducer.isLoadingMore,
        eventsOrInvitations: state.timelineReducer.eventsOrInvitations
    }
}

export default connect(mapStateToProps, { getEventsOrInvitations })(Timeline);