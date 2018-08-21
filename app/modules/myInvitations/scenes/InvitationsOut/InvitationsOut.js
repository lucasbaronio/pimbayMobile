import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { actions as invitationsActions } from "../../index";
const { getInvitationsOut } = invitationsActions;

import SentInvitationCard from "../../../shared/InvitationCard/SentInvitationCard";
import styles from "./styles";

class InvitationsOut extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getInvitationsOut();
    }

    renderItem = ({item, index}) => {
        return <SentInvitationCard item={item} />
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                        ref='listRef'
                        data={this.props.invitationsOut}
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
        invitationsOut: state.invitationsReducer.invitationsOut
    }
}

export default connect(mapStateToProps, { getInvitationsOut })(InvitationsOut);