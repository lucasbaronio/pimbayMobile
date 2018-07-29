import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { Card, Button as ButtonElements, Avatar } from 'react-native-elements';
import { connect } from "react-redux";
import styles from "./styles";
import moment from 'moment';

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

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <Card containerStyle={{padding: 10}}>
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

                    <View style={styles.middleSectionInvitation}>
                        <Text style={styles.descriptionStyle}>{item.description}</Text>  
                    </View>

                    <View style={styles.bottomSectionInvitation}>
                        <ButtonElements
                            title='Invitar'
                            containerViewStyle={styles.containerButtonStyle}
                            buttonStyle={styles.buttonStyle}
                        />
                    </View>
                </Card>
            </View>
        )
    }
}

export default connect(null, { })(InvitationCard);