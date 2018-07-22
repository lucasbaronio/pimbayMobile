import React from 'react';
import { View, Text, Button } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";
// Las Actions (para navegar entre screens) se ejecutan desde el Timeline
// import { Actions } from "react-native-router-flux";

class InvitationCard extends React.Component {

    render() {
        return(
            null
        )
    }
}

export default connect(null, { })(InvitationCard);