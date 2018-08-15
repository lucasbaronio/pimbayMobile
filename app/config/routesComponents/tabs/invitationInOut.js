import React from 'react';
import { Image } from 'react-native';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Invitations from '../../../modules/myInvitations/scenes/Invitations';

// import { Foundation } from '@expo/vector-icons';
import inOutFocused from '../../../assets/icons/in-out-selected.png';
import inOut from '../../../assets/icons/in-out.png';

export default (
    <Stack key="InvitationsInOutStack" title="Invitaciones" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"InvitationsInOut"}
                title="Invitaciones"
                component={Invitations}
                icon={({ focused }) => (
                    <Image 
                        style={ focused ? {width: 32, height: 32} : {width: 28, height: 28}}
                        source={focused ? inOutFocused : inOut} />
                    // <Foundation
                    //     size={28}
                    //     color={focused ? 'black' : 'grey'}
                    //     name={`arrows-in`}
                    // />
                )}
            />
        </Modal>
    </Stack>
)