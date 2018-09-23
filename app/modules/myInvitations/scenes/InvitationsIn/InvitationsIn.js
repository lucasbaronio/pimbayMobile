import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actions as invitationsActions } from "../../index";
const { getInvitationsIn, getInvitationsInRefresh } = invitationsActions;

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
        Actions.push("EventDetail", { props: this.props, item });
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
                    />
                </View>
            );
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

export default connect(mapStateToProps, { getInvitationsIn, getInvitationsInRefresh })(InvitationsIn);