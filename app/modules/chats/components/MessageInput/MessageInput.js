import React from 'react';
import { View, TouchableOpacity, TextInput } from 'react-native';
import { Icon } from 'react-native-elements';
import { Entypo } from '@expo/vector-icons';

import { connect } from 'react-redux';
import styles, { color } from "./styles";

class MessageInput extends React.Component {

    state = {
        message: ""
    }

    render() {

		return (
            <View 
                style={styles.container}
            >
                <View style={styles.cameraView}>
                    <TouchableOpacity
                        style={styles.cameraButton}
                        onPress={() => { }} >
                        <Entypo 
                            name="camera" 
                            size={26}
                            color={color.white} />
                    </TouchableOpacity>
                </View>
                <View style={styles.messageInputView}>
                    <TextInput
                        placeholder="Escribe un mensaje"
                        placeholderTextColor={color.grey}
                        autoCorrect={true}
                        underlineColorAndroid={color.transparent}
                        style={styles.messageInput}
                        multiline = {true}
                        // disabled={(this.props.activeChat.id === "")}
                        onChangeText={(text) => { this.setState({
                            message: text,
                        }); }}
                        value={this.state.message}
                    />
                </View>
                <View style={styles.sendMessageView}>
                    <TouchableOpacity
                        style={styles.sendMessageButton}
                        onPress={() => { 
                            this.setState({ message: "" });
                            this.props.onSendMessage(this.state.message);
                        }} >
                        <Icon
                            name='send'
                            color={color.white} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default connect(null, {  })(MessageInput);