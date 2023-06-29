import React from 'react';
import PropTypes from 'prop-types';
import ONYXKEYS from '../ONYXKEYS';
import createOnyxContext from './createOnyxContext';
import ComposeProviders from './ComposeProviders';

// Set up any providers for individual keys. This should only be used in cases where many components will subscribe to
// the same key (e.g. FlatList renderItem components)
const [withNetwork, NetworkProvider, NetworkContext] = createOnyxContext(ONYXKEYS.NETWORK, {});
const [withPersonalDetails, PersonalDetailsProvider] = createOnyxContext(ONYXKEYS.PERSONAL_DETAILS_LIST);
const [withCurrentDate, CurrentDateProvider] = createOnyxContext(ONYXKEYS.CURRENT_DATE);
const [withReportActionsDrafts, ReportActionsDraftsProvider] = createOnyxContext(ONYXKEYS.COLLECTION.REPORT_ACTIONS_DRAFTS);
const [withBlockedFromConcierge, BlockedFromConciergeProvider] = createOnyxContext(ONYXKEYS.NVP_BLOCKED_FROM_CONCIERGE);
const [withBetas, BetasProvider] = createOnyxContext(ONYXKEYS.BETAS);
const [withSession, SessionProvider, SessionContext] = createOnyxContext(ONYXKEYS.SESSION, {});
const [withSkinTone, SkinToneProvider, SkinToneContext] = createOnyxContext(ONYXKEYS.PREFERRED_EMOJI_SKIN_TONE, {})
const [withReports, ReportsProvider, ReportsContext] = createOnyxContext(ONYXKEYS.COLLECTION.REPORT, {})
const [withPolices, PoliciesProvider, PolicesContext] = createOnyxContext(ONYXKEYS.COLLECTION.POLICY, {})
const [withIsFirstTimeNewExpensifyUser, IsFirstTimeNewExpensifyUserProvider, IsFirstTimeNewExpensifyUserContext] = createOnyxContext(ONYXKEYS.NVP_IS_FIRST_TIME_NEW_EXPENSIFY_USER, {})
const [withAccountManagerReportId, AccountManagerReportIdProvider, AccountManagerReportIdContext] = createOnyxContext(ONYXKEYS.ACCOUNT_MANAGER_REPORT_ID, {})
const [withIsSidebarLoaded, IsSidebarLoadedProvider, IsSidebarLoadedContext] = createOnyxContext(ONYXKEYS.IS_SIDEBAR_LOADED, {})
const [withReportActions, ReportActionsProvider] = createOnyxContext(ONYXKEYS.COLLECTION.REPORT_ACTIONS);

const propTypes = {
    /** Rendered child component */
    children: PropTypes.node.isRequired,
};

function OnyxProvider(props) {
    return (
        <ComposeProviders components={[ReportActionsProvider, AccountManagerReportIdProvider, IsSidebarLoadedProvider, IsFirstTimeNewExpensifyUserProvider, PoliciesProvider, ReportsProvider, SkinToneProvider, NetworkProvider, PersonalDetailsProvider, ReportActionsDraftsProvider, CurrentDateProvider, BlockedFromConciergeProvider, BetasProvider, SessionProvider]}>
            {props.children}
        </ComposeProviders>
    );
}

OnyxProvider.displayName = 'OnyxProvider';
OnyxProvider.propTypes = propTypes;

export default OnyxProvider;

export {withReportActions, withIsSidebarLoaded, withAccountManagerReportId, withIsFirstTimeNewExpensifyUser, withPolices, withReports, withNetwork, withSkinTone, SessionContext, withSession, withPersonalDetails, withReportActionsDrafts, withCurrentDate, withBlockedFromConcierge, withBetas, NetworkContext};
