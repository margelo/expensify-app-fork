import React from 'react';
import {useOnyx} from 'react-native-onyx';
import useLocalize from '@hooks/useLocalize';
import useThemeStyles from '@hooks/useThemeStyles';
import * as ApiUtils from '@libs/ApiUtils';
import * as Network from '@userActions/Network';
import * as Session from '@userActions/Session';
import * as User from '@userActions/User';
import CONFIG from '@src/CONFIG';
import ONYXKEYS from '@src/ONYXKEYS';
import type {User as UserOnyx} from '@src/types/onyx';
import Button from './Button';
import Switch from './Switch';
import TestCrash from './TestCrash';
import TestToolRow from './TestToolRow';
import Text from './Text';

const USER_DEFAULT: UserOnyx = {
    shouldUseStagingServer: undefined,
    isSubscribedToNewsletter: false,
    validated: false,
    isFromPublicDomain: false,
    isUsingExpensifyCard: false,
    isDebugModeEnabled: false,
};

function TestToolMenu() {
    const [network] = useOnyx(ONYXKEYS.NETWORK);
    const [user = USER_DEFAULT] = useOnyx(ONYXKEYS.USER);
    const [isUsingImportedState] = useOnyx(ONYXKEYS.IS_USING_IMPORTED_STATE);
    const shouldUseStagingServer = user?.shouldUseStagingServer ?? ApiUtils.isUsingStagingApi();
    const isDebugModeEnabled = !!user?.isDebugModeEnabled;
    const styles = useThemeStyles();
    const {translate} = useLocalize();

    return (
        <>
            <Text
                style={[styles.textLabelSupporting, styles.mb4]}
                numberOfLines={1}
            >
                {translate('initialSettingsPage.troubleshoot.testingPreferences')}
            </Text>
            {/* When toggled the app will be put into debug mode. */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.debugMode')}>
                <Switch
                    accessibilityLabel={translate('initialSettingsPage.troubleshoot.debugMode')}
                    isOn={isDebugModeEnabled}
                    onToggle={() => User.setIsDebugModeEnabled(!isDebugModeEnabled)}
                />
            </TestToolRow>

            {/* Option to switch between staging and default api endpoints.
        This enables QA, internal testers and external devs to take advantage of sandbox environments for 3rd party services like Plaid and Onfido.
        This toggle is not rendered for internal devs as they make environment changes directly to the .env file. */}
            {!CONFIG.IS_USING_LOCAL_WEB && (
                <TestToolRow title={translate('initialSettingsPage.troubleshoot.useStagingServer')}>
                    <Switch
                        accessibilityLabel="Use Staging Server"
                        isOn={shouldUseStagingServer}
                        onToggle={() => User.setShouldUseStagingServer(!shouldUseStagingServer)}
                    />
                </TestToolRow>
            )}

            {/* When toggled the app will be forced offline. */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.forceOffline')}>
                <Switch
                    accessibilityLabel="Force offline"
                    isOn={!!network?.shouldForceOffline}
                    onToggle={() => Network.setShouldForceOffline(!network?.shouldForceOffline)}
                    disabled={!!isUsingImportedState || !!network?.shouldSimulatePoorConnection || network?.shouldFailAllRequests}
                />
            </TestToolRow>

            {/* When toggled the app will randomly change internet connection every 2-5 seconds */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.simulatePoorConnection')}>
                <Switch
                    accessibilityLabel="Simulate poor internet connection"
                    isOn={!!network?.shouldSimulatePoorConnection}
                    onToggle={() => Network.setShouldSimulatePoorConnection(!network?.shouldSimulatePoorConnection, network?.poorConnectionTimeoutID)}
                    disabled={!!isUsingImportedState || !!network?.shouldFailAllRequests || network?.shouldForceOffline}
                />
            </TestToolRow>

            {/* When toggled all network requests will fail. */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.simulatFailingNetworkRequests')}>
                <Switch
                    accessibilityLabel="Simulate failing network requests"
                    isOn={!!network?.shouldFailAllRequests}
                    onToggle={() => Network.setShouldFailAllRequests(!network?.shouldFailAllRequests)}
                    disabled={!!network?.shouldForceOffline || network?.shouldSimulatePoorConnection}
                />
            </TestToolRow>

            {/* Instantly invalidates a user's local authToken. Useful for testing flows related to reauthentication. */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.authenticationStatus')}>
                <Button
                    small
                    text={translate('initialSettingsPage.troubleshoot.invalidate')}
                    onPress={() => Session.invalidateAuthToken()}
                />
            </TestToolRow>

            {/* Invalidate stored user auto-generated credentials. Useful for manually testing sign out logic. */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.deviceCredentials')}>
                <Button
                    small
                    text={translate('initialSettingsPage.troubleshoot.destroy')}
                    onPress={() => Session.invalidateCredentials()}
                />
            </TestToolRow>

            {/* Sends an expired session to the FE and invalidates the session by the same time in the BE. Action is delayed for 15s */}
            <TestToolRow title={translate('initialSettingsPage.troubleshoot.authenticationStatus')}>
                <Button
                    small
                    text={translate('initialSettingsPage.troubleshoot.invalidateWithDelay')}
                    onPress={() => Session.expireSessionWithDelay()}
                />
            </TestToolRow>

            <TestCrash />
        </>
    );
}

TestToolMenu.displayName = 'TestToolMenu';

export default TestToolMenu;
