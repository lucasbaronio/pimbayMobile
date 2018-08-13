import React, { PureComponent } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import LocationButton from "../components/LocationButton";
import styles, { fontSize } from "./styles";
import { getFormalDate } from "../../utils/date";

class EventCardMedium extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            toggleSeeMore: true
        }
    }

    onToggleSeeMore = () => {
        this.setState({toggleSeeMore: !this.state.toggleSeeMore});
    }

    onInvitePress = () => {
        this.goToCreateInvitation({type: 'EVENT_INVITATION', eventInvitation: this.props.item});
    }

    goToCreateInvitation = (props) => {
        Actions.push("CreateInvitation", props);
    }

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "column", justifyContent: "flex-start", margin: 15 }}>
                    <View>
                        <ImageBackground 
                            source={{uri: item.image}} 
                            imageStyle={{ borderRadius: 10 }}
                            style={{ height: 150, borderRadius: 10, resizeMode:'cover' }} >
                            <View style={styles.buttonView}>
                                <ButtonElements
                                    backgroundColor='#DE5134'
                                    onPress={this.onInvitePress}
                                    buttonStyle={styles.button}
                                    title='CREAR INIVTACIÓN'
                                    fontSize={fontSize.text4} />
                            </View>
                        </ImageBackground>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={styles.eventDetail}>
                        <Text style={styles.realizationDate}>
                            {getFormalDate(item.realizationDate)}
                        </Text>
                        <LocationButton place={item.place}/>
                    </View>
                </View>
            </View>
        )
    }
}

export default EventCardMedium;