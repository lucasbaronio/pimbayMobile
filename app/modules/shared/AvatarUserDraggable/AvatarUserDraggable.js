import React from 'react';
import { View, Text, Animated, PanResponder } from "react-native";
import { Avatar } from 'react-native-elements';

import styles, { windowHeight } from "./styles";
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { connect } from "react-redux";

class AvatarUserDraggable extends React.PureComponent {

    state = {
        showDraggable: true,
        dropAreaValues: null,
        pan: new Animated.ValueXY(),
        opacity: new Animated.Value(1)
    }

    componentWillMount() {
        const { scrollEnabled } = this.props;
        this._val = { x:0, y:0 }
        this.state.pan.addListener((value) => this._val = value);
    
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gesture) => true,
            onPanResponderGrant: (e, gesture) => {
                scrollEnabled(false);
                this.state.pan.setOffset({
                    x: this._val.x,
                    y:this._val.y
                })
                this.state.pan.setValue({ x:0, y:0})
            },
            onPanResponderMove: Animated.event([ 
                null, { dx: this.state.pan.x, dy: this.state.pan.y }
            ]),
            onPanResponderRelease: (e, gesture) => {
                scrollEnabled(true);
                if (this.isDropArea(gesture)) {
                    Animated.timing(this.state.opacity, {
                        toValue: 0,
                        duration: 1000
                    }).start(() =>
                        this.setState({
                            showDraggable: false
                        })
                    );
                } else {
                    Animated.spring(this.state.pan, {
                        toValue: { x: 0, y: 0 },
                        friction: 5
                    }).start();
                }
            }
        });
    }
    
    isDropArea(gesture) {
        return gesture.moveY > windowHeight - 200;
    }

    renderDraggableItem = ({item, initials}) => {
        const panStyle = {
            transform: this.state.pan.getTranslateTransform()
        }
        // console.log(item);
        if (this.state.showDraggable) {
            return (
                <Animated.View
                    {...this.panResponder.panHandlers}
                    style={[ panStyle, { opacity: this.state.opacity } ]}
                >
                    <View style={styles.avatar}>
                        <Avatar
                            medium
                            rounded
                            title={(!item.avatar) ? initials : null}
                            source={(item.avatar) ? {uri: item.avatar} : null}
                        />
                    </View>
                    <View>
                        <Text style={[styles.text]}>
                            {item.userName}
                        </Text>
                    </View>
                </Animated.View>
            )
        }
    }

    render() {
        const { item } = this.props;
        var initials = item.fullName.match(/\b\w/g) || [];
        initials = ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();

        return(
            <View style={styles.container}>
                {this.renderDraggableItem({item, initials})}
            </View>
        )
    }
}

export default AvatarUserDraggable;