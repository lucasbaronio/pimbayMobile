import React from 'react';
import { ScrollView, View, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';

import ContextActionList from '../../components/ContextActionList';

import { connect } from 'react-redux';
import styles from './styles';

// import { actions as home } from "../../index"
// const { getEventsOrInvitations } = home;


class CreateInvitation extends React.Component {
    state = {
        description: "",
        heightDescription: 90,
        onFocusDescription: false,
        contextActionSelected: null,
    }

    componentWillMount() {
        const { contextAction } = this.props;
        if (contextAction) {
            // this.setState({contextActionSelected: contextAction});
            this.contextActionListChild.onPressItem(contextAction);
        }
    }

    onPressContextAction = (item) => {
        this.setState({contextActionSelected: item});
    }

    render() {
        const { contextAction } = this.props;

        return (
            <ScrollView style={styles.container}>
                <View style={styles.descriptionView}>
                    <TextInput
                        style = {[
                            styles.description, 
                            this.state.onFocusDescription 
                            && styles.descriptionFocused
                            // : {maxHeight: this.state.heightDescription} 
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
                <ContextActionList 
                    timeline={false}
                    onRef={ref => (this.contextActionListChild = ref)}
                    onPressContextAction={this.onPressContextAction}/>
            </ScrollView>
        );
    }
}

export default connect(null, { })(CreateInvitation);