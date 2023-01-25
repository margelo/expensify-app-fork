import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {View} from 'react-native';
import Hoverable from '../../../../components/Hoverable';
import getTooltipStyles, {TOOLTIP_VERTICAL_PADDING} from '../../../../styles/getTooltipStyles';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';
import styles from '../../../../styles/styles';
import ReactionTooltipContent, {ReactionTooltipContentPropTypes} from './ReactionTooltipContent';

const propTypes = {
    children: PropTypes.node.isRequired,

    ...ReactionTooltipContentPropTypes,

    /** Props inherited from withWindowDimensions */
    ...windowDimensionsPropTypes,
};

class ReactionTooltip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,

            // The distance between the left side of the wrapper view and the left side of the window
            xOffset: 0,

            // The distance between the top of the wrapper view and the top of the window
            yOffset: 0,

            // The width and height of the wrapper view
            wrapperWidth: 0,
            wrapperHeight: 0,

            // The width and the height of the content we want to render
            // inside the tooltip.
            contentWidth: 0,
            contentHeight: 0,
        };

        this.wrapperRef = React.createRef();

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
        this.measureContent = this.measureContent.bind(this);
        this.renderContent = this.renderContent.bind(this);
    }

    showTooltip() {
        this.wrapperRef.current.measureInWindow((x, y, width, height) => {
            this.setState({
                xOffset: x,
                yOffset: y,
                wrapperWidth: width,
                wrapperHeight: height,
            }, () => {
                this.setState({isVisible: true});
            });
        });
    }

    hideTooltip() {
        this.setState({isVisible: false});
    }

    measureContent(event) {
        const {width, height} = event.nativeEvent.layout;
        this.setState({
            contentWidth: width,

            // The tool tip styles will add a vertical padding which we have to take into account
            contentHeight: height + (TOOLTIP_VERTICAL_PADDING.paddingVertical * 2),
        });
    }

    renderContent() {
        return (
            <ReactionTooltipContent emojiCodes={this.props.emojiCodes} />
        );
    }

    render() {
        const isContentMeasured = this.state.contentWidth > 0 && this.state.contentHeight > 0;
        if (!isContentMeasured) {
            return (
                <View style={styles.invisible} onLayout={this.measureContent}>
                    {this.renderContent()}
                </View>
            );
        }

        const {
            tooltipWrapperStyle,
            pointerWrapperStyle,
            pointerStyle,
        } = getTooltipStyles(
            1,
            this.props.windowWidth,
            this.state.xOffset,
            this.state.yOffset,
            this.state.wrapperWidth,
            this.state.wrapperHeight,
            undefined,
            this.state.contentWidth,
            this.state.contentHeight,
        );

        return (
            <>
                {this.state.isVisible && (
                    ReactDOM.createPortal(
                        <View style={tooltipWrapperStyle}>
                            {this.renderContent()}

                            <View style={pointerWrapperStyle}>
                                <View style={pointerStyle} />
                            </View>
                        </View>,
                        document.querySelector('body'),
                    )
                )}
                <Hoverable
                    absolute={false}
                    onHoverIn={this.showTooltip}
                    onHoverOut={this.hideTooltip}
                >
                    <View ref={this.wrapperRef}>
                        {this.props.children}
                    </View>
                </Hoverable>
            </>
        );
    }
}

ReactionTooltip.propTypes = propTypes;

export default withWindowDimensions(ReactionTooltip);
