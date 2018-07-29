import React from 'react';
import { SearchBar } from 'react-native-elements';

import styles from "./styles";

class SearchBarApp extends React.PureComponent {

    render() {
        const { onChangeText, onClearText, placeholder } = this.props;

        return(
            <SearchBar
                round
                lightTheme
                containerStyle={styles.search}
                onChangeText={onChangeText}
                onClearText={onClearText}
                placeholder={placeholder} />
        )
    }
}

export default SearchBarApp;