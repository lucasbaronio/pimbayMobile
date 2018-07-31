import React from 'react';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Profile from '../../../modules/home/scenes/Profile';

import { FontAwesome } from '@expo/vector-icons';

export default (
    <Stack key="ProfileStack" title="Perfil" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"Profile"}
                title="Perfil"
                component={Profile}
                icon={({ focused }) => (
                    <FontAwesome
                        size={28}
                        color={focused ? 'black' : 'grey'}
                        name={`user`}
                    />
                )}
            />
        </Modal>
    </Stack>
)