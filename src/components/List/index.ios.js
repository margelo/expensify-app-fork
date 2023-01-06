/* eslint-disable */
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import ReportActionItem from '../../pages/home/report/ReportActionItem'

function TestCell({report}) {
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
            report={report}
        />
    );
}

export default function List({data, report, ...props}) {
    console.log('Rendering <List/>... ');

    const ref = useRef();

    const prefix = report.reportID

    useEffect(() => {
        data.forEach((d) => {
            d.type = 'test'
            d.key = prefix + d.reportActionID
        })

        ref.current?.update((dataCopy) => {
            'worklet'

            // just update data - big re-render.
            for (const d of data) {
                dataCopy.set(prefix + d.reportActionID, d)
            }
        })
    }, [prefix, data])


    data.map((d) => console.log(d))

    const preparedData = data.map(it => ({type: 'test', key: prefix + it.reportActionID, ...it})); // only for testing


    const [,dummy] = useState(false)
    useEffect(() => {
const i = setInterval(() => dummy(true), 500)
return () => clearInterval(i)
    }, [])

    return (
        <View style={styles.container}>
            <Wishlist.Component
                 key={prefix}
                style={styles.list}
                initialIndex={preparedData.length - 1} // aka inverted
                initialData={preparedData}
                ref={ref}
            >
                <Wishlist.Template type="test">
                    <TestCell report={report} />
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
    },
});
