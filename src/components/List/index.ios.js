/* eslint-disable */
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';

function TestCell(props) {
    const whatever = useTemplateValue(item => 'HELLO!');

    return (
        <View style={{borderWidth: 1, borderColor: 'red', padding: 5}}>
            <Wishlist.Text>{whatever}</Wishlist.Text>
        </View>
    );
}

export default function List({data, ...props}) {
    console.log('Rendering <List/>... ');

    const ref = useRef();

    const preparedData = data.map((it) => ({type: "test", key: `{Math.random()}`, ...it})); // only for testing

    return (
        <Wishlist.Component
            style={styles.list}
            initialIndex={data.length - 1} // aka inverted
            initialData={preparedData}
            ref={ref}
        >
            <Wishlist.Template type="test">
                <TestCell />
            </Wishlist.Template>
        </Wishlist.Component>
    );
}

const styles = StyleSheet.create({
    list: {
        width: 400,
        height: 800,
    },
});
