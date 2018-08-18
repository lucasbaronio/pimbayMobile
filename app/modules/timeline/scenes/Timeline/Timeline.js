import React from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";

import { actions as timeline } from "../../index";
const { getInvitations } = timeline;

import { API_INVITATION_SIZE } from '../../constants';
import { pimbayType, invitationType } from '../../../shared/constants';

import styles from "./styles";
import ContextActionList from "../../components/ContextActionList";
import EventList from "../../components/EventList";
import InvitationCard from "../../../shared/InvitationCard";
import { TIMELINE_INVITATION_CARD } from "../../../shared/InvitationCard/constants";

@connectActionSheet
class Timeline extends React.Component {
    state = {
        start: 0,
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getInvitations(start, (error) => alert(error.message))
    }

    renderItem = ({item, index}) => {
        console.log(item);
        return (
            <View>
                {
                    !!(index === 0) &&
                    <Text style={styles.title}>
                        Que estás para hacer hoy?
                    </Text>
                }
                <InvitationCard item={item} cardType={ TIMELINE_INVITATION_CARD }/>
            </View>
        )
    }

    onOpenActionSheet = (item, type) => {
        this.props.showActionSheetWithOptions({
            options: ['Cancelar', 'Invitación Abierta', 'Invitación Dirigida'],
            cancelButtonIndex: 0,
            title: 'Crear Invitación - De que tipo?',
            message: 'Abierta: Visible para todos en Pimbay.\nDirigida: Visible solo para usuarios invitados.'
        },
        (buttonIndex) => {
            this.goToCreateInvitation({
                type: type, 
                item: item,
                invitationType: 
                    (buttonIndex === 1) 
                        ? invitationType.OPEN 
                        : invitationType.DIRECTED
            });
        });
    }

    onPressContextAction = (item) => {
        this.onOpenActionSheet(item, pimbayType.CONTEXT_ACTION);
        // this.goToCreateInvitation({type: pimbayType.CONTEXT_ACTION, contextAction: item});
    }

    onPressEvent = (item) => {
        this.onOpenActionSheet(item, pimbayType.EVENT);
        // this.goToCreateInvitation({type: pimbayType.EVENT, event: item});
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    renderHeader = () => {
        return (
            <View>
                <ContextActionList 
                    timeline={true}
                    onPressContextAction={this.onPressContextAction} />
                <EventList onPressEvent={this.onPressEvent} />
            </View>
        )
    }

    render() {
        if (this.props.isLoading){
            return(
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true}/>
                </View>
            )
        }else{
            return (
                <View style={styles.container}>
                    {/* <TextInput
                        style={styles.createInvitationTextInput}
                        onFocus={this.goToCreateInvitation}
                        placeholder={"Que estas para hacer hoy?"}
                        placeholderTextColor={color.black}
                    /> */}
                    <FlatList
                        ref='listRef'
                        data={this.props.invitations}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        onEndReachedThreshold={0.01}
                        onEndReached={() => {
                            if (!this.onEndReachedCalledDuringMomentum) {
                                this.setState({
                                    start: this.state.start + API_INVITATION_SIZE
                                }, () => this.props.getInvitations(this.state.start, (error) => alert(error.message)))
                                this.onEndReachedCalledDuringMomentum = true;
                            }
                        }}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                        ListFooterComponent={() => {
                            return (
                              this.props.isLoadingMore &&
                              <View style={styles.activityIndicatorBottom}>
                                <ActivityIndicator size="small" />
                              </View>
                            );
                        }}
                        ListHeaderComponent={this.renderHeader}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoading,
        isLoadingMore: state.timelineReducer.isLoadingMore,
        invitations: state.timelineReducer.invitations
    }
}

export default connect(mapStateToProps, { getInvitations })(Timeline);