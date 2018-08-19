import React from 'react';
import { Platform } from 'react-native';
import { Constants } from 'expo';
import { Scene, Router, Stack, Modal, Tabs } from 'react-native-router-flux';

//Splash Component
import Splash from '../components/Splash/Splash';

//Authentication Scenes
import Welcome from '../modules/auth/scenes/Welcome';
import Register from '../modules/auth/scenes/Register';
import CompleteProfile from '../modules/auth/scenes/CompleteProfile';
import Login from '../modules/auth/scenes/Login';
import ForgotPassword from '../modules/auth/scenes/ForgotPassword';

//Import Store, actions
import store from '../redux/store'
import { checkLoginStatus } from "../modules/auth/actions";

import { color, navTitleStyle } from "../styles/theme";
import { Font } from 'expo';

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
        Font.loadAsync({'boogaloo-regular': require('../assets/fonts/Boogaloo-Regular.ttf')});
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
                        <Stack key="Main" initial={this.state.isLoggedIn}>
                            <Tabs
                                hideNavBar
                                key = "Home"
                                showLabel={false}
                                lazy = {true}
                                tabBarPosition = 'bottom'
                                swipeEnabled={false}
                            >
                                {require("./routesComponents/tabs/timeline").default}
                                {require("./routesComponents/tabs/invitationInOut").default}
                                {require("./routesComponents/tabs/createInvitation").default}
                                {require("./routesComponents/tabs/chats").default}
                                {require("./routesComponents/tabs/profile").default}
                            </Tabs>
                        </Stack>
                    </Scene>
                </Modal>
            </Router>
        )
    }
}