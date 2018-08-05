import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Invitations from '../../../modules/myInvitations/scenes/Invitations';

import { Foundation } from '@expo/vector-icons';

export default (
    <Stack key="InvitationsInStack" title="Recibidas" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"InvitationsIn"}
                title="Recibidas"
                component={Invitations}
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