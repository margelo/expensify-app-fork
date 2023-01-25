import React from 'react';
import PopoverWithMeasuredContent from '../../../../components/PopoverWithMeasuredContent';
import ReactionsContextMenuContent from './ReactionsContextMenuContent';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';

const propTypes = {
    ...windowDimensionsPropTypes,
};

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

    showContextMenu(reactions) {
        this.setState({isVisible: true, reactions});
    }

    hideContextMenu() {
        this.setState({isVisible: false, reactions: undefined});
    }

    renderContent() {
        return (
            <ReactionsContextMenuContent reactions={this.state.reactions} />
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
                shouldSetModalVisibility={false}
                popoverDimensions={{
                    width: this.props.windowWidth,
                    height: this.props.windowHeight * 0.8,
                }}
                anchorPosition={{
                    horizontal: this.props.windowWidth / 2,
                    vertical: this.props.windowHeight / 2,
                }}

                // This doesn't measure, but is needed to render the content
                measureContent={this.renderContent}
            />
        );
    }
}

PopoverReactionsContextMenu.propTypes = propTypes;
export default withWindowDimensions(PopoverReactionsContextMenu);
