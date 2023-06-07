import React from 'react';
import PropTypes from 'prop-types';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import ReportActionItemSingle from './ReportActionItemSingle';
import personalDetailsPropType from '../../../personalDetailsPropType';
import ReportActionItemFragment from './ReportActionItemFragment';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import Text from './Text';

const propTypes = {
    /** All of the personalDetails */
    personalDetails: PropTypes.objectOf(personalDetailsPropType),
};

const defaultProps = {
    personalDetails: {},
};

function ReportActionItem(props) {
    const action = useTemplateValue((item) => item.action);
    const text = useTemplateValue((item) => item.action.message[0].text);
    const isSingleItem = useTemplateValue((item) => !item.action.displayAsGroup);
    const isGrouped = useTemplateValue((item) => item.action.displayAsGroup);

    const content = <Text>{text}</Text>;

    return (
        <>
            <Wishlist.IF condition={isSingleItem}>
                <ReportActionItemSingle
                    action={action}
                    personalDetails={props.personalDetails}
                >
                    {content}
                </ReportActionItemSingle>
            </Wishlist.IF>
            <Wishlist.IF condition={isGrouped}>
                <ReportActionItemGrouped
                    action={action}
                    personalDetails={props.personalDetails}
                >
                    {content}
                </ReportActionItemGrouped>
            </Wishlist.IF>
        </>
    );
}

ReportActionItem.propTypes = propTypes;
ReportActionItem.defaultProps = defaultProps;

export default ReportActionItem;
