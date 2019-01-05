import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actions as invitationsActions } from "../../index";
const { getInvitationsIn, getInvitationsInRefresh } = invitationsActions;
import { actions as timelineActions } from "../../../timeline/index";
const { getEventLocation } = timelineActions;

import ReceivedInvitationCard from "../../../shared/Invitation/ReceivedInvitationCard";
import styles from "./styles";

class InvitationsIn extends Component {

    componentDidMount() {
        this.props.getInvitationsIn(this.onError);
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    onPressViewEvent = (item) => {
        const { getEventLocation } = this.props;
        const { place } = item;
        getEventLocation(
            place, 
            (location) => Actions.push("EventDetail", {
                item: { ...item, location }
            }), 
            this.onError
        );
    }

    renderItem = ({ item, index }) => {
        return <ReceivedInvitationCard item={item} onPressViewEvent={this.onPressViewEvent}/>
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
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoadingHeader}
                                onRefresh={() => getInvitationsInRefresh((error) => alert(error.message))}
                            />
                        }
                        ListEmptyComponent={
                            <View style={{marginTop: 100}}>
                                <Text>Usted aún no ha recibido ninguna invitación</Text>
                            </View>
                        }
                    />
                </View>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.invitationsReducer.isLoadingIn,
        isLoadingHeader: state.invitationsReducer.isLoadingHeaderIn,
        isLoadingMore: state.invitationsReducer.isLoadingMoreIn,
        invitationsIn: state.invitationsReducer.invitationsIn,
    }
}

export default connect(mapStateToProps, { 
    getInvitationsIn, 
    getInvitationsInRefresh,
    getEventLocation
})(InvitationsIn);