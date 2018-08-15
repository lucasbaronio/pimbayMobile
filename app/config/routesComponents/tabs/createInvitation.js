import React from 'react';
import { View } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Scene, Stack, Modal, Actions } from 'react-native-router-flux';
import InvitationsOut from '../../../modules/home/scenes/InvitationsOut';

// import { Foundation } from '@expo/vector-icons';
import * as theme from '../../../styles/theme';
const { color } = theme;

export default (
    <Stack key="CreateInvitationStack" title="Crear Invitación" hideNavBar>
        <Modal>
            <Scene
                // hideNavBar
                key={"CreateInvitation"}
                title="Crear Invitación"
                component={InvitationsOut}
                icon={({ focused }) => (
                    <Avatar
                        large
                        rounded
                        icon={{name: 'plus', type: 'material-community'}}
                        overlayContainerStyle={{ backgroundColor: color.orange }}
                        onPress={() => Actions.push("CreateInvitation")}
                        // activeOpacity={0.7}
                        // containerStyle={{marginbottom: 40}}
                    />
                    // <Foundation
                    //     size={28}
                    //     color={focused ? 'black' : 'grey'}
                    //     name={`arrows-out`}
                    // />
                )}
            />
        </Modal>
    </Stack>
)