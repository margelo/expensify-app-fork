import React, {Component} from 'react';
import {View} from 'react-native';
import PopoverWithMeasuredContent from '../PopoverWithMeasuredContent';
import Text from '../Text';
import CONST from '../../CONST';

class PopoverReactionsUserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: undefined,
            emoji: undefined,

            anchorX: 0,
            anchorY: 0,
        };
    }

    show(anchorElement, users, emoji) {
        // Measure the anchor element first
        anchorElement.measureInWindow((x, y, width) => {
            this.setState({
                anchorX: x + width,
                anchorY: y,
                users,
                emoji,
            });
        });
    }

    renderContent() {
        return (
            <View>
                <Text>Test</Text>
            </View>
        );
    }

    render() {
        const isVisible = this.state.users != null && this.state.emoji != null;

        // TODO: i think the size of this could be deterministic
        return (
            <PopoverWithMeasuredContent
                isVisible={isVisible}
                anchorPosition={{
                    horizontal: this.state.anchorX,
                    vertical: this.state.anchorY,
                }}
                popoverDimensions={{
                    width: CONST.EMOJI_PICKER_SIZE.WIDTH,
                    height: CONST.EMOJI_PICKER_SIZE.HEIGHT,
                }}
                measureContent={this.renderContent}
            >
                {this.renderContent()}
            </PopoverWithMeasuredContent>
        );
    }
}

export default PopoverReactionsUserList;
