import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { Button as ButtonElements, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles, { fontSize, color } from "./styles";
// Comente este import y agregue el de abajo, ahi ya tenemos todas las constantes de la logica de negocio
// import { TIMELINE_INVITATION_CARD, RECEIVED_INVITATION_CARD, SENT_INVITATION_CARD } from "./constants";
// Se usa invitationCard.TIMELINE o invitationCard.SENT ...
import { invitationCard, invitationType } from "../../constants";
import { getDueTime, getCreatedTime } from "../../../shared/utils/date";
import TimePassing from '../../../../assets/icons/time-passing.png';
import DividerOpenInvitation from '../../../../assets/dividerOpenInvitation.png';

// Borrar luego de que obtengamos la info de backend
import { getContextAction, getUserInfo } from '../backendInfoTmp';

class InvitationCard extends Component {

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
                    // source={require('../../../../assets/icons/time-passing.png')} />
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
        const userInfo = getUserInfo(item.ownerId);
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
        const { cardType } = this.props;

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
                        // source={require('../../../../assets/dividerOpenInvitation.png')} />
                        source={DividerOpenInvitation} />
                </View>
            </View>
        )
    }
}

export default connect(null, {})(InvitationCard);