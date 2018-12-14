import React from 'react';
import { ScrollView, FlatList, ActivityIndicator, View, Alert } from 'react-native';
import Message from './components/Message';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { getChatMessages, markAsReadAllChatMessages } = chat;

import styles from "./styles";

class MessagesList extends React.Component {

	componentDidMount() {
        const { getChatMessages, markAsReadAllChatMessages, chat } = this.props;
		this.timer = setInterval(() => {
            getChatMessages(chat.id, this.onError);
            markAsReadAllChatMessages(chat.id, this.onError);
        }, 1000);
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }
    
    componentWillUnmount() {
        clearInterval(this.timer);
        this.timer = null;
    }

	keyExtractor = (message, index) => message.id;

	onPressItem = (id) => {

	};

	render() {
        const { isLoadingChatMessages, chatMessages } = this.props;
		// if (isLoadingChatMessages) {
        //     return (
        //         <View style={styles.activityIndicatorCenter}>
        //             <ActivityIndicator animating={true} />
        //         </View>
        //     )
        // } else {
            return (
                <ScrollView 
                    style={styles.container}
                    ref={ref => this.scrollView = ref}
                    onContentSizeChange={(contentWidth, contentHeight) => {
                        this.scrollView.scrollToEnd({animated: true});
                    }}
                >
                    <FlatList
                        inverted
                        data={chatMessages}
                        keyExtractor={this.keyExtractor}
                        renderItem={({item}) => (
                            <Message // key={item.id}
                                message={item}
                                onPressItem={this.onPressItem}
                                direction={this.props.currentUser.id === item.user.id ? "out" : "in"}
                                time={item.time}
                            />
                        )}
                    />
                </ScrollView>
            )
        // }
	}
}

function mapStateToProps(state, props) {
    const { chat } = props;
    return {
        currentUser: state.authReducer.user,
        chatMessages: state.chatReducer.chatMessages
                .filter(message => message.channel_id === chat.id),
        isLoadingChatMessages: state.chatReducer.isLoadingChatMessages,
    }
}

export default connect(mapStateToProps, { getChatMessages, markAsReadAllChatMessages })(MessagesList);