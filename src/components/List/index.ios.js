/* eslint-disable */
import React, {useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';

function TestCell(props) {
    const whatever = useTemplateValue(item => 'HELLO!');

    return (
        <View style={{
            borderWidth: 1, borderColor: 'red',
            margin: 10,
            padding: 10,
            width: '70%',
            borderRadius: 10,
        }}
        >
            <Wishlist.Text>{whatever}</Wishlist.Text>
        </View>
    );
}

export default function List({data, ...props}) {
    console.log('Rendering <List/>... ');

    const ref = useRef();

    const x = ['hello', 'world'];

    const preparedData = x.map(it => ({type: 'test', key: '{Math.random()}', ...it})); // only for testing

    return (
        <View style={styles.container}>
            <Wishlist.Component
                style={styles.list}
                initialIndex={preparedData.length - 1} // aka inverted
                initialData={preparedData}
                ref={ref}
            >
                <Wishlist.Template type="test">
                    <TestCell />
                </Wishlist.Template>
            </Wishlist.Component>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    list: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'green',
    },
});
