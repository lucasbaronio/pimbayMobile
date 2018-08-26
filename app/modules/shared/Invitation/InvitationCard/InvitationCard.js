import React, { Component, ActivityIndicator as LoadingIndicator } from 'react';
import { View, Text, Image } from 'react-native';
import { Button as ButtonElements, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize, color } from "./styles";
import { invitationCard, invitationType } from "../../constants";
import { getDueTime, getCreatedTime } from "../../../shared/utils/date";
import TimePassing from '../../../../assets/icons/time-passing.png';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

import * as api from '../../../timeline/api';

// Borrar luego de que obtengamos la info de backend
import { getContextAction, getUserInfo } from '../backendInfoTmp';

class InvitationCard extends Component {

    state = {
        isLoadingUser: true,
        user: null
    }

    componentDidMount() {
        const { item } = this.props;

        api.getUserById(item.ownerId, function (success, data, error) {
            if (success) this.setState({ isLoadingUser: false, user: data });
            else if (error) errorCB(error);        
        }.bind(this));
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
        //const userInfo = getUserInfo(item.ownerId);
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
            const actionContext = getContextAction();
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
                        source={(actionContext.image) ? { uri: actionContext.image } : null}
                        icon={(actionContext.icon && actionContext.type) ? { name: actionContext.icon, type: actionContext.type } : null}
                        overlayContainerStyle={styles.avatarBackground}
                        containerStyle={styles.avatarContainerStyle}
                    />
                    <Text style={styles.avatarTextStyle}>{actionContext.title}</Text>
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