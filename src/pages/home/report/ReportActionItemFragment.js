import React, {memo} from 'react';
import {ActivityIndicator, View} from 'react-native';
import PropTypes from 'prop-types';
import Str from 'expensify-common/lib/str';
import {useTemplateValue, Wishlist} from 'react-native-wishlist';
import reportActionFragmentPropTypes from './reportActionFragmentPropTypes';
import styles from '../../../styles/styles';
import variables from '../../../styles/variables';
import themeColors from '../../../styles/themes/default';
import RenderHTML from '../../../components/RenderHTML';
import Text from '../../../components/Text';
import Tooltip from '../../../components/Tooltip';
import * as EmojiUtils from '../../../libs/EmojiUtils';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../components/withWindowDimensions';
import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
import canUseTouchScreen from '../../../libs/canUseTouchscreen';
import compose from '../../../libs/compose';
import * as StyleUtils from '../../../styles/StyleUtils';

const propTypes = {
    /** The message fragment needing to be displayed */
    fragment: reportActionFragmentPropTypes.isRequired,

    /** Text to be shown for tooltip When Fragment is report Actor */
    tooltipText: PropTypes.string,

    /** Is this fragment an attachment? */
    isAttachment: PropTypes.bool,

    /** If this fragment is attachment than has info? */
    attachmentInfo: PropTypes.shape({

        /** The file name of attachment */
        name: PropTypes.string,

        /** The file size of the attachment in bytes. */
        size: PropTypes.number,

        /** The MIME type of the attachment. */
        type: PropTypes.string,

        /** Attachment's URL represents the specified File object or Blob object  */
        source: PropTypes.string,
    }),

    /** Does this fragment belong to a reportAction that has not yet loaded? */
    loading: PropTypes.bool,

    /** The reportAction's source */
    source: PropTypes.oneOf(['Chronos', 'email', 'ios', 'android', 'web', 'email', '']),

    /** Should this fragment be contained in a single line? */
    isSingleLine: PropTypes.bool,

    // Additional styles to add after local styles
    style: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.object),
        PropTypes.object,
    ]),

    ...windowDimensionsPropTypes,

    /** localization props */
    ...withLocalizePropTypes,
};

const defaultProps = {
    isAttachment: false,
    attachmentInfo: {
        name: '',
        size: 0,
        type: '',
        source: '',
    },
    loading: false,
    isSingleLine: false,
    tooltipText: '',
    source: '',
    style: [],
};

/*
key={`actionFragment-${props.action.reportActionID}-${index}`}
fragment={fragment}
isAttachment={props.action.isAttachment}
attachmentInfo={props.action.attachmentInfo}
source={lodashGet(props.action, 'originalMessage.source')}
loading={props.action.isLoading}
style={props.style}
*/

const ReportActionItemFragment = (p) => {
    const t = 'COMMENT';

    const text = useTemplateValue(f => f.text);

    switch (t) {
        case 'COMMENT': {
            return (
                <Wishlist.Text
                    family="EMOJI_TEXT_FONT"
                    selectable={!canUseTouchScreen()}
                    style={[styles.ltr, {color: 'white'}, ...p.style]}
                >
                    {text}
                    {/* {props.fragment.isEdited && (
                    <Text
                        fontSize={variables.fontSizeSmall}
                        color={themeColors.textSupporting}
                    >
                        {` ${props.translate('reportActionCompose.edited')}`}
                    </Text>
                    )} */}
                </Wishlist.Text>
            );
        }
        case 'LINK':
            return <Text>LINK</Text>;
        case 'INTEGRATION_COMMENT':
            return <Text>REPORT_LINK</Text>;
        case 'REPORT_LINK':
            return <Text>REPORT_LINK</Text>;
        case 'POLICY_LINK':
            return <Text>POLICY_LINK</Text>;

        // If we have a message fragment type of OLD_MESSAGE this means we have not yet converted this over to the
        // new data structure. So we simply set this message as inner html and render it like we did before.
        // This wil allow us to convert messages over to the new structure without needing to do it all at once.
        case 'OLD_MESSAGE':
            return <Text>OLD_MESSAGE</Text>;
        default:
            return <Text>fragment.text</Text>;
    }
};

ReportActionItemFragment.propTypes = propTypes;
ReportActionItemFragment.defaultProps = defaultProps;
ReportActionItemFragment.displayName = 'ReportActionItemFragment';

export default compose(
    withWindowDimensions,
    withLocalize,
)(memo(ReportActionItemFragment));
