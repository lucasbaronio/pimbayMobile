import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { signOut } = chat;

import styles, { color } from "./styles";

class ChatItem extends React.Component {

    onPress = () => {

        // this.props.handleOnClick();
        // this.props.navigation.navigate('DetailScreen', {
        //     username: this.props.user.username,
        //     theme: this.props.theme
        // });
    };

    render() {
        const { chat } = this.props;
        
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={this.onPress} >
                <View>
                    <Image
                        style={styles.avatar}
                        source={{uri: chat.metadata.avatar}} />
                </View>
                <View style={styles.chatInfo}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                            {chat.name}
                        </Text>
                        {
                            !!chat.last_message &&
                            <View style={{ paddingLeft: 10 }}>
                                <Text>
                                    {chat.last_message.user.display_name}
                                </Text>
                                <Text style={styles.lastMessage}>
                                    {chat.last_message.text}
                                </Text>
                            </View>
                        }
                </View>
                {
                    !!(chat.unread_message_count > 0) &&
                    <View style={styles.unreadMessageCount}>
                        <Badge
                            value={chat.unread_message_count}
                            containerStyle={{ backgroundColor: color.orange }} />
                    </View>
                }
                <View style={styles.arrowForward}>
                    <Ionicons
                        name='ios-arrow-forward'
                        color={color.orange} 
                        size={26} />
                </View>
            </TouchableOpacity>
        );
    }
}

export default connect(null, {  })(ChatItem);