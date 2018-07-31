import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Chats from '../../../modules/home/scenes/Chats';

import { Ionicons } from '@expo/vector-icons';

export default (
    <Stack key="ChatsStack" title="Chats" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"Chats"}
                title="Chats"
                component={Chats}
                icon={({ focused }) => (
                    <Ionicons
                        size={28}
                        color={focused ? 'black' : 'grey'}
                        name={`ios-chatbubbles`}
                    />
                )}
            />
        </Modal>
    </Stack>
)