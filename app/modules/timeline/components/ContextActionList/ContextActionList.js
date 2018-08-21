import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
import { connect } from 'react-redux';

import { actions as timeline } from "../../index";
const { getContextActionList } = timeline;

import ContextAction from "../../../shared/ContextAction";

import styles from "./styles";

class ContextActionList extends React.Component {

    state = {
        selected: new Map(),
        itemSelected: {}
    };

    componentWillMount() {
        const { selectedItem } = this.props;
        selectedItem && this.onPressItem(selectedItem);
    }

    componentDidMount() {
        this.props.getContextActionList((error) => alert(error.message))
    }

    onPressItem = (item) => {
        if (this.props.timeline) {
            this.props.onPressContextAction(item);
        } else {
            this.setState((state) => {
                const selected = new Map();
                selected.set(item.id, !selected.get(item.id));
                return {selected, itemSelected: item};
            });
            this.props.onPressContextAction(item);
        }
    };

    renderItem = ({item, index}) => {
        return (
            <ContextAction 
                item={item}
                timeline={this.props.timeline}
                onPressItem={this.onPressItem}
                selected={!!this.state.selected.get(item.id)}/>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.title}>
                    Estoy para
                </Text>
                <FlatList
                    horizontal
                    data={this.props.contextActions}
                    // data={contextActions}
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        )
    }
}

function mapStateToProps(state, props) {
    return {
        isLoading: state.timelineReducer.isLoadingContextActionList,
        contextActions: state.timelineReducer.contextActions
    }
}

export default connect(mapStateToProps, { getContextActionList })(ContextActionList);