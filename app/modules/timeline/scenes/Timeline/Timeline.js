import React from 'react';
import { View, FlatList, ActivityIndicator, TextInput } from 'react-native';
import { Divider } from 'react-native-elements';

import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";

import { actions as timeline } from "../../index";
const { getEventsOrInvitations } = timeline;

import { API_EVENT_SIZE } from '../../constants';

import styles, { color } from "./styles";
import ContextActionList from "../../components/ContextActionList";
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

    onPressContextAction = (item) => {
        this.goToCreateInvitation({contextAction: item});
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    renderHeader = () => {
        return (
            <ContextActionList 
                timeline={true}
                onPressContextAction={this.onPressContextAction}/>
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
            return (
                <View style={styles.container}>
                    <TextInput
                        style={styles.createInvitationTextInput}
                        onFocus={this.goToCreateInvitation}
                        placeholder={"Que estas para hacer hoy?"}
                        placeholderTextColor={color.black}
                    />
                    <Divider style={{ backgroundColor: color.black }} />
                    <FlatList
                        ref='listRef'
                        data={this.props.eventsOrInvitations}
                        renderItem={this.renderItem}
                        // initialNumToRender={5}
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
                        ListHeaderComponent={this.renderHeader}
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