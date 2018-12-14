import React from 'react';
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { Badge } from 'react-native-elements';
import { actions as timeline } from "../../index";
const { getInvitations, getInvitationsRefresh } = timeline;
import { actions as auth } from "../../../auth/index";
const { userLoggedInToCache } = auth;

import { API_INVITATION_SIZE } from '../../constants';
import { pimbayType, contextActionSize } from '../../../shared/constants';

import styles, { color } from "./styles";
import ContextActionList from "../../components/ContextActionList";
import EventList from "../../components/EventList";
import InvitationCard from "../../../shared/Invitation/InvitationCard";
import { invitationCard } from "../../../shared/constants";

class Timeline extends React.Component {
    state = {
        start: 0,
        selectedAll: true,
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getInvitations(start, (error) => alert(error.message));
    }

    renderBadge = ({selected, onPress, value}) => {
        return (
            <Badge
                containerStyle={[
                    { backgroundColor: selected ? color.orange : color.white },
                    styles.badgeContainer
                ]}
                textStyle={[
                    { color: selected ? color.white : color.black }, 
                    styles.badgeText
                ]}
                value={value}
                onPress={onPress} />
        )
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={{marginTop: 10}}>
                {
                    !!(index === 0) &&
                    this.renderHeaderInvitations()
                }
                <InvitationCard item={item} cardType={invitationCard.TIMELINE} onPressViewEvent={this.onPressViewEvent}/>
            </View>
        )
    }

    renderHeaderInvitations = () => {
        const { selectedAll } = this.state;
        return (
            <View>
                <Text style={styles.titleInvitationsSection}>
                    ¿Qué estas para hacer hoy?
                </Text>
                <View style={styles.badgeView}>
                    {
                        this.renderBadge({ 
                            selected: selectedAll, 
                            onPress: this.onPressAllInvitations, 
                            value: "Todas"
                        })
                    }
                    {
                        this.renderBadge({ 
                            selected: !selectedAll, 
                            onPress: this.onPressFavouriteInvitations, 
                            value: "Invitaciones favoritas"
                        })
                    }
                </View>
            </View>
        )
    }

    onPressAllInvitations = () => {
        this.setState({ selectedAll: true });
    }

    onPressFavouriteInvitations = () => {
        this.setState({ selectedAll: false });
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

    onPressViewEvent = (item) => {
        Actions.push("EventDetail", { onPressCreateInvitation: this.onPressEvent, item });
    }

    renderHeader = () => {
        return (
            <View>
                <ContextActionList
                    size={contextActionSize.MEDIUM}
                    selectable={false}
                    onPressContextAction={this.onPressContextAction} />
                <EventList onPressEvent={this.onPressEvent} onPressViewEvent={this.onPressViewEvent} />
            </View>
        )
    }

    render() {
        const { invitations, invitationsFromFavouriteUsers } = this.props;
        const { selectedAll } = this.state;
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
                        data={selectedAll ? invitations : invitationsFromFavouriteUsers}
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
                        ListEmptyComponent={
                            <View style={{marginTop: 10}}>
                                {this.renderHeaderInvitations()}
                                <View style={{alignItems: 'center'}}>
                                {
                                    selectedAll 
                                    ? <Text style={{ marginVertical: 20}}>
                                        Actualmente nadie ha creado invitaciones abiertas
                                    </Text>
                                    : <Text style={{ marginVertical: 20}}>
                                        No hay invitaciones abiertas de tus usuarios favoritos
                                    </Text>
                                }
                                </View>
                            </View>
                        }
                        ListHeaderComponent={this.renderHeader}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isLoadingHeader}
                                onRefresh={() => {
                                    this.setState({
                                        start: 0
                                    }, () => {
                                        this.props.userLoggedInToCache(() => 
                                            this.props.getInvitationsRefresh((error) => alert(error.message))
                                        )
                                    })
                                }}
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
        invitations: state.timelineReducer.invitations,
        invitationsFromFavouriteUsers: state.timelineReducer.invitationsFromFavouriteUsers,
    }
}

export default connect(mapStateToProps, { 
    getInvitations, 
    getInvitationsRefresh,
    userLoggedInToCache 
})(Timeline);