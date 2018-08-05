import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Card, Button as ButtonElements, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import moment from 'moment';
import styles from "./styles";
import { TIMELINE_INVITATION_CARD, RECEIVED_INVITATION_CARD, SENT_INVITATION_CARD } from "./constants"

class InvitationCard extends Component {

    getDueTime(dueDate) {
        var dueDateParsed = moment(dueDate); //current format YYYY-MM-DDTHH:mm:ss.SSSSZ
        var now = moment(new Date());
        var diff = moment.duration(moment(dueDateParsed).diff(now));
        var days = parseInt(diff.asDays()); 
        var hours = parseInt(diff.asHours()); //it gives in miliseconds
        hours = hours - days*24;
        var minutes = parseInt(diff.asMinutes());
        minutes = minutes - (days*24*60 + hours*60);
        if (days > 0) return days + "d " + hours + "h " + minutes + " min";
        if (hours > 0) return hours + " h " + minutes + " min";   
        if (minutes > 0) return minutes + " min";
        return "Vencido";
    }

    onInvitePress = (item) => {
        this.goToCreateInvitation({type: 'OPEN_INVITATION', openInvitation: this.props.item});
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    renderTopSection = (item) => {
        const { cardType } = this.props;
        switch (cardType) {
            case TIMELINE_INVITATION_CARD:
                return this.renderTopSectionTimeline(item);
            case RECEIVED_INVITATION_CARD:
                return this.renderTopSectionReceived(item);
            case SENT_INVITATION_CARD:
                return this.renderTopSectionSent(item);
        }
    }

    renderTopSectionTimeline = (item) => {
        return(
            <View style={styles.topSectionInvitation}>
                <Avatar
                    rounded
                    small
                    source={{uri: item.userPhoto}}
                />
                <Text style={styles.userNameStyle}>{item.userName}</Text>
                <Text style={styles.dueDateStyle}>
                    {
                        (item.dueDate == null)
                            ? ''
                            : this.getDueTime(item.dueDate)
                    }
                </Text>
            </View>
        );
    }

    renderTopSectionReceived = (item) => {
        return (<View></View>);
    }

    renderTopSectionSent = (item) => {
        return (
            <View style={styles.topSectionInvitation}>
                <Avatar
                    rounded
                    small
                    source={{uri: item.userCreatorPhoto}}
                />
                <Text> ---> </Text>
                <Avatar
                    rounded
                    small
                    source={{uri: item.userInvitedPhoto}}
                />
                <Text style={styles.userNameStyle}>{item.userInvitedName}</Text>
                <Text style={styles.dueDateStyle}>
                    {
                        (item.dueDate == null)
                            ? ''
                            : this.getDueTime(item.dueDate)
                    }
                </Text>
            </View>
        );
    }

    renderBottomSection = () => {
        const { cardType } = this.props;
        switch (cardType) {
            case TIMELINE_INVITATION_CARD:
                return this.renderButtonsCardTimeline();
            case RECEIVED_INVITATION_CARD:
                return this.renderButtonsCardReceived();
            case SENT_INVITATION_CARD:
                return this.renderButtonsCardSent();
            //default:
                //return this.renderButtonsCardTimeline();
        }
    }

    renderButtonsCardTimeline = () => {
        return (<View style={styles.bottomSectionInvitationTimeline}>
                    <ButtonElements
                        title='Invitar'
                        containerViewStyle={styles.containerButtonStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={this.onInvitePress}
                    />
                </View>);
    }

    renderButtonsCardReceived = () => {
        return <ButtonElements
                            title='Invitar'
                            containerViewStyle={styles.containerButtonStyle}
                            buttonStyle={styles.buttonStyle}
                            onPress={this.onInvitePress}
                />;
    }

    renderButtonsCardSent = () => {
        return (<View style={styles.bottomSectionInvitationSent}>
                    <ButtonElements
                        title='Finalizar'
                        containerViewStyle={styles.containerButtonStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={this.onInvitePress}
                    />
                    <ButtonElements
                        title='Ir al chat'
                        containerViewStyle={styles.containerButtonStyle}
                        buttonStyle={styles.buttonStyle}
                        onPress={this.onInvitePress}
                    />
                </View>
        );
    }

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <Card containerStyle={{padding: 10}}>
                    {this.renderTopSection(item)}

                    <View style={styles.middleSectionInvitation}>
                        <Text style={styles.descriptionStyle}>{item.description}</Text>  
                    </View>

                    {this.renderBottomSection()}
                </Card>
            </View>
        )
    }
}

export default connect(null, { })(InvitationCard);