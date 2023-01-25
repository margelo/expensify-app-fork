import React from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'underscore';
import variables from '../../../../styles/variables';
import Text from '../../../../components/Text';

const propTypes = {
    emojiCodes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ReactionTooltipContent = props => (
    <View>
        {_.map(props.emojiCodes, emojiCode => (
            <Text
                key={emojiCode}
                style={{
                    fontSize: variables.iconSizeLarge,
                }}
            >
                {emojiCode}
            </Text>
        ))}
    </View>
);

ReactionTooltipContent.propTypes = propTypes;
ReactionTooltipContent.displayName = 'ReactionTooltipContent';
export default React.memo(ReactionTooltipContent);
export {
    propTypes as ReactionTooltipContentPropTypes,
};
