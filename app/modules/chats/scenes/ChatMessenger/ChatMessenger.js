import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { sendMessage } = chat;

import MessagesList from '../../components/MessagesList';
import MessageInput from '../../components/MessageInput';

import styles from "./styles";

class ChatMessenger extends React.Component {

    onSendMessage = (message) => {
        const { sendMessage, chat } = this.props;
        sendMessage(message, chat.id);
        // console.log("Envio el mensaje: ", message);
    }

    render() {
        return (
            <KeyboardAvoidingView 
                behavior= {(Platform.OS === 'ios')? "padding" : null} 
                keyboardVerticalOffset={Platform.select({ ios: 70, android: 500 })}
                style={styles.container} >
                <MessagesList chat={this.props.chat}/>
                <MessageInput onSendMessage={this.onSendMessage}/>
            </KeyboardAvoidingView>
        );
    }
}

// function mapStateToProps(state, props) {
//     return {
//         chatList: state.chatReducer.chatList,
//         isLoadingChatList: state.chatReducer.isLoadingChatList,
//     }
// }

export default connect(null, { sendMessage })(ChatMessenger);