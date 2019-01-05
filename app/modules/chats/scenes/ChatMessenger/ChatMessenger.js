import React from 'react';
import { KeyboardAvoidingView, Platform, View, TextInput, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { actions as chat } from "../../index";
const { sendMessage, changeChatName } = chat;

import MessagesList from '../../components/MessagesList';
import MessageInput from '../../components/MessageInput';
import tick from '../../../../assets/icons/tick.png';
import { CHAT_GROUP_DEFAULT_NAME } from '../../constants';
import { getBottomSpace } from 'react-native-iphone-x-helper';

import styles, { color } from "./styles";

class ChatMessenger extends React.Component {

    state = {
        chatName: null,
        changeNameSuccess: false
    }

    onSendMessage = (message) => {
        const { sendMessage, chat } = this.props;
        if (message.trim() !== "") sendMessage({ message, chat });
    }

    onSuccess = () => {
        Actions.refresh({
            title: this.state.chatName
        });
        this.setState({
            changeNameSuccess: true
        })
    }

    onError = (error) => {
        Alert.alert("Oops", error.message)
    }

    render() {
        const { chat, changeChatName } = this.props;
        const { changeNameSuccess } = this.state;

        return (
            <KeyboardAvoidingView 
                behavior= {(Platform.OS === 'ios')? "padding" : null} 
                keyboardVerticalOffset={Platform.select({ ios: 63 + getBottomSpace(), android: 500 })}
                style={styles.container} >
                <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                    {
                        chat.name === CHAT_GROUP_DEFAULT_NAME && !changeNameSuccess &&
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
                                onPress={() => { 
                                    changeChatName({ 
                                        name: this.state.chatName, 
                                        chatId: chat.id
                                    }, this.onSuccess, this.onError) }} >
                                    <Image source={tick} style={{ height: 30, width: 30 }} />
                            </TouchableOpacity>
                        </View>
                    }
                    <MessagesList chat={chat}/>
                    <MessageInput onSendMessage={this.onSendMessage}/>
                </SafeAreaView>
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