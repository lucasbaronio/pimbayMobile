import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import ChatItem from '../../components/ChatItem';

import { connect } from 'react-redux';

import { actions as chat } from "../../index";
const { getChatList } = chat;

import styles from "./styles";

class Chats extends React.Component {

    componentDidMount() {
        this.props.getChatList(this.onError);
    }

    onError(error) {
        Alert.alert("Oops", error.message);
    }

    renderSeparator = () => (
        <View>
            <Image
                style={styles.dividerImageStyle}
                resizeMode='center'
                source={dividerOpenInvitation} />
        </View>
    );

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    style={styles.listChatUsers}
                    data={this.props.chatList}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                    renderItem={({item}) => (
                        <ChatItem chat={item} />
                    )}
                    ListEmptyComponent={() => (
                        <Text>No hay chats</Text>
                    )}
                />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        chatList: state.chatReducer.chatList,
        isLoadingChatList: state.chatReducer.isLoadingChatList,
    }
}

export default connect(mapStateToProps, { getChatList })(Chats);