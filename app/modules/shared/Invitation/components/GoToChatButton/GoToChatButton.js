import React, { Component } from 'react';
import { connect } from "react-redux";
import { Image, TouchableOpacity, Alert, Text } from 'react-native';
import rightArrow from '../../../../../assets/icons/right-arrow.png';
import styles from "./styles";
import { Actions } from 'react-native-router-flux';

import { actions as chatActions } from "../../../../chats/index";
const { getChatDetail } = chatActions;
import { actions as timelineActions } from "../../../../timeline/index";
const { getInvitationsRefresh } = timelineActions;

class GoToChatButton extends Component {

    onPressChat = () => {
        const { chatId, getChatDetail } = this.props;
        getChatDetail(chatId, ({ group_channel }) => {
            Actions.push("ChatMessenger", { chat: group_channel });
        }, this.onError);
    }

    onError(error) {
        const { getInvitationsRefresh } = this.props;
        getInvitationsRefresh((error) => Alert.alert("Oops", error.message));
        Alert.alert("Invitación finalizada", "La invitación se ha finalizado");
    }

    render() {
        const { buttonViewChatStyle } = this.props;
        return (
            <TouchableOpacity 
                style={buttonViewChatStyle}
                onPress={() => { this.onPressChat() }}>
                    <Text style={styles.buttonText}>IR AL CHAT</Text>
                    <Image source={rightArrow} style={styles.buttonImage} />
            </TouchableOpacity>
        )
    }
}

export default connect(null, { getChatDetail, getInvitationsRefresh })(GoToChatButton);