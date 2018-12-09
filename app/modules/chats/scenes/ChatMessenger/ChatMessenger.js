import React from 'react';
import { KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image } from 'react-native';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { sendMessage, changeChatName } = chat;

import MessagesList from '../../components/MessagesList';
import MessageInput from '../../components/MessageInput';
import tick from '../../../../assets/icons/tick.png';
import { CHAT_GROUP_DEFAULT_NAME } from '../../constants';

import styles, { color } from "./styles";

class ChatMessenger extends React.Component {

    state = {
        chatName: null,
    }

    onSendMessage = (message) => {
        const { sendMessage, chat } = this.props;
        sendMessage({ message, chat });
    }

    render() {
        const { chat, changeChatName } = this.props;

        return (
            <KeyboardAvoidingView 
                behavior= {(Platform.OS === 'ios')? "padding" : null} 
                keyboardVerticalOffset={Platform.select({ ios: 70, android: 500 })}
                style={styles.container} >
                {
                    chat.name === CHAT_GROUP_DEFAULT_NAME &&
                    <View style={styles.changeChatNameView}>
                        <TextInput
                            placeholder="Asigne un nombre al grupo"
                            placeholderTextColor={color.grey}
                            autoCorrect={false}
                            style={styles.changeChatNameInput}
                            onChangeText={(text) => { this.setState({
                                chatName: text,
                            }) }} />
                        <TouchableOpacity 
                            style={styles.confirmButton}
                            onPress={() => { changeChatName(this.state.chatName, chat.id) }} >
                                <Image source={tick} style={{ height: 30, width: 30 }} />
                        </TouchableOpacity>
                    </View>
                }
                
                <MessagesList chat={chat}/>
                <MessageInput onSendMessage={this.onSendMessage}/>
            </KeyboardAvoidingView>
        );
    }
}

// function mapStateToProps(state, props) {
//     const { chat } = this.props;
//     console.log(chat);
//     return {
//         chatFromReducer: state.chatReducer.chatList.filter(x => x.id === chat.id)[0]
//     }
// }

export default connect(null, { sendMessage, changeChatName })(ChatMessenger);