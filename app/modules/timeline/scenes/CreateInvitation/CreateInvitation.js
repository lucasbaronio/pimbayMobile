import React, { Component } from 'react';
import { ScrollView, View, Text, TextInput, ActivityIndicator } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import ContextActionList from '../../components/ContextActionList';

import { connect } from 'react-redux';
import styles from './styles';

class CreateInvitation extends Component {
    state = {
        description: "",
        heightDescription: 90,
        onFocusDescription: false,
        contextActionSelected: null,
        eventInvitation: null,
        openInvitation: null,
    }

    componentWillMount() {
        const { type } = this.props;
        switch (type) {
            case 'OPEN_INVITATION':
                const { openInvitation } = this.props;
                this.setState({openInvitation: openInvitation});
            case 'CONTEXT_ACTION':
                const { contextAction } = this.props;
                this.setState({contextActionSelected: contextAction});
            case 'EVENT_INVITATION':
                const { eventInvitation } = this.props;
                this.setState({eventInvitation: eventInvitation});
        }
    }

    renderType = () => {
        const { type } = this.props;
        switch (type) {
            case 'OPEN_INVITATION':
                return this.renderOpenInvitation();
            case 'CONTEXT_ACTION':
                return this.renderContextActionList();
            case 'EVENT_INVITATION':
                return this.renderEventInvitation();
        }
    }

    renderContextActionList = () => {
        const { contextActionSelected } = this.state;
        return (
            <ContextActionList 
                timeline={false}
                selectedItem={contextActionSelected}
                onPressContextAction={this.onPressContextAction}/>
        );
    }

    onPressContextAction = (item) => {
        this.setState({contextActionSelected: item});
    }

    renderEventInvitation = () => {
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

    renderOpenInvitation = () => {
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
            <ScrollView style={styles.container}>
                <View style={styles.descriptionView}>
                    <TextInput
                        style = {[
                            styles.description, 
                            this.state.onFocusDescription 
                            && styles.descriptionFocused
                        ]}
                        onFocus = {() => this.setState({onFocusDescription: true})}
                        onEndEditing = {() => this.setState({onFocusDescription: false})}
                        multiline = {true}
                        numberOfLines = {4}
                        onChangeText={(description) => this.setState({description})}
                        editable = {true}
                        placeholder = "Que estas para hacer hoy?"
                        autoCorrect={false}
                        underlineColorAndroid="transparent"
                    />
                </View>
                {this.renderType()}
            </ScrollView>
        );
    }
}

export default connect(null, { })(CreateInvitation);