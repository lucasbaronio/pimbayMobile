import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { Scene, Router, ActionConst, Stack, Modal, Tabs, Actions } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';

// Timeline
import Timeline from '../modules/timeline/scenes/Timeline';
import SearchTimeline from '../modules/timeline/scenes/SearchTimeline';

// InvitationsIn
import InvitationsIn from '../modules/home/scenes/InvitationsIn';

// InvitationsOut
import InvitationsOut from '../modules/home/scenes/InvitationsOut';

// Profile
import Profile from '../modules/home/scenes/Profile';

// Chats
import Chats from '../modules/home/scenes/Chats';

// import Home from '../modules/home/scenes/Home';
// import LocationExpo from '../modules/home/scenes/LocationExpo';
// import NotificationExpo from '../modules/home/scenes/NotificationExpo';

import NavButton from '../components/NavButton';
// import SaveButton from '../modules/home/components/SaveButton';

//Icons tabBar 
import { 
    Entypo, 
    Foundation, 
    FontAwesome,
    Ionicons
} from '@expo/vector-icons';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            isReady: false,
            isLoggedIn: false,
            exist: false //indicates if user exist in realtime database
        }
    }

    componentDidMount() {
        let _this = this;
        store.dispatch(checkLoginStatus((exist, isLoggedIn) => {
            _this.setState({isReady: true, exist, isLoggedIn});
        }));
    }

    renderAddButton(props) {
        return (
            <NavButton onPress={Actions.NewQuote}
                       name={"plus"} type={"entypo"}
                       color={color.black}/>
        )
    }

    renderSearchTimelineButton(props) {
        return (
            <NavButton onPress={Actions.SearchTimeline}
                       name={"search"} type={"Feather"}
                       color={color.black}/>
        )
    }

    renderCloseButton(props) {
        return (
            <NavButton onPress={Actions.pop}
                       name={"md-close"}
                       type={"ionicon"}
                       color={color.black}/>
        )
    }

    renderSaveButton(props) {
        if (props.showButton) return (<SaveButton data={props.data}/>)
        else return null
    }

    render() {
        if (!this.state.isReady)
            return <Splash/>

        return (
            <Router>
                <Modal>
                    <Scene key="root" hideNavBar
                        navigationBarStyle={{backgroundColor: "#fff"}}
                        titleStyle={navTitleStyle}
                        backButtonTintColor={color.black}>
                        <Stack key="Auth" initial={!this.state.isLoggedIn}>
                            <Scene key="Welcome" component={Welcome} title="" initial={true} hideNavBar/>
                            <Scene key="Register" component={Register} title="Crear cuenta" back/>
                            <Scene key="CompleteProfile" component={CompleteProfile} title="Select Username" back={false}/>
                            <Scene key="Login" component={Login} title="Iniciar Sesión"/>
                            <Scene key="ForgotPassword" component={ForgotPassword} title="Olvidé mi contraseña"/>
                        </Stack>

                        {/* <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Scene key="Home" component={Home} initial={true} title="Inicio" type={ActionConst.REPLACE}/>
                            <Scene key="Timeline" component={Timeline} initial={true} title="Inicio" type={ActionConst.REPLACE}
                                renderRightButton={this.renderSearchTimelineButton}/>
                            <Scene key="Location" component={LocationExpo} title="Ubicación" back/>
                            <Scene key="Notification" component={NotificationExpo} title="Notificaciones" back/>
                        </Stack> */}
                        <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Tabs
                                hideNavBar
                                key = "Home"
                                showLabel = {true}
                                lazy = {true}
                                // showIcon = {true}
                                tabBarPosition = 'bottom'
                                tabStyle={ (Platform.OS === 'android') && { marginTop: Constants.statusBarHeight }}
                                // tabBarStyle={{ marginTop: Constants.statusBarHeight }}
                                // labelStyle={styles.label}
                                swipeEnabled={false}
                            >
                                <Scene
                                    // hideNavBar
                                    initial
                                    key={"timeline"}
                                    title="Inicio"
                                    component={Timeline}
                                    renderRightButton={this.renderSearchTimelineButton}
                                    icon={({ focused }) => (
                                        <Entypo
                                            size={28}
                                            color={focused ? 'black' : 'grey'}
                                            name={`home`}
                                        />
                                    )}
                                />
                                <Scene
                                    // hideNavBar
                                    key={"invitationIn"}
                                    title="Recibidas"
                                    component={InvitationsIn}
                                    icon={({ focused }) => (
                                        <Foundation
                                            size={28}
                                            color={focused ? 'black' : 'grey'}
                                            name={`arrows-in`}
                                        />
                                    )}
                                />
                                <Scene
                                    // hideNavBar
                                    key={"chats"}
                                    title="Chats"
                                    component={Chats}
                                    icon={({ focused }) => (
                                        <Ionicons
                                            size={28}
                                            color={focused ? 'black' : 'grey'}
                                            name={`ios-chatbubbles`}
                                        />
                                    )}
                                />
                                <Scene
                                    // hideNavBar
                                    key={"invitationOut"}
                                    title="Enviadas"
                                    component={InvitationsOut}
                                    icon={({ focused }) => (
                                        <Foundation
                                            size={28}
                                            color={focused ? 'black' : 'grey'}
                                            name={`arrows-out`}
                                        />
                                    )}
                                />
                                <Scene
                                    // hideNavBar
                                    key={"profile"}
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
                                {/* <Scene
                                    // hideNavBar
                                    key={"InvitationOut"}
                                    component={InvitationOut}
                                    icon={({ focused }) => (
                                        <Icon
                                            size={iconSize}
                                            color={focused ? activeIconColor : iconColor}
                                            textStyle={focused ? [styles.label, styles.activeLabel] : styles.label}
                                            name={`home3`}
                                            text={`My Account`}
                                        />
                                    )}
                                /> */}
                            </Tabs>
                        </Stack>
                    </Scene>
                    <Scene key="SearchTimeline"
                        hideNavBar
                        component={SearchTimeline} title="Buscar" />
                    
                </Modal>
            </Router>
        )
    }
}