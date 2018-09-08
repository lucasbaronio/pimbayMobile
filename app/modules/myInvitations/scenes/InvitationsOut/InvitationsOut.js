import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { actions as invitationsActions } from "../../index";
const { getInvitationsOut } = invitationsActions;

import SentInvitationCard from "../../../shared/Invitation/SentInvitationCard";
import styles from "./styles";

class InvitationsOut extends Component {

    componentDidMount() {
        this.props.getInvitationsOut();
    }

    onPressViewEvent = (item) => {
        Actions.push("EventDetail", { props: this.props, item });
    }

    renderItem = ({ item, index }) => {
        return <SentInvitationCard item={item} onPressViewEvent={this.onPressViewEvent}/>
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    ref='listRef'
                    data={this.props.invitationsOut}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        );
    }
}

function mapStateToProps(state, props) {
    return {
        invitationsOut: state.invitationsReducer.invitationsOut
    }
}

export default connect(mapStateToProps, { getInvitationsOut })(InvitationsOut);