import React from 'react';
import { View, FlatList, Text } from 'react-native';
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
        const { selectable, onPressContextAction } = this.props;
        if (selectable) {
            this.setState((state) => {
                const selected = new Map();
                selected.set(item.id, !selected.get(item.id));
                return { selected, itemSelected: item };
            });
        }
        onPressContextAction(item);
    };

    renderItem = ({ item, index }) => {
        return (
            <ContextAction
                item={item}
                size={this.props.size}
                selectable={this.props.selectable}
                onPressItem={this.onPressItem}
                selected={!!this.state.selected.get(item.id)} />
        )
    }

    render() {
        return (
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
                    style={{ marginLeft: 10 }}
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