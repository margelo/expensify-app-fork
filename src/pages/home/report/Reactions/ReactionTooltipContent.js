import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import Text from '../../../../components/Text';
import {withPersonalDetails} from '../../../../components/OnyxProvider';
import participantPropTypes from '../../../../components/participantPropTypes';
import styles from '../../../../styles/styles';

const basePropTypes = {
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
    senderIDs: PropTypes.arrayOf(PropTypes.string).isRequired,
    emojiName: PropTypes.string.isRequired,
};

const propTypes = {
    ...basePropTypes,

    /** Personal details of all the users */
    personalDetails: PropTypes.objectOf(participantPropTypes).isRequired,
};

const ReactionTooltipContent = (props) => {
    const names = _.map(props.senderIDs, senderID => props.personalDetails[senderID].displayName);
    const namesString = _.filter(names, n => n).join(', ');

    return (
        <View style={[styles.alignItemsCenter, styles.ph2]}>
            {_.map(props.emojiCodes, emojiCode => (
                <Text
                    key={emojiCode}
                    style={styles.fontSizeReactionEmoji}
                >
                    {emojiCode}
                </Text>
            ))}

            <Text style={[
                styles.mt1,
                styles.textMicroBold,
                styles.textReactionSenders,
            ]}
            >
                {namesString}
            </Text>

            <Text style={[
                styles.textMicro,
                styles.fontColorReactionLabel,
            ]}
            >
                {`reacted with :${props.emojiName}:`}
            </Text>
        </View>
    );
};

ReactionTooltipContent.propTypes = propTypes;
ReactionTooltipContent.displayName = 'ReactionTooltipContent';
export default React.memo(withPersonalDetails()(ReactionTooltipContent));
export {
    basePropTypes as ReactionTooltipContentPropTypes,
};
