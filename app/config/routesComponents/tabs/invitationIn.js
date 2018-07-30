import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import InvitationsIn from '../../../modules/home/scenes/InvitationsIn';

import { Foundation } from '@expo/vector-icons';

export default (
    <Stack key="InvitationsInStack" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"InvitationsIn"}
                title="Recibidas"
                component={InvitationsIn}
                icon={({ focused }) => (
                    <Foundation
                        size={28}
                        color={focused ? 'black' : 'grey'}
                        name={`arrows-in`}
                    />
                )}
            />
        </Modal>
    </Stack>
)