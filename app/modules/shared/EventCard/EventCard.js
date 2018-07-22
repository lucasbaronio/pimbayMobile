import React from 'react';
import { View, Text, Button } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';

import styles from "./styles";
import { connect } from "react-redux";
// Las Actions (para navegar entre screens) se ejecutan desde el Timeline
// import { Actions } from "react-native-router-flux";

import LocationButton from "./components/LocationButton";

class EventCard extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            toggleSeeMore: true
        }

        this.onToggleSeeMore = this.onToggleSeeMore.bind(this);
    }

    onToggleSeeMore() {
        this.setState({toggleSeeMore: !this.state.toggleSeeMore});
    }

    render() {
        const { item } = this.props;

        return(
            <View style={styles.container}>
                <Card
                    featuredTitle={item.title}
                    featuredTitleStyle={styles.titleCard}
                    featuredSubtitle={item.date}
                    featuredSubtitleStyle={styles.subtitleCard}
                    // image={require('../images/pic2.jpg')}
                    image={{uri: item.image}}
                    // imageWrapperStyle={styles.cardImage}
                    imageProps={{resizeMode:'cover'}}
                    containerStyle={styles.card}
                >
                    {
                        !!item.description && 
                        <View style={{marginBottom: 5}}>
                            <Text>
                                {
                                    (item.description.length > 180 && this.state.toggleSeeMore)
                                    ? item.description.substring(0, 180) + '...'
                                    : item.description
                                }
                            </Text>
                            {
                                item.description.length > 180 &&
                                <Button 
                                    title={(this.state.toggleSeeMore) ? " Ver mas" : " Ver menos"}
                                    onPress={this.onToggleSeeMore} />
                            }
                            
                        </View>
                    }
                    <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                        <LocationButton place={item.place}/>
                        <View>
                            <ButtonElements
                                // icon={{name: 'code'}}
                                backgroundColor='#03A9F4'
                                // fontFamily='Lato'
                                // buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                                title='Estoy para' />
                        </View>
                    </View>
                    
                </Card>
            </View>
        )
    }
}

export default connect(null, { })(EventCard);