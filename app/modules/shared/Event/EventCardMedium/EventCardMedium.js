import React, { PureComponent } from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
import { Actions } from "react-native-router-flux";
import LocationButton from "../components/LocationButton";
import styles, { fontSize } from "./styles";
import { getFormalDate } from "../../utils/date";

class EventCardMedium extends PureComponent {

    onInvitePress = () => {
        const { item } = this.props;
        console.log(item);
        this.props.onPressItem(item);
        // this.goToCreateInvitation({type: 'EVENT_INVITATION', eventInvitation: this.props.item});
    }

    // goToCreateInvitation = (props) => {
    //     Actions.push("CreateInvitation", props);
    // }

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <View>
                    <ImageBackground 
                        source={{uri: item.image}} 
                        imageStyle={{ borderRadius: 10 }}
                        style={styles.image} >
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
        )
    }
}

export default EventCardMedium;