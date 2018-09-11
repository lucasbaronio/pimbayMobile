import React, { Component } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actions as invitationsActions } from "../../index";
const { getInvitationsOut, getInvitationsOutRefresh } = invitationsActions;

import SentInvitationCard from "../../../shared/Invitation/SentInvitationCard";
import styles from "./styles";

class InvitationsOut extends Component {

    componentDidMount() {
        this.props.getInvitationsOut();
    }

    onPressViewEvent = (item) => {
        Actions.push("EventDetail", { props: this.props, item });
    }

    renderItem = ({ item, index }) => {
        return <SentInvitationCard item={item} onPressViewEvent={this.onPressViewEvent}/>
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            const { invitationsOut, isLoadingHeader, getInvitationsOutRefresh } = this.props;
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={invitationsOut}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        refreshControl={
                            <RefreshControl
                                refreshing={isLoadingHeader}
                                onRefresh={() => getInvitationsOutRefresh((error) => alert(error.message))}
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
        isLoading: state.invitationsReducer.isLoadingOut,
        isLoadingHeader: state.invitationsReducer.isLoadingHeaderOut,
        isLoadingMore: state.invitationsReducer.isLoadingMoreOut,
        invitationsOut: state.invitationsReducer.invitationsOut
    }
}

export default connect(mapStateToProps, { getInvitationsOut, getInvitationsOutRefresh })(InvitationsOut);