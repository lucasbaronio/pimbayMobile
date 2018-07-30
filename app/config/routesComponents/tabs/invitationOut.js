import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import InvitationsOut from '../../../modules/home/scenes/InvitationsOut';

import { Foundation } from '@expo/vector-icons';

export default (
    <Stack key="InvitationsOutStack" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"InvitationsOut"}
                title="Enviadas"
                component={InvitationsOut}
                icon={({ focused }) => (
                    <Foundation
                        size={28}
                        color={focused ? 'black' : 'grey'}
                        name={`arrows-out`}
                    />
                )}
            />
        </Modal>
    </Stack>
)