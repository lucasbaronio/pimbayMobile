import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { actions as invitationsActions } from "../../index";
const { getInvitationsIn } = invitationsActions;

import InvitationCard from "../../../shared/Invitation/InvitationCard";
import { invitationCard } from "../../../shared/constants";
import styles from "./styles"

class InvitationsIn extends Component {

    componentDidMount() {
        this.props.getInvitationsIn();
    }

    renderItem = ({item, index}) => {
        return <InvitationCard item={item} cardType={ invitationCard.SENT }/>
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                        ref='listRef'
                        data={this.props.invitationsIn}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        //->onEndReached={() => {
                            //if (!this.onEndReachedCalledDuringMomentum) {
                            //    this.setState({
                            //        start: this.state.start + API_EVENT_SIZE
                            //    }, () => this.props.getEventsOrInvitations(this.state.start, (error) => alert(error.message)))
                            //    this.onEndReachedCalledDuringMomentum = true;
                            //}
                        //}}
                        //-> onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        //-> ListFooterComponent={() => {
                          //  return (
                            //  this.props.isLoadingMore &&
                              //<View style={styles.activityIndicatorBottom}>
                               // <ActivityIndicator size="small" />
                              //</View>
                            //);
                        //}}
                />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        invitationsIn: state.invitationsReducer.invitationsIn
    }
}

export default connect(mapStateToProps, { getInvitationsIn })(InvitationsIn);