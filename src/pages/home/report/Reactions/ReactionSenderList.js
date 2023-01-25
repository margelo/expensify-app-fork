import React from 'react';
import _ from 'underscore';
import PropTypes from 'prop-types';
import {FlatList} from 'react-native';
import {withPersonalDetails} from '../../../../components/OnyxProvider';
import participantPropTypes from '../../../../components/participantPropTypes';
import ReactionSenderListItem from './ReactionSenderListItem';

const propTypes = {
    senderIDs: PropTypes.arrayOf(PropTypes.string).isRequired,

    /** Personal details of all the users */
    personalDetails: PropTypes.objectOf(participantPropTypes).isRequired,
};

const renderItem = ({item}) => (
    <ReactionSenderListItem login={item.login} avatar={item.avatar} displayName={item.displayName} />
);

const keyExtractor = item => item.login;

// TODO: we can also provide a getItemLayout

const ReactionSenderList = (props) => {
    const users = _.map(props.senderIDs, senderID => props.personalDetails[senderID]);

    return (
        <FlatList
            data={users}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            style={{
                flex: 1,
                width: '100%',
                height: 400,
            }}
            contentContainerStyle={{
                flex: 1,
            }}
        />
    );
};

ReactionSenderList.propTypes = propTypes;
ReactionSenderList.displayName = 'ReactionSenderList';
export default React.memo(withPersonalDetails()(ReactionSenderList));
