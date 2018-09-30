import React from 'react';
import { Image, Platform } from 'react-native';
import { Scene, Stack, Modal } from 'react-native-router-flux';
import Timeline from '../../../modules/timeline/scenes/Timeline';
import SearchTimeline from '../../../modules/timeline/scenes/SearchTimeline';
import CreateInvitation from '../../../modules/timeline/scenes/CreateInvitation';
import withActionSheetInvitationHOC from '../../../modules/shared/withActionSheetInvitationHOC';
import withNotificationExpoHOC from '../../../modules/timeline/hocs/NotificationExpo/withNotificationExpoHOC';
import SelectUsersFromList from '../../../modules/timeline/scenes/SelectUsersFromList';
import EventDetail from '../../../modules/eventDetail/EventDetail';
import { SearchButton, BackButton, CloseButton } from '../buttons';
import houseFocused from '../../../assets/icons/house-black.png';
import house from '../../../assets/icons/house.png';
import * as theme from '../../../styles/theme';

const { fontFamily, fontSize } = theme;

export default (
    <Modal>
        <Scene
            initial
            key="Timeline"
            title={(Platform.OS === 'ios') ? "Pimbay" : null}
            // component={withActionSheetInvitationHOC(Timeline)}
            component={withNotificationExpoHOC(withActionSheetInvitationHOC(Timeline))}
            titleStyle={{ fontFamily: fontFamily.pimbay, fontSize: fontSize.title1 }}
            renderRightButton={<SearchButton goToScreen='SearchTimeline' />}
            navigationBarTitleImage={(Platform.OS === 'ios') ? null : require('../../../assets/headerImg.png')}
            navigationBarTitleImageStyle={{ marginLeft: 15, height: 25, width: 70 }}
            icon={({ focused }) => (
                <Image
                    style={{ width: 28, height: 28 }}
                    source={focused ? houseFocused : house} />
            )}
        />
        <Scene key="SearchTimeline"
            hideNavBar
            hideTabBar
            component={SearchTimeline} title="Buscar" />
        <Scene key="CreateInvitation"
            hideTabBar
            renderLeftButton={null}
            component={CreateInvitation} title="Invitación" />
        <Scene key="EventDetail"
            hideTabBar
            renderLeftButton={<CloseButton />}
            component={EventDetail} title="Detalle del evento" />
        <Scene key="SelectUsersFromList"
            hideNavBar={false}
            hideTabBar
            modal={false}
            renderLeftButton={<BackButton />}
            component={SelectUsersFromList} title="Seleccionar usuarios" />
    </Modal>
)