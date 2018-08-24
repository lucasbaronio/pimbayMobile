import React from 'react';
import { View, FlatList, ActivityIndicator, Text, Platform, RefreshControl } from 'react-native';
import { connectActionSheet } from '@expo/react-native-action-sheet';

import { connect } from 'react-redux';
import { Actions } from "react-native-router-flux";
import { actions as timeline } from "../../index";
const { getInvitations, getInvitationsRefresh } = timeline;

import { API_INVITATION_SIZE } from '../../constants';
import { pimbayType, invitationType, contextActionSize } from '../../../shared/constants';

import styles, {actionSheetStyles} from "./styles";
import ContextActionList from "../../components/ContextActionList";
import EventList from "../../components/EventList";
import InvitationCard from "../../../shared/Invitation/InvitationCard";
import { invitationCard } from "../../../shared/constants";
import ActionSheet from 'react-native-actionsheet';

@connectActionSheet
class Timeline extends React.Component {
    state = {
        start: 0,
        actionSheetPimbayType: null,
        actionSheetItem: null
    }

    componentDidMount() {
        const { start } = this.state;
        this.props.getInvitations(start, (error) => alert(error.message));
    }

    renderItem = ({ item, index }) => {
        return (
            <View>
                {
                    !!(index === 0) &&
                    <Text style={styles.titleInvitationsSection}>
                        Que estás para hacer hoy?
                    </Text>
                }
                <InvitationCard item={item} cardType={invitationCard.TIMELINE} />
            </View>
        )
    }

    showActionSheet = () => {
        this.ActionSheet.show()
    }

    onOpenActionSheet = (item, type) => {
        this.props.showActionSheetWithOptions({
            options: [
                'Cancelar',
                'Invitación Abierta',
                // 'Invitación Dirigida'
            ],
            cancelButtonIndex: 0,
            title: 'Crear Invitación - De que tipo?',
            message: 'Abierta: Visible para todos en Pimbay.\nDirigida: Visible solo para usuarios invitados.'
        },
            (buttonIndex) => {
                if (buttonIndex > 0 && buttonIndex < 3)
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
        if (Platform.OS === 'ios') {
            this.onOpenActionSheet(item, pimbayType.CONTEXT_ACTION)
        } else {
            this.setState({actionSheetPimbayType: pimbayType.CONTEXT_ACTION, actionSheetItem: item });
            this.showActionSheet();
        }
    }

    onPressEvent = (item) => {
        if (Platform.OS === 'ios') {
            this.onOpenActionSheet(item, pimbayType.EVENT)
        } else {
            this.setState({ actionSheetPimbayType: pimbayType.EVENT, actionSheetItem: item });
            this.showActionSheet();
        }
    }

    onPressActionSheetAndroid = (index) => {
        if (index == 0 || index == 1) {
            this.goToCreateInvitation({
                type: this.state.actionSheetPimbayType,
                item: this.state.actionSheetItem,
                invitationType:
                    (index === 0)
                        ? invitationType.OPEN
                        : invitationType.DIRECTED
            });
        }
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    renderHeader = () => {
        return (
            <View>
                <ContextActionList
                    size={contextActionSize.MEDIUM}
                    selectable={false}
                    onPressContextAction={this.onPressContextAction} />
                <EventList onPressEvent={this.onPressEvent} />
            </View>
        )
    }

    render() {
        if (this.props.isLoading) {
            return (
                <View style={styles.activityIndicatorCenter}>
                    <ActivityIndicator animating={true} />
                </View>
            )
        } else {
            return (
                <View style={styles.container}>
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
                        refreshControl={
                            <RefreshControl
                                refreshing={this.props.isLoadingHeader}
                                onRefresh={() => this.props.getInvitationsRefresh((error) => alert(error.message))}
                            />
                        }
                    />
                    <ActionSheet
                        ref={o => this.ActionSheet = o}
                        title={'Crear Invitación - De que tipo?'}
                        message={'Abierta: Visible para todos en Pimbay.\nDirigida: Visible solo para usuarios invitados.'}
                        options={['Invitación Abierta', 'Invitación Dirigida', 'Cancelar']}
                        cancelButtonIndex={2}
                        onPress={(index) => { this.onPressActionSheetAndroid(index) }}
                        styles={actionSheetStyles}
                    />
                </View>
            );
        }
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoading,
        isLoadingHeader: state.timelineReducer.isLoadingHeader,
        isLoadingMore: state.timelineReducer.isLoadingMore,
        invitations: state.timelineReducer.invitations
    }
}

export default connect(mapStateToProps, { getInvitations, getInvitationsRefresh })(Timeline);