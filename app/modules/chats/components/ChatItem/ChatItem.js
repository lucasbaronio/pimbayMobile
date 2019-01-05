import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import { Badge } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';
import { Ionicons } from '@expo/vector-icons';

import { connect } from 'react-redux';

import { IPHONE_SE_HEIGHT } from '../../../../config/phoneSizes';
import styles, { color, windowHeight } from "./styles";

class ChatItem extends React.Component {

    onPress = () => {
        const { chat } = this.props;
        Actions.push("ChatMessenger", { chat });
    };

    render() {
        const { chat } = this.props;
        
        return (
            <TouchableOpacity 
                style={styles.container}
                onPress={this.onPress} >
                {
                    !!(chat.metadata.avatar !== "") &&
                    <View>
                        <Image
                            style={styles.avatar}
                            source={{uri: chat.metadata.avatar}} />
                    </View>
                }
                <View style={styles.chatInfo}>
                        <Text style={{ fontSize: (windowHeight <= IPHONE_SE_HEIGHT) ? 16 : 20, fontWeight: 'bold' }}>
                            {
                                (chat.name.length > 15 && windowHeight <= IPHONE_SE_HEIGHT)
                                ? chat.name.substring(0, 15) + '...'
                                : (chat.name.length > 20)
                                ? chat.name.substring(0, 20) + '...'
                                : chat.name
                            }
                        </Text>
                        {
                            !!chat.last_message &&
                            <View style={{ paddingLeft: 10 }}>
                                <Text style={(windowHeight <= IPHONE_SE_HEIGHT) && { fontSize: 12 }}>
                                    {chat.last_message.user.display_name}
                                </Text>
                                <Text style={[(windowHeight <= IPHONE_SE_HEIGHT) && { fontSize: 12 }, styles.lastMessage]}>
                                    {
                                        (chat.last_message.text.length > 20 && windowHeight <= IPHONE_SE_HEIGHT)
                                        ? chat.last_message.text.substring(0, 20) + '...'
                                        : (chat.last_message.text.length > 30)
                                        ? chat.last_message.text.substring(0, 30) + '...'
                                        : chat.last_message.text
                                    }
                                </Text>
                            </View>
                        }
                </View>
                {
                    !!(chat.unread_message_count > 0) &&
                    <View style={styles.unreadMessageCount}>
                        <Badge
                            textStyle={
                                (windowHeight <= IPHONE_SE_HEIGHT) 
                                ? { fontSize: (chat.unread_message_count > 99) ? 10 : 12 }
                                : null
                            }
                            value={(chat.unread_message_count > 99) ? "+99" : chat.unread_message_count}
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