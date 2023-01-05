/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import ReportActionItem from '../../pages/home/report/ReportActionItem'

function TestCell(props) {
    const whatever = useTemplateValue(item => {
        'worklet'
        return item.message[0]?.text ?? 'NO MESSAGE'
    });

    const shouldDisplayNewIndicator = false /* this.props.newMarkerSequenceNumber > 0
            && reportAction.sequenceNumber === this.props.newMarkerSequenceNumber
            && !ReportActionsUtils.isDeletedAction(reportAction); */
    return (
        <ReportActionItem
            // static
            report={null}
        />
    );
}

export default function List({data, ...props}) {
    console.log('Rendering <List/>... ');

    const ref = useRef();


    data.map((d) => console.log(d))

    const preparedData = data.map(it => ({type: 'test', key: it.reportActionID, ...it})); // only for testing


    const [,dummy] = useState(false)
    useEffect(() => {
setTimeout(() => dummy(true), 500)
    }, [])

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
