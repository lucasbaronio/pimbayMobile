import React from 'react';
import { Image, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, Stack, Modal, Tabs, Actions } from 'react-native-router-flux';

import Splash from '../components/Splash/Splash';

// Auth
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';

// Timeline
import Timeline from '../modules/timeline/scenes/Timeline';
import SearchTimeline from '../modules/timeline/scenes/SearchTimeline';
import CreateInvitation from '../modules/timeline/scenes/CreateInvitation';
import withActionSheetInvitationHOC from '../modules/shared/withActionSheetInvitationHOC';
import withNotificationExpoHOC from '../modules/timeline/hocs/NotificationExpo/withNotificationExpoHOC';
import SelectUsersFromList from '../modules/timeline/scenes/SelectUsersFromList';
import EventDetail from '../modules/eventDetail/EventDetail';
import { SearchButton, BackButton, CloseButton, CreateInvitationButton } from './routesComponents/buttons';
import houseFocused from '../assets/icons/house-black.png';
import house from '../assets/icons/house.png';

// Chats
import Chats from '../modules/chats/scenes/Chats';
import chatFocused from '../assets/icons/chat-black.png';
import chat from '../assets/icons/chat.png';

// InvitationInOut
import InvitationsIn from '../modules/myInvitations/scenes/InvitationsIn';
import InvitationsOut from '../modules/myInvitations/scenes/InvitationsOut';
import inOutFocused from '../assets/icons/in-out-selected.png';
import inOut from '../assets/icons/in-out.png';

// Profile
import Profile from '../modules/home/scenes/Profile';
import userFocused from '../assets/icons/user-black.png';
import user from '../assets/icons/user.png';

//Shared
import { invitationType as invType } from '../modules/shared/constants';

import { CloseButtonOnPress } from './routesComponents/buttons';

import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";
import { actions as createInvitation } from "../modules/timeline/index";
const { cleanCreateInvitation } = createInvitation;

import { color, navTitleStyle, fontFamily, fontSize, statusBarHeight } from "../styles/theme";

class RouterApp extends React.Component {
// export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            // exist: false //indicates if user exist in realtime database
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({ isReady: true, /*exist, */isLoggedIn});
        }));
    }

    render() {
        if (!this.state.isReady)
            return <Splash />

        return (
            <Router>
                <Modal>
                    <Scene key="root" hideNavBar
                        navigationBarStyle={{ backgroundColor: "#fff" }}
                        titleStyle={navTitleStyle}
                        backButtonTintColor={color.black}>
                        <Stack key="Auth" initial={!this.state.isLoggedIn}>
                            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar />
                            <Scene key="Register" component={Register} title="Crear cuenta" back />
                            <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false} />
                            <Scene key="Login" component={Login} title="Iniciar Sesión" />
                            <Scene key="ForgotPassword" component={ForgotPassword} title="Olvidé mi contraseña" />
                        </Stack>
                        <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Scene
                                hideNavBar
                                key="Home"
                                tabs
                                showLabel={false}
                                lazy={true}
                                tabBarPosition='bottom'
                                swipeEnabled={false}
                            >
                                <Scene
                                    initial
                                    key="Timeline"
                                    title={(Platform.OS === 'ios') ? "Pimbay" : null}
                                    component={withNotificationExpoHOC(withActionSheetInvitationHOC(Timeline))}
                                    titleStyle={{ fontFamily: fontFamily.pimbay, fontSize: fontSize.title1 }}
                                    renderRightButton={<SearchButton goToScreen='SearchTimeline' />}
                                    navigationBarTitleImage={(Platform.OS === 'ios') ? null : require('../assets/headerImg.png')}
                                    navigationBarTitleImageStyle={{ marginLeft: 15, height: 25, width: 70 }}
                                    icon={({ focused }) => (
                                        <Image
                                            style={{ width: 28, height: 28 }}
                                            source={focused ? houseFocused : house} />
                                    )}
                                />
                                
                                <Tabs
                                    tabBarStyle={{ marginTop: statusBarHeight, backgroundColor: '#ffffff' }}
                                    activeTintColor='#000000'
                                    inactiveTintColor='#000000'
                                    hideNavBar
                                    indicatorStyle={{
                                        backgroundColor: '#de5134'
                                    }}
                                    key="InvitationsInOut"
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
                                    <Scene
                                        hideNavBar
                                        key={"InvitationsIn"}
                                        title="Recibidas"
                                        component={InvitationsIn}
                                    />
                                    <Scene
                                        hideNavBar
                                        key={"InvitationsOut"}
                                        title="Enviadas"
                                        component={InvitationsOut}
                                    />
                                    
                                </Tabs>
                                <Scene
                                    key={"CreateSimpleInvitation"}
                                    title="Invitación"
                                    component={React.Component}
                                    icon={() => <CreateInvitationButton />}
                                />
                                <Scene
                                    key={"Chats"}
                                    title="Chats"
                                    component={Chats}
                                    icon={({ focused }) => (
                                        <Image
                                            style={{ width: 28, height: 28 }}
                                            source={focused ? chatFocused : chat} />
                                    )}
                                />
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
                            </Scene>
                        </Stack>
                    </Scene>
                    <Scene key="SearchTimeline"
                        hideNavBar
                        hideTabBar
                        component={SearchTimeline} title="Buscar" />
                    <Scene key="CreateInvitation"
                        hideTabBar
                        onEnter={({ invitationType }) => {
                            Actions.refresh({
                                title: invitationType === invType.OPEN
                                    ? "Invitación Abierta"
                                    : "Invitación Dirigida",
                                left: <CloseButtonOnPress onPress={() => {
                                    cleanCreateInvitation();
                                    Actions.pop();
                                }} />,
                            });
                        }}
                        renderLeftButton={null}
                        component={CreateInvitation} title="Invitación" />
                    <Scene key="EventDetail"
                        hideTabBar
                        renderLeftButton={<CloseButton />}
                        component={EventDetail} title="Detalle del evento" />
                    <Scene key="SelectUsersFromList"
                        hideNavBar={false}
                        hideTabBar
                        renderLeftButton={<BackButton />}
                        component={SelectUsersFromList} title="Seleccionar usuarios" />
                </Modal>
            </Router>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        // isLoggedIn: state.authReducer.isLoggedIn,
    }
}

export default connect(mapStateToProps, {  })(RouterApp);