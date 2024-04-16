import React from 'react';
import {Platform} from 'react-native';
import createPlatformStackNavigator from '@libs/Navigation/createPlatformStackNavigator';
import type {ThemeStyles} from '@styles/index';
import SCREENS from '@src/SCREENS';
import useNativeModalScreenOptions from './modalScreenOptions/useNativeModalScreenOptions';
import useWebModalScreenOptions from './modalScreenOptions/useWebModalScreenOptions';

const PlatformStackNavigator = createPlatformStackNavigator();

function WorkspaceSettingsModalStackNavigator() {
    const getScreenOptions = (styles: ThemeStyles) => ({cardStyle: styles.navigationScreenCardStyle, headerShown: false});
    const nativeScreenOptions = useNativeModalScreenOptions(getScreenOptions);
    const webScreenOptions = useWebModalScreenOptions(getScreenOptions);
    const screenOptions = Platform.OS === 'ios' || Platform.OS === 'android' ? nativeScreenOptions : webScreenOptions;

    return (
        <PlatformStackNavigator.Navigator screenOptions={screenOptions}>
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.PROFILE}
                name={SCREENS.WORKSPACE.PROFILE}
                getComponent={() => require('@pages/workspace/WorkspaceProfilePage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.CARD}
                name={SCREENS.WORKSPACE.CARD}
                getComponent={() => require('@pages/workspace/card/WorkspaceCardPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.WORKFLOWS}
                name={SCREENS.WORKSPACE.WORKFLOWS}
                getComponent={() => require('@pages/workspace/workflows/WorkspaceWorkflowsPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.REIMBURSE}
                name={SCREENS.WORKSPACE.REIMBURSE}
                getComponent={() => require('@pages/workspace/reimburse/WorkspaceReimbursePage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.BILLS}
                name={SCREENS.WORKSPACE.BILLS}
                getComponent={() => require('@pages/workspace/bills/WorkspaceBillsPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.INVOICES}
                name={SCREENS.WORKSPACE.INVOICES}
                getComponent={() => require('@pages/workspace/invoices/WorkspaceInvoicesPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.TRAVEL}
                name={SCREENS.WORKSPACE.TRAVEL}
                getComponent={() => require('@pages/workspace/travel/WorkspaceTravelPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.MEMBERS}
                name={SCREENS.WORKSPACE.MEMBERS}
                getComponent={() => require('@pages/workspace/WorkspaceMembersPage').default as React.ComponentType}
            />

            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.ACCOUNTING}
                name={SCREENS.WORKSPACE.ACCOUNTING}
                getComponent={() => require('@pages/workspace/accounting/WorkspaceAccountingPage').default as React.ComponentType}
            />

            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.CATEGORIES}
                name={SCREENS.WORKSPACE.CATEGORIES}
                getComponent={() => require('@pages/workspace/categories/WorkspaceCategoriesPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.MORE_FEATURES}
                name={SCREENS.WORKSPACE.MORE_FEATURES}
                getComponent={() => require('@pages/workspace/WorkspaceMoreFeaturesPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.TAGS}
                name={SCREENS.WORKSPACE.TAGS}
                getComponent={() => require('@pages/workspace/tags/WorkspaceTagsPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.TAXES}
                name={SCREENS.WORKSPACE.TAXES}
                getComponent={() => require('@pages/workspace/taxes/WorkspaceTaxesPage').default as React.ComponentType}
            />
            <PlatformStackNavigator.Screen
                key={SCREENS.WORKSPACE.DISTANCE_RATES}
                name={SCREENS.WORKSPACE.DISTANCE_RATES}
                getComponent={() => require('@pages/workspace/distanceRates/PolicyDistanceRatesPage').default as React.ComponentType}
            />
        </PlatformStackNavigator.Navigator>
    );
}

export default WorkspaceSettingsModalStackNavigator;
