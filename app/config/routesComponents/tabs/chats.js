import React from 'react';
import { Image } from 'react-native';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Chats from '../../../modules/home/scenes/Chats';

// import { Ionicons } from '@expo/vector-icons';
import chatFocused from '../../../assets/icons/chat-black.png';
import chat from '../../../assets/icons/chat.png';

export default (
    <Stack key="ChatsStack" title="Chats" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"Chats"}
                title="Chats"
                component={Chats}
                icon={({ focused }) => (
                    <Image 
                        style={{width: 28, height: 28}}
                        source={focused ? chatFocused : chat} />
                    // <Ionicons
                    //     size={28}
                    //     color={focused ? 'black' : 'grey'}
                    //     name={`ios-chatbubbles`}
                    // />
                )}
            />
        </Modal>
    </Stack>
)