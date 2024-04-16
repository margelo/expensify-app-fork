import React from 'react';
import {Platform, View} from 'react-native';
import NoDropZone from '@components/DragAndDrop/NoDropZone';
import useOnboardingLayout from '@hooks/useOnboardingLayout';
import useThemeStyles from '@hooks/useThemeStyles';
import useNativeModalScreenOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/modalScreenOptions/useNativeModalScreenOptions';
import useWebModalScreenOptions from '@libs/Navigation/AppNavigator/ModalStackNavigators/modalScreenOptions/useWebModalScreenOptions';
import createPlatformStackNavigator from '@libs/Navigation/createPlatformStackNavigator';
import type {OnboardingModalNavigatorParamList} from '@libs/Navigation/types';
import OnboardingPersonalDetails from '@pages/OnboardingPersonalDetails';
import OnboardingPurpose from '@pages/OnboardingPurpose';
import SCREENS from '@src/SCREENS';
import Overlay from './Overlay';

const Stack = createPlatformStackNavigator<OnboardingModalNavigatorParamList>();

function OnboardingModalNavigator() {
    const styles = useThemeStyles();
    const {shouldUseNarrowLayout} = useOnboardingLayout();
    // const screenOptions = useMemo(() => OnboardingModalNavigatorScreenOptions(), [])
    const nativeScreenOptions = useNativeModalScreenOptions();
    const webScreenOptions = useWebModalScreenOptions();
    const screenOptions = Platform.OS === 'ios' || Platform.OS === 'android' ? nativeScreenOptions : webScreenOptions;

    return (
        <NoDropZone>
            <Overlay />
            <View style={styles.onboardingNavigatorOuterView}>
                <View style={styles.OnboardingNavigatorInnerView(shouldUseNarrowLayout)}>
                    <Stack.Navigator screenOptions={screenOptions}>
                        <Stack.Screen
                            name={SCREENS.ONBOARDING.PERSONAL_DETAILS}
                            component={OnboardingPersonalDetails}
                        />
                        <Stack.Screen
                            name={SCREENS.ONBOARDING.PURPOSE}
                            component={OnboardingPurpose}
                        />
                    </Stack.Navigator>
                </View>
            </View>
        </NoDropZone>
    );
}

OnboardingModalNavigator.displayName = 'OnboardingModalNavigator';

export default OnboardingModalNavigator;
