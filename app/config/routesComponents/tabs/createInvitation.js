import React from 'react';
import { View, Platform } from 'react-native';
import { Avatar } from 'react-native-elements';
import { Scene, Stack, Modal, Actions } from 'react-native-router-flux';
import InvitationsOut from '../../../modules/home/scenes/InvitationsOut';

// import { Foundation } from '@expo/vector-icons';
import * as theme from '../../../styles/theme';
const { color } = theme;
import { pimbayType } from '../../../modules/shared/constants';

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
                        // large={Platform.OS === 'ios'}
                        // medium={Platform.OS === 'android'}
                        height={Platform.OS === 'ios' ? 65 : 45}
                        width={Platform.OS === 'ios' ? 55 : 45}
                        rounded
                        icon={{name: 'plus', type: 'material-community'}}
                        overlayContainerStyle={{ 
                            backgroundColor: color.orange, 
                            marginBottom: Platform.OS === 'ios' ? 10 : 0 
                        }}
                        onPress={() => Actions.push("CreateInvitation", { type: pimbayType.SIMPLE })}
                        activeOpacity={0.8}
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