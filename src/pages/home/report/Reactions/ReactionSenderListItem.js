import PropTypes from 'prop-types';
import {View} from 'react-native';
import React from 'react';
import Avatar from '../../../../components/Avatar';
import styles from '../../../../styles/styles';
import Text from '../../../../components/Text';

const propTypes = {
    // Primary login of participant
    login: PropTypes.string.isRequired,

    // Display Name of participant
    displayName: PropTypes.string.isRequired,

    // Avatar url of participant
    avatar: PropTypes.oneOfType([PropTypes.string, PropTypes.func]).isRequired,
};

const ReactionSenderListItem = props => (
    <View style={[styles.flexRow, styles.alignItemsCenter, styles.justifyContentBetween]}>
        <Avatar
            containerStyles={[styles.actionAvatar]}
            source={props.avatar}
        />
        <View>
            <Text style={[styles.textStrong, styles.textNormal, styles.textWhite]}>
                {props.displayName}
            </Text>
            <Text style={styles.textLabelSupporting}>
                {props.login}
            </Text>
        </View>
    </View>
);

ReactionSenderListItem.propTypes = propTypes;
ReactionSenderListItem.displayName = 'ReactionSenderListItem';
export default React.memo(ReactionSenderListItem);
