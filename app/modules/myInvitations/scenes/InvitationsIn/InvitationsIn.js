import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';

import { actions as invitationsActions } from "../../index";
const { getInvitationsIn, getInvitationsInRefresh } = invitationsActions;

import ReceivedInvitationCard from "../../../shared/Invitation/ReceivedInvitationCard";
import styles from "./styles";

class InvitationsIn extends Component {

    componentDidMount() {
        this.props.getInvitationsIn();
    }

    renderItem = ({item, index}) => {
        return <ReceivedInvitationCard item={item} />
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            const { invitationsIn, isLoadingHeader, getInvitationsInRefresh } = this.props;
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={invitationsIn}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        // onEndReached={() => {
                        //     if (!this.onEndReachedCalledDuringMomentum) {
                        //        this.setState({
                        //            start: this.state.start + API_EVENT_SIZE
                        //        }, () => this.props.getEventsOrInvitations(this.state.start, (error) => alert(error.message)))
                        //        this.onEndReachedCalledDuringMomentum = true;
                        //     }
                        // }}
                        // onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        // ListFooterComponent={() => {
                        //    return (
                        //      this.props.isLoadingMore &&
                        //       <View style={styles.activityIndicatorBottom}>
                        //        <ActivityIndicator size="small" />
                        //       </View>
                        //     );
                        // }}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoadingHeader}
                                onRefresh={() => getInvitationsInRefresh((error) => alert(error.message))}
                            />
                        }
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoadingIn,
        isLoadingHeader: state.invitationsReducer.isLoadingHeaderIn,
        isLoadingMore: state.timelineReducer.isLoadingMoreIn,
        invitationsIn: state.invitationsReducer.invitationsIn,
    }
}

export default connect(mapStateToProps, { getInvitationsIn, getInvitationsInRefresh })(InvitationsIn);