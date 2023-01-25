import React from 'react';
import _ from 'underscore';
import {TabView} from 'react-native-tab-view';
import PropTypes from 'prop-types';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';
import ReactionSenderList from './ReactionSenderList';

const propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    reactions: PropTypes.arrayOf(PropTypes.object).isRequired,

    ...windowDimensionsPropTypes,
};

class ReactionsContextMenuContent extends React.Component {
    constructor(props) {
        super(props);

        //  TODO: the index must be the position of the selected/long-pressed reaction
        this.state = {
            index: 0,
            routes: _.map(props.reactions, reaction => ({
                key: reaction.emoji,
                title: reaction.emoji,
            })),
        };

        this.changeTab = this.changeTab.bind(this);
        this.renderScene = this.renderScene.bind(this);
    }

    changeTab(index) {
        this.setState({index});
    }

    renderScene(props) {
        // TODO: ⚠️⚠️⚠️ I think this would run every time the tab changes, which would be bad for performance?
        const reaction = _.find(this.props.reactions, r => r.emoji === props.route.key);
        if (reaction == null) {
            return null;
        }

        const senderIDs = _.pluck(reaction.senders, 'login');
        return <ReactionSenderList senderIDs={senderIDs} />;
    }

    render() {
        return (
            <TabView
                style={{
                    height: 400,
                    width: this.props.windowWidth,
                }}
                onIndexChange={this.changeTab}
                navigationState={this.state}
                renderScene={this.renderScene}
                initialLayout={{
                    width: this.props.windowWidth,
                }}
            />
        );
    }
}

ReactionsContextMenuContent.propTypes = propTypes;
export default withWindowDimensions(ReactionsContextMenuContent);
