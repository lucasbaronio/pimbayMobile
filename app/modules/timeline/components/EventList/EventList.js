import React from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
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
        this.props.onPressContextAction(item);
    };

    renderItem = ({item, index}) => {
        return (
            <EventCardMedium 
                item={item}
                onPressItem={this.onPressItem} />
        )
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return(
                <View style={styles.container}>
                    <FlatList
                        horizontal
                        data={this.props.events}
                        showsHorizontalScrollIndicator={false}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
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