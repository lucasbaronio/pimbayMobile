import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { actions as homeActions } from "../../index";
const { getInvitationsOut } = homeActions;

import InvitationCard from "../../../shared/Invitation/InvitationCard";
import styles from "./styles"

class InvitationsIn extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getInvitationsOut();
    }

    renderItem = ({item, index}) => {
        return <InvitationCard item={item}/>
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
        invitationsOut: state.homeReducer.invitationsOut
    }
}

export default connect(mapStateToProps, { getInvitationsOut })(InvitationsIn);