import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button as ButtonElements, Avatar } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";

import EventCardCreateInvitation from '../../../shared/Event/EventCardCreateInvitation';

import { invitationType } from "../../constants";
import { getDueTime, getCreatedTime } from "../../../shared/utils/date";
import * as api from '../../../timeline/api';

import styles, { fontSize, color } from "./styles";

import TimePassing from '../../../../assets/icons/time-passing.png';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

class InvitationCard extends Component {

    state = {
        isLoadingUser: true,
        user: null,
        isLoadingContextAction: true,
        contextAction: null,
        isLoadingEvent: true,
        event: null
    }

    componentDidMount() {
        const { item } = this.props;

        api.getUserById(item.ownerId, function (success, data, error) {
            if (success) this.setState({ isLoadingUser: false, user: data });
            else if (error) errorCB(error);
        }.bind(this));

        if (item.contextActionId) {
            api.getContextActionById(item.contextActionId, function (success, data, error) {
                if (success) this.setState({ isLoadingContextAction: false, contextAction: data });
                else if (error) errorCB(error);
            }.bind(this));
        }

        if (item.eventId) {
            api.getEventById(item.eventId, function (success, data, error) {
                if (success) this.setState({ isLoadingEvent: false, event: data });
                else if (error) { console.log(error); errorCB(error) };
            }.bind(this));
        }
    }

    onInvitePress = () => {
        this.goToCreateInvitation({ type: invitationType.OPEN, openInvitation: this.props.item });
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    renderDetailsInformation = (item) => {
        if (item.dueDate == null) {
            return this.renderDetailsWithoutDueDate(item);
        } else {
            return this.renderDetailsWithDueDate(item)
        }
    }

    renderDetailsWithDueDate = (item) => {
        return (
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
                <Text style={styles.createdTimeStyle}>{getCreatedTime(item.dateCreated)}</Text>
                <Image
                    style={{ alignSelf: 'flex-start', height: 16, width: 16, marginLeft: 5 }}
                    resizeMode='center'
                    source={TimePassing} />
                <Text style={styles.dueDateStyle}>
                    {getDueTime(item.dueDate)}
                </Text>
            </View>
        );
    }

    renderDetailsWithoutDueDate = (item) => {
        return (
            <View style={{ marginTop: 2, flexDirection: 'row' }}>
                <Text style={styles.createdTimeStyle}>{getCreatedTime(item.dateCreated)}</Text>
            </View>);
    }

    renderUserInfoSection = (item) => {
        if (this.state.isLoadingUser) {
            return (
                <View style={styles.userInfoSectionContainer}>
                    {/* <LoadingIndicator animating={true}/> */}
                </View>
            );
        }

        const userInfo = this.state.user;
        if (item.contextActionId == null) {
            return (
                <View style={styles.userInfoSectionContainer}>
                    <Avatar
                        rounded
                        large
                        source={{ uri: userInfo.avatar }}
                        containerStyle={{ marginTop: 20 }}
                    />
                    <Text style={styles.userNameStyle}>{userInfo.userName}</Text>
                </View>
            );
        } else {
            return (
                <View style={styles.userInfoSectionContainer}>
                    <View style={styles.userInfoSectionContainer}>
                        <Avatar
                            rounded
                            large
                            source={{ uri: userInfo.avatar }}
                            containerStyle={{ marginTop: 20 }}
                        />
                        <Text style={styles.userNameStyle}>{userInfo.userName}</Text>
                    </View>
                    <Avatar
                        small
                        rounded
                        source={
                            (this.state.isLoadingContextAction)
                                ? null
                                : (this.state.contextAction.image)
                                    ? { uri: this.state.contextAction.image }
                                    : null
                        }
                        icon={
                            (this.state.isLoadingContextAction)
                                ? null
                                : (this.state.contextAction.icon && this.state.contextAction.type)
                                    ? { name: this.state.contextAction.icon, type: this.state.contextAction.type }
                                    : null
                        }
                        overlayContainerStyle={styles.avatarBackground}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Text style={styles.avatarTextStyle}>
                        {
                            (this.state.isLoadingContextAction) ? '' : this.state.contextAction.title
                        }
                    </Text>
                </View>
            );
        }
    }

    render() {
        const { item } = this.props;

        return (
            <View>
                <View style={styles.container}>
                    {this.renderUserInfoSection(item)}
                    <View style={styles.invitationInfoSectionContainer}>
                        <View style={{ justifyContent: 'center' }}>
                            {
                                (item.eventId)
                                    ? (!this.state.isLoadingEvent)
                                        ? <EventCardCreateInvitation eventInvitation={this.state.event} />
                                        : null
                                    : null
                            }
                            <View style={styles.descriptionContainerStyle}>
                                <Text style={styles.descriptionStyle}>{item.description}</Text>
                            </View>
                            {this.renderDetailsInformation(item)}
                            <View>
                                <View style={styles.buttonView}>
                                    <ButtonElements
                                        backgroundColor={color.orange}
                                        onPress={this.onInvitePress}
                                        buttonStyle={styles.button}
                                        title='ESTOY'
                                        fontSize={fontSize.text4} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Image
                        style={styles.dividerImageStyle}
                        resizeMode='center'
                        source={DividerOpenInvitation} />
                </View>
            </View>
        )
    }
}

export default connect(null, {})(InvitationCard);