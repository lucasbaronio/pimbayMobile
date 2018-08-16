import React, { Component } from 'react';
import { View, Text, Image} from 'react-native';
import { Button as ButtonElements, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import moment from 'moment';
import styles, { fontSize, windowWidth } from "./styles";
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

    onInvitePress = () => {
        this.goToCreateInvitation({type: 'OPEN_INVITATION', openInvitation: this.props.item});
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
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
        const { cardType } = this.props;

        return(
            <View>
                <View style={styles.container}>
                    <View style={{flex: 1, alignItems:'center', justifyContent:'center'}}>
                        <Avatar
                            rounded
                            large
                            source={{uri: item.userPhoto}}
                            containerStyle={{marginTop: 20}}
                        />
                        <Text style={styles.userNameStyle}>{item.userName}</Text>
                    </View>
                    <View style={{flex: 2, justifyContent: 'center'}}>
                        <View style={{flex: 2}}>    
                            <View style={{alignSelf: 'center', marginRight: 15, marginTop: 10}}>
                                <Text style={styles.descriptionStyle}>{item.description}</Text>  
                            </View>
                            <View style={{marginTop: 2, flexDirection: 'row'}}>
                                <Image
                                    style={{alignSelf: 'flex-start', height: 16, width: 16}} 
                                    resizeMode='center'
                                    source={require('../../../assets/icons/time-passing.png')} />
                                <Text style={styles.dueDateStyle}>
                                    {
                                        (item.dueDate == null)
                                            ? ''
                                            : this.getDueTime(item.dueDate)
                                    }
                                </Text>
                        </View>
                        <View style={{flex: 1}}>    
                            <View style={styles.buttonView}>
                                <ButtonElements
                                    backgroundColor='#DE5134'
                                    onPress={this.onInvitePress}
                                    buttonStyle={styles.button}
                                    title='ESTOY'
                                    fontSize={fontSize.text4} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View>
                    <Image
                        style={{alignSelf: 'flex-start', width: windowWidth}} 
                        resizeMode='center'
                        source={require('../../../assets/dividerOpenInvitation.png')} />
                </View>
            </View>
        )
    }
}

export default connect(null, { })(InvitationCard);