import React from 'react';
import {View} from 'react-native';
import PopoverWithMeasuredContent from '../../../../components/PopoverWithMeasuredContent';

class PopoverReactionsContextMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
        };

        this.showContextMenu = this.showContextMenu.bind(this);
        this.hideContextMenu = this.hideContextMenu.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    showContextMenu() {
        this.setState({isVisible: true});
    }

    hideContextMenu() {
        this.setState({isVisible: false});
    }

    renderContent() {
        return (
            <View style={{
                height: 100,
                width: 100,
                backgroundColor: 'red',
            }}
            />
        );
    }

    render() {
        return (
            <PopoverWithMeasuredContent
                isVisible={this.state.isVisible}
                onClose={this.hideContextMenu}
                animationIn="fadeIn"
                disableAnimation={false}
                animationOutTiming={1}
                measureContent={this.renderContent}
                shouldSetModalVisibility={false}
                fullscreen
                anchorOrigin={{
                    horizontal: 0,
                    vertical: 0,
                }}
            >
                {this.renderContent()}
            </PopoverWithMeasuredContent>
        );
    }
}

export default PopoverReactionsContextMenu;
