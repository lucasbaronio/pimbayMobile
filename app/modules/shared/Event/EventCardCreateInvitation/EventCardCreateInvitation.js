import React, { PureComponent } from 'react';
import { View, Text, Image } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import styles from "./styles";

class EventCardCreateInvitation extends PureComponent {

    state = {
        toggleSeeMore: true
    }

    // onToggleSeeMore = () => {
    //     this.setState({toggleSeeMore: !this.state.toggleSeeMore});
    // }

    render() {
        const { id, title, type, realizationDate, place, image, categories, description } = this.props.eventInvitation;

        return(
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={styles.image}
                        resizeMode="cover"
                        source={{ uri: image }}
                    />
                </View>
                <View style={{ flex: 2, flexDirection: "column", alignItems: "flex-start" }}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    {
                        !!description && 
                        <View style={{marginBottom: 5}}>
                            <Text>
                                {
                                    // (description.length > 180 && this.state.toggleSeeMore)
                                    (description.length > 180)
                                    ? description.substring(0, 180) + '...'
                                    : description
                                }
                            </Text>
                        </View>
                    }
                </View>
            </View>
        )
    }
}

export default connect(null, { })(EventCardCreateInvitation);