import React from 'react';
import PropTypes from 'prop-types';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import ReportActionItemSingle from './ReportActionItemSingle';
import personalDetailsPropType from '../../../personalDetailsPropType';
import ReportActionItemFragment from './ReportActionItemFragment';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import Text from './Text';
import ReportActionContent from './ReportActionContent';

const propTypes = {
    /** All of the personalDetails */
    personalDetails: PropTypes.objectOf(personalDetailsPropType),
};

const defaultProps = {
    personalDetails: {},
};

function ReportActionItem(props) {
    const action = useTemplateValue((item) => item.action);
    const type = useTemplateValue((item) => {
        if (item.action.displayAsGroup) {
            return 'grouped-message';
        } 
        return 'single-messsage';
    })

    return (
        <>
            <Wishlist.Switch value={type}>
                <Wishlist.Case value="single-message" >
                    <ReportActionItemSingle
                        action={action}
                        personalDetails={props.personalDetails}
                    >
                        <ReportActionContent/>
                    </ReportActionItemSingle>
                </Wishlist.Case>
                <Wishlist.Case value="grouped-message" >
                    <ReportActionItemGrouped
                        action={action}
                        personalDetails={props.personalDetails}
                    >
                        <ReportActionContent/>
                    </ReportActionItemGrouped>
                </Wishlist.Case>
            </Wishlist.Switch>
        </>
    );
}

ReportActionItem.propTypes = propTypes;
ReportActionItem.defaultProps = defaultProps;

export default ReportActionItem;
