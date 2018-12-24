import React from 'react';
import { Image, Platform, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import { Scene, Router, Stack, Modal, Tabs, Actions, Drawer } from 'react-native-router-flux';

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
import EventDetail from '../modules/shared/Event/EventDetail';
import SearchTimelineEvent from '../modules/timeline/scenes/SearchTimeline/tabs/SearchTimelineEvent';
import SearchTimelineUser from '../modules/timeline/scenes/SearchTimeline/tabs/SearchTimelineUser';
import { EditButton, SearchButton, BackButton, SaveButton, TextButton, CloseButton, CreateInvitationButton } from './routesComponents/buttons';
import houseFocused from '../assets/icons/house-black.png';
import house from '../assets/icons/house.png';

// Chats
import Chats from '../modules/chats/scenes/Chats';
import chatFocused from '../assets/icons/chat-black.png';
import chat from '../assets/icons/chat.png';
import ChatMessenger from '../modules/chats/scenes/ChatMessenger';

// InvitationInOut
import InvitationsIn from '../modules/myInvitations/scenes/InvitationsIn';
import InvitationsOut from '../modules/myInvitations/scenes/InvitationsOut';
import InvitationDetails from '../modules/shared/Invitation/InvitationDetails';
import inOutFocused from '../assets/icons/in-out-selected.png';
import inOut from '../assets/icons/in-out.png';

// Profile
import Profile from '../modules/profile/scenes/Profile';
import EditProfile from '../modules/profile/scenes/EditProfile';
import userFocused from '../assets/icons/user-black.png';
import user from '../assets/icons/user.png';

//Shared
import { invitationType as invType } from '../modules/shared/constants';

import { CloseButtonOnPress } from './routesComponents/buttons';

import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";
import { actions as createInvitation } from "../modules/timeline/index";
const { cleanCreateInvitation } = createInvitation;
import { actions as profileActions } from "../modules/profile/index";
const { getUserData } = profileActions;
import { actions as chatActions } from "../modules/chats/index";
const { getChatList } = chatActions;
import { actions as authActions } from "../modules/auth/index";
const { userLoggedInToCache } = authActions;

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
            this.props.userLoggedInToCache(() => {
                _this.setState({ isReady: true, /*exist, */isLoggedIn});
            });
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
                                    // initial
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
                                    // onEnter={() => {
                                    //     this.props.getChatList(() => { }, (error) => Alert.alert("Oops", error.message));
                                    // }}
                                />
                                
                                <Tabs
                                    tabBarStyle={{ paddingTop: statusBarHeight, backgroundColor: '#ffffff' }}
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
                                    onEnter={() => {
                                        this.props.getChatList(() => { }, (error) => Alert.alert("Oops", error.message));
                                    }}
                                />
                                <Scene
                                    key={"Profile"}
                                    title="Perfil"
                                    // drawer={true}
                                    // contentComponent={
                                    //     <Text>menu items go here</Text>
                                    // }
                                    // drawerWidth={250}
                                    // drawerPosition="right"
                                    component={Profile}
                                    icon={({ focused }) => (
                                        <Image
                                            style={{ width: 28, height: 28 }}
                                            source={focused ? userFocused : user} />
                                    )}
                                    onEnter={() => {
                                        this.props.getUserData(false, () => {}, (error) => { Alert.alert("Oops", error.message) });
                                    }}
                                    renderRightButton={<EditButton goToScreen='EditProfile' />}
                                />
                            </Scene>
                        </Stack>
                    </Scene>
                    <Scene key="EditProfile"
                        title="Editar perfil"
                        component={EditProfile} />
                    <Scene key="InvitationDetails"
                        onEnter={({ invitation }) => {
                            Actions.refresh({
                                title: invitation.invitationType === invType.OPEN
                                    ? "Invitación Abierta"
                                    : "Invitación Dirigida",
                                left: <CloseButton />,
                            });
                        }}
                        component={InvitationDetails} />
                    <Scene key="SearchTimeline"
                        tabBarStyle={{ backgroundColor: '#ffffff' }}
                        activeTintColor='#000000'
                        inactiveTintColor='#000000'
                        indicatorStyle={{
                            backgroundColor: '#de5134'
                        }}
                        tabs
                        navBar={SearchTimeline}
                        showLabel={true}
                        lazy={true}
                        tabBarPosition='top'
                        labelStyle={{ fontFamily: fontFamily.medium }}
                        swipeEnabled={true}
                        title="Buscar" >
                        
                        <Scene
                            hideNavBar
                            key={"SearchTimelineUser"}
                            title="Personas"
                            component={SearchTimelineUser}
                        />
                        <Scene
                            hideNavBar
                            key={"SearchTimelineEvent"}
                            title="Eventos"
                            component={withActionSheetInvitationHOC(SearchTimelineEvent)}
                        />

                    </Scene>
                    <Scene key="CreateInvitation"
                        hideTabBar
                        onEnter={({ invitationType }) => {
                            Actions.refresh({
                                title: invitationType === invType.OPEN
                                    ? "Invitación Abierta"
                                    : "Invitación Dirigida",
                                left: <CloseButtonOnPress onPress={() => {
                                    this.props.cleanCreateInvitation();
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
                        renderLeftButton={null}
                        renderRightButton={
                            <TextButton 
                                text="Listo"
                                onPress={() => Actions.pop()} />
                        }
                        component={SelectUsersFromList} title="Seleccionar usuarios" />
                    <Scene
                        key={"ProfileUser"}
                        title="Perfil"
                        renderLeftButton={<CloseButton />}
                        component={Profile} />
                    <Scene
                        key={"ChatMessenger"}
                        onEnter={({ chat }) => {
                            if (chat.name) {
                                Actions.refresh({
                                    title: chat.name
                                });
                            }
                        }}
                        component={ChatMessenger} />
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

export default connect(mapStateToProps, { 
    getUserData, 
    getChatList, 
    cleanCreateInvitation,
    userLoggedInToCache
})(RouterApp);