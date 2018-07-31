import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Timeline from '../../../modules/timeline/scenes/Timeline';
import SearchTimeline from '../../../modules/timeline/scenes/SearchTimeline';
import CreateInvitation from '../../../modules/timeline/scenes/CreateInvitation';

import { SearchButton, CloseButton } from '../buttons';
import { Entypo } from '@expo/vector-icons';

export default (
    <Stack key="TimelineStack" title="Inicio" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                initial
                key={"Timeline"}
                title="Inicio"
                component={Timeline}
                renderRightButton={<SearchButton goToScreen='SearchTimeline'/>}
                icon={({ focused }) => (
                    <Entypo
                        size={28}
                        color={focused ? 'black' : 'grey'}
                        name={`home`}
                    />
                )}
            />
            <Scene key="SearchTimeline"
                hideNavBar
                hideTabBar
                component={SearchTimeline} title="Buscar"
            />
            <Scene key="CreateInvitation"
                hideTabBar
                renderLeftButton={<CloseButton />}
                component={CreateInvitation} title="Crear Invitación" />
        </Modal>
    </Stack>
)