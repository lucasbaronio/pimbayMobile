import React from 'react';
import { Image } from 'react-native';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Profile from '../../../modules/home/scenes/Profile';

import userFocused from '../../../assets/icons/user-black.png';
import user from '../../../assets/icons/user.png';

export default (
    <Stack key="ProfileStack" title="Perfil" hideNavBar>
        <Modal>
            <Scene
                key={"Profile"}
                title="Perfil"
                component={Profile}
                icon={({ focused }) => (
                    <Image
                        style={{ width: 28, height: 28 }}
                        source={focused ? userFocused : user} />
                )}
            />
        </Modal>
    </Stack>
)