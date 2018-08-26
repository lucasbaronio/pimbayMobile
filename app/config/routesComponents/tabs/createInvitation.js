import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';

import { CreateInvitationButton } from '../buttons';

export default (
    <Stack key="CreateSimpleInvitationStack" title="Crear Invitación" hideNavBar>
        <Modal>
            <Scene
                key={"CreateSimpleInvitation"}
                title="Crear Invitación"
                component={React.Component}
                icon={() => <CreateInvitationButton />}
            />
        </Modal>
    </Stack>
)