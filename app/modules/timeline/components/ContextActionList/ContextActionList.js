import React from 'react';
import { View, FlatList, Button } from 'react-native';
import { Card, Button as ButtonElements } from 'react-native-elements';
import { connect } from 'react-redux';

// import { actions as timeline } from "../../index";
// const { getContextActionList } = timeline;

import ContextAction from "../../../shared/ContextAction";

import styles from "./styles";

const contextActions = [
    {
        id: "1",
        title: "A tomar una",
        icon: 'ios-beer',
        type: 'ionicon',
        image: null,
    },
    {
        id: "2",
        title: "Bici",
        icon: 'bicycle',
        type: 'font-awesome',
        image: null,
    },
    {
        id: "3",
        title: "Cumpleaños Tomy",
        icon: 'birthday-cake',
        type: 'font-awesome',
        image: null,
    },
    {
        id: "4",
        title: "Partido Futbol",
        icon: 'ios-football',
        type: 'ionicon',
        image: null,
    },
    {
        id: "5",
        title: "Cine",
        icon: 'popcorn',
        type: 'material-community',
        image: null,
    },
    {
        id: "6",
        title: "A comer",
        icon: 'cutlery',
        type: 'font-awesome',
        image: null,
    },
]

class ContextActionList extends React.Component {

    // componentDidMount() {
    //     this.props.getContextActionList((error) => alert(error.message))
    // }

    // componentDidMount() {
    //     this.props.onRef(this)
    //   }
    //   componentWillUnmount() {
    //     this.props.onRef(undefined)
    //   }

    state = {
        selected: new Map(),
        itemSelected: {}
    };

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
                onPressItem={this.onPressItem}
                selected={!!this.state.selected.get(item.id)}/>
        )
    }

    render() {
        return(
            <View style={styles.container}>
                <FlatList
                    horizontal
                    // data={this.props.contextActions}
                    data={contextActions}
                    extraData={this.state}
                    showsHorizontalScrollIndicator={false}
                    renderItem={this.renderItem}
                    keyExtractor={(item, index) => item.id}
                />
            </View>
        )
    }
}

// function mapStateToProps(state, props) {
//     return {
//         isLoading: state.timelineReducer.isLoadingContextActionList,
//         contextActions: state.timelineReducer.contextActions
//     }
// }

// export default connect(mapStateToProps, { getContextActionList })(ContextActionList);
export default connect(null, {  })(ContextActionList);