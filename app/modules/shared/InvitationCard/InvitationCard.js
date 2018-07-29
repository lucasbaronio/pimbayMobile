import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import { Card, Button as ButtonElements, Avatar } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";
// Las Actions (para navegar entre screens) se ejecutan desde el Timeline
// import { Actions } from "react-native-router-flux";

class InvitationCard extends Component {

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <Card>
                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                        <Avatar 
                            size="small"
                            rounded
                            source={{uri: item.userPhoto}}
                        />
                        <Text style={{marginLeft: 15, fontSize: 18}}>{item.userName}</Text>  
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{marginLeft: 15, fontSize: 16}}>{item.description}</Text>  
                    </View>
                    <View style={{marginTop: 10, alignItems: 'flex-end'}}>
                        <ButtonElements
                            style={{alignSelf: 'flex-end'}}
                            title='Invitar'
                            buttonStyle={{
                                backgroundColor: '#03A9F4',
                                width: 80,
                                height: 30,
                                borderColor: "transparent",
                                borderWidth: 0,
                                borderRadius: 5
                            }}
                        />
                    </View>
                </Card>
            </View>
        )
    }
}

export default connect(null, { })(InvitationCard);