import React from 'react';
import {Pressable, View} from 'react-native';
import PropTypes from 'prop-types';
import styles from '../styles/styles';
import Icon from './Icon';
import * as Expensicons from './Icon/Expensicons';
import withWindowDimensions, {windowDimensionsPropTypes} from './withWindowDimensions';
import * as Skeleton from './Skeleton';

const propTypes = {
    ...windowDimensionsPropTypes,
    animate: PropTypes.bool,
};

const defaultProps = {
    animate: true,
};

const ReportHeaderSkeletonView = props => (
    <View style={[styles.appContentHeader]}>
        <View style={[styles.appContentHeaderTitle, !props.isSmallScreenWidth && styles.pl5]}>
            <Pressable
                onPress={() => {}}
                style={[styles.LHNToggle]}
            >
                <Icon src={Expensicons.BackArrow} />
            </Pressable>
            <Skeleton.Container
                animate={props.animate}
                style={{
                    flex: 1,
                    flexDirection: 'row',
                }}
            >
                <Skeleton.View type="circle" height={40} width={40} />
                <View style={{
                    flex: 1,
                }}
                >
                    <Skeleton.View
                        type="rectangle"
                        height={8}
                        width="30%"
                        style={{
                            position: 'absolute',
                            top: 5,
                            left: 15,
                        }}
                    />
                    <Skeleton.View
                        type="rectangle"
                        height={8}
                        width="40%"
                        style={{
                            position: 'absolute',
                            top: 25,
                            left: 15,
                        }}
                    />
                </View>
            </Skeleton.Container>
        </View>
    </View>
);

ReportHeaderSkeletonView.propTypes = propTypes;
ReportHeaderSkeletonView.defaultProps = defaultProps;
ReportHeaderSkeletonView.displayName = 'ReportHeaderSkeletonView';
export default withWindowDimensions(ReportHeaderSkeletonView);
