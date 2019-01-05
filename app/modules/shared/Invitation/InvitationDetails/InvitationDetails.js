import React, { Component } from 'react';
import { View, ScrollView, SafeAreaView, Text } from 'react-native';
import { Badge } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import GridView from 'react-native-super-grid';

import ReceivedInvitationCard from '../ReceivedInvitationCard';
import SentInvitationCard from '../SentInvitationCard';
import InvitationCard from '../InvitationCard';
import { invitationType } from '../../../shared/constants';
import AvatarUser from '../../../shared/AvatarUser';

import { actions as invitationsActions } from "../../../myInvitations/index";
const { confirmInvitation } = invitationsActions;
import { actions as profileActions } from "../../../profile/index";
const { getUserData } = profileActions;
import { actions as timelineActions } from "../../../timeline/index";
const { getEventLocation } = timelineActions;

import styles, { color, windowWidth } from "./styles";

class InvitationDetails extends Component {

    state = {
        selected: "CONFIRMED_USERS"
    }

    renderReceivedInvitation = () => {
        const { invitation } = this.props;
        return (
            <ReceivedInvitationCard item={invitation} onPressViewEvent={this.onPressViewEvent}/>
        )
    }

    renderSentInvitation = () => {
        const { invitation } = this.props;
        return (
            <SentInvitationCard item={invitation} onPressViewEvent={this.onPressViewEvent}/>
        )
    }

    renderOpenInvitation = () => {
        const { invitation } = this.props;
        return (
            <InvitationCard item={invitation} onPressViewEvent={this.onPressViewEvent}/>
        )
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

    renderBadgeHeader = () => {
        const { selected } = this.state;
        return (
            <View style={styles.badgeView}>
                {
                    this.renderBadge({ 
                        selected: selected === "CONFIRMED_USERS", 
                        onPress: this.onPressConfirmedUsers, 
                        value: "Van a asistir"
                    })
                }
                {
                    this.renderBadge({ 
                        selected: selected === "REJECTED_USERS", 
                        onPress: this.onPressRejectedUsers, 
                        value: "No van asistir"
                    })
                }
            </View>
        )
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

    onPressConfirmedUsers = () => {
        this.setState({ selected: "CONFIRMED_USERS" });
    }

    onPressRejectedUsers = () => {
        this.setState({ selected: "REJECTED_USERS" });
    }

    renderItem = (item) => {
        return (
            <AvatarUser
                item={item}
                selectable={false}
                onPressButtom={this.onPressUserAvatar}
            />
        )
    }

    onPressUserAvatar = (user) => {
        const { getUserData } = this.props;
        getUserData(user.id, this.onSuccess, this.onError);
    }

    onSuccess(isLoggedUser) {
        Actions.push("ProfileUser", { isNotLoggedUser: !isLoggedUser });
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    render() {
        const { isOpenInvitation, iAmTheOwner, confirmedUsers, rejectedUsers } = this.props;
        const { selected } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView style={styles.invitationView}>
                    {
                        !!isOpenInvitation && !iAmTheOwner
                            ? this.renderOpenInvitation()
                            : !!iAmTheOwner
                                ? this.renderSentInvitation()
                                : this.renderReceivedInvitation()
                    }
                </ScrollView>
                <Text style={styles.title}>Invitados:</Text>
                {this.renderBadgeHeader()}
                <SafeAreaView style={{flex: 1}}>
                    {
                        (selected === "CONFIRMED_USERS") && (confirmedUsers.length === 0)
                            ? <View style={{marginTop: 50, alignItems: "center"}}>
                                <Text>Todavia no hay ningún usuario confirmado.</Text>
                            </View>
                            : (selected === "REJECTED_USERS") && (rejectedUsers.length === 0)
                                ? <View style={{marginTop: 50, alignItems: "center"}}>
                                    <Text>Ningún usuario ha rechazado tu invitación.</Text>
                                </View>
                                : <GridView
                                    itemDimension={windowWidth * 0.2}
                                    items={selected === "CONFIRMED_USERS" ? confirmedUsers : rejectedUsers}
                                    renderItem={this.renderItem}
                                />
                    }
                </SafeAreaView>
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    const { user } = state.authReducer;
    const { invitation } = props;
    return {
        iAmTheOwner: invitation.ownerId === user.id,
        isOpenInvitation: invitation.invitationType === invitationType.OPEN,
        confirmedUsers: state.invitationsReducer.confirmedUsersDetail,
        rejectedUsers: state.invitationsReducer.rejectedUsersDetail
    }
}

export default connect(mapStateToProps, { getUserData, confirmInvitation, getEventLocation })(InvitationDetails);