import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import CONST from '../../CONST';
import * as Skeleton from '../Skeleton';

const propTypes = {
    /** Number of rows to show in Skeleton UI block */
    numberOfRows: PropTypes.number.isRequired,
    animate: PropTypes.bool,
};

const defaultTypes = {
    animate: true,
};

const SkeletonViewLines = props => (
    <View
        animate={props.animate}
        style={{
            width: '100%',
            flexDirection: 'row',
            height: CONST.CHAT_SKELETON_VIEW.HEIGHT_FOR_ROW_COUNT[props.numberOfRows],
        }}
    >
        <Skeleton.View
            type="circle"
            height={40}
            width={40}
            style={{
                left: 20,
                top: 13,
            }}
        />
        <View style={{
            paddingLeft: 28,
            width: '93%',
        }}
        >
            <Skeleton.View
                type="rectangle"
                height={8}
                width="20%"
                style={{
                    top: 18,
                }}
            />
            <Skeleton.View
                type="rectangle"
                height={8}
                width="100%"
                style={{
                    top: 30,
                }}
            />
            {props.numberOfRows > 1 && (
            <Skeleton.View
                type="rectangle"
                height={8}
                width="50%"
                style={{
                    top: 42,
                }}
            />
            )}
            {props.numberOfRows > 2 && (
            <Skeleton.View
                type="rectangle"
                height={8}
                width="50%"
                style={{
                    top: 54,
                }}
            />
            )}
        </View>
    </View>

    // <SkeletonViewContentLoader
    //     animate={props.animate}
    //     height={CONST.CHAT_SKELETON_VIEW.HEIGHT_FOR_ROW_COUNT[props.numberOfRows]}
    //     backgroundColor={themeColors.highlightBG}
    //     foregroundColor={themeColors.border}
    //     style={styles.mr5}
    // >
    //     <Circle cx="40" cy="26" r="20" />
    //     <Rect x="67" y="11" width="20%" height="8" />
    //     <Rect x="67" y="31" width="100%" height="8" />
    //     {props.numberOfRows > 1 && <Rect x="67" y="51" width="50%" height="8" />}
    //     {props.numberOfRows > 2 && <Rect x="67" y="71" width="50%" height="8" />}
    // </SkeletonViewContentLoader>
);

SkeletonViewLines.displayName = 'SkeletonViewLines';
SkeletonViewLines.propTypes = propTypes;
SkeletonViewLines.defaultProps = defaultTypes;
export default SkeletonViewLines;
