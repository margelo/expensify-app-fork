import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import {View} from 'react-native';
import Hoverable from '../../../../components/Hoverable';
import getTooltipStyles from '../../../../styles/getTooltipStyles';
import withWindowDimensions, {windowDimensionsPropTypes} from '../../../../components/withWindowDimensions';

const propTypes = {
    children: PropTypes.node.isRequired,

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
        };

        this.wrapperRef = React.createRef();

        this.showTooltip = this.showTooltip.bind(this);
        this.hideTooltip = this.hideTooltip.bind(this);
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

    render() {
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
            100,
            50,
            50,
            50,
        );

        return (
            <>
                {this.state.isVisible && (
                    ReactDOM.createPortal(
                        <View style={tooltipWrapperStyle}>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: 'red',
                            }}
                            />

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
