import React from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';

import { connect } from 'react-redux';
import { actions as timeline } from "../../index";
const { getInvitations, getInvitationsRefresh } = timeline;

import { API_INVITATION_SIZE } from '../../constants';
import { pimbayType, contextActionSize } from '../../../shared/constants';

import styles from "./styles";
import ContextActionList from "../../components/ContextActionList";
import EventList from "../../components/EventList";
import InvitationCard from "../../../shared/Invitation/InvitationCard";
import { invitationCard } from "../../../shared/constants";

class Timeline extends React.Component {
    state = {
        start: 0,
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getInvitations(start, (error) => alert(error.message));
    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                {
                    !!(index === 0) &&
                    <Text style={styles.titleInvitationsSection}>
                        Que estás para hacer hoy?
                    </Text>
                }
                <InvitationCard item={item} cardType={invitationCard.TIMELINE} />
            </View>
        )
    }

    onPressContextAction = (item) => {
        this.props.showActionSheet({
            actionSheetPimbayType: pimbayType.CONTEXT_ACTION,
            actionSheetItem: item 
        });
    }

    onPressEvent = (item) => {
        this.props.showActionSheet({
            actionSheetPimbayType: pimbayType.EVENT,
            actionSheetItem: item 
        });
    }

    renderHeader = () => {
        return (
            <View>
                <ContextActionList
                    size={contextActionSize.MEDIUM}
                    selectable={false}
                    onPressContextAction={this.onPressContextAction} />
                <EventList onPressEvent={this.onPressEvent} />
            </View>
        )
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
                    <FlatList
                        ref='listRef'
                        data={this.props.invitations}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => {
                            if (!this.onEndReachedCalledDuringMomentum) {
                                this.setState({
                                    start: this.state.start + API_INVITATION_SIZE
                                }, () => this.props.getInvitations(this.state.start, (error) => alert(error.message)))
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
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isLoadingHeader}
                                onRefresh={() => this.props.getInvitationsRefresh((error) => alert(error.message))}
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
        isLoading: state.timelineReducer.isLoading,
        isLoadingHeader: state.timelineReducer.isLoadingHeader,
        isLoadingMore: state.timelineReducer.isLoadingMore,
        invitations: state.timelineReducer.invitations
    }
}

export default connect(mapStateToProps, { getInvitations, getInvitationsRefresh })(Timeline);