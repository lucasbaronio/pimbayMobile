import React from 'react';
import { Image } from 'react-native';
import { Scene, Stack, Modal, Tabs } from 'react-native-router-flux';
import InvitationsIn from '../../../modules/myInvitations/scenes/InvitationsIn';
import InvitationsOut from '../../../modules/myInvitations/scenes/InvitationsOut';
import inOutFocused from '../../../assets/icons/in-out-selected.png';
import inOut from '../../../assets/icons/in-out.png';
import { fontFamily, statusBarHeight } from '../../../styles/theme';

export default (
    <Stack key="InvitationsInOutStack" title="Invitaciones" hideNavBar>
        <Tabs
            tabBarStyle={{ marginTop: statusBarHeight, backgroundColor: '#ffffff' }}
            activeTintColor='#000000'
            inactiveTintColor='#000000'
            hideNavBar
            indicatorStyle={{
                backgroundColor: '#de5134'
            }}
            key="InvitationsIn"
            showLabel={true}
            lazy={true}
            tabBarPosition='top'
            labelStyle={{ fontFamily: fontFamily.medium }}
            swipeEnabled={true}
            icon={({ focused }) => (
                <Image
                    style={focused ? { width: 32, height: 32 } : { width: 28, height: 28 }}
                    source={focused ? inOutFocused : inOut} />
            )}
        >

            <Stack key="InvitationsIn" title="Recibidas" hideNavBar>
                <Modal>
                    <Scene
                        hideNavBar
                        key={"Recibidas"}
                        title="Recibidas"
                        component={InvitationsIn}
                    />
                </Modal>
            </Stack>

            <Stack key="InvitationsOut" title="Enviadas" hideNavBar>
                <Modal>
                    <Scene
                        hideNavBar
                        key={"Enviadas"}
                        title="Enviadas"
                        component={InvitationsOut}
                    />
                </Modal>
            </Stack>
        </Tabs>
    </Stack>
)