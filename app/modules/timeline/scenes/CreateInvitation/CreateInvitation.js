import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class CreateInvitation extends Component {
    
    renderType() {
        const { type } = this.props;
        switch (type) {
            case 'OPEN_INVITATION':
                return this.renderOpenInvitation();
            case 'CONTEXT_ACTION':
                return this.renderContextActionInvitation();
            case 'EVENT_INVITATION':
                return this.renderEventInvitation();
        }
    }

    renderContextActionInvitation() {
        const { id, title, icon, type } = this.props.contextAction;
        return (
            <Text>
                <Text>{id}</Text>
                <Text>{title}</Text>
                <Text>{icon}</Text>
                <Text>{type}</Text>
            </Text>
        );
    }

    renderEventInvitation() {
        const { id, title, type, realizationDate, place, image, categories, description } = this.props.eventInvitation;
        return (
            <Text>
                <Text>{id}</Text>
                <Text>{title}</Text>
               <Text>{type}</Text>
               <Text>{realizationDate}</Text>
               <Text>{place}</Text>
               <Text>{image}</Text>
               <Text>{categories}</Text>
               <Text>{description}</Text>
            </Text>
        );
    }

    renderOpenInvitation() {
        const { id, type, categories, userId, userName, userPhoto, description, date, dueDate } = this.props.openInvitation;
        return (
            <Text>
                <Text>{id}</Text>
                <Text>{type}</Text>
                <Text>{categories}</Text>
                <Text>{userId}</Text>
                <Text>{userName}</Text>
                <Text>{userPhoto}</Text>
                <Text>{description}</Text>
                <Text>{date}</Text>
                <Text>{dueDate}</Text>
            </Text>
        );
    }

    render() {       
        return (
            <View>
                <Text>Crear invitacion</Text>
                {this.renderType()}
            </View>
        );
    }
}

export default connect(null, { })(CreateInvitation);