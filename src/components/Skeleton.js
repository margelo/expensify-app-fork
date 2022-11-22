import React, {useContext, useEffect, useMemo} from 'react';
import {View} from 'react-native';
import Reanimated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const SkeletonContext = React.createContext(undefined);

function SkeletonContainer(props) {
    const opacity = useSharedValue(0.3);

    const animatedStyle = useAnimatedStyle(
        () => ({
            opacity: opacity.value,
        }),
        [opacity],
    );

    const context = useMemo(
        () => ({
            animatedStyle,
        }),
        [animatedStyle],
    );

    useEffect(() => {
        opacity.value = withRepeat(
            withTiming(1, {easing: Easing.linear, duration: 700}),
            -1,
            true,
        );
    }, [opacity]);

    return (
        <SkeletonContext.Provider value={context}>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <View {...props} />
        </SkeletonContext.Provider>
    );
}

const propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['circle', 'rectangle']),
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.arrayOf(PropTypes.object)]),
};

const defaultProps = {
    type: 'rectangle',
    style: {},
};

const borderRadiusConfig = {
    circle: 9999,
};

function SkeletonView(props) {
    const context = useContext(SkeletonContext);

    if (context == null) {
        throw new Error(
            'Tried to use <SkeletonView> without wrapping it in <SkeletonContainer>!',
        );
    }

    const borderRadius = borderRadiusConfig[props.type] || 0;

    const style = useMemo(
        () => ({
            ...props.style,
            width: props.width,
            height: props.height,
            borderRadius,
            backgroundColor: '#f0f0f0',
        }),
        ['#f0f0f0', props.height, borderRadius, props.width, props.style],
    );

    return <Reanimated.View style={[style, context.animatedStyle]} />;
}

SkeletonView.propTypes = propTypes;
SkeletonView.defaultProps = defaultProps;

export {SkeletonContainer as Container, SkeletonView as View};

