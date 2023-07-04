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
const [withReportCommentDrafts, ReportCommentDraftsProvider] = createOnyxContext(ONYXKEYS.COLLECTION.REPORT_DRAFT_COMMENT);
const [withAccountManagerReportID, AccountManagerReportIDProvider] = createOnyxContext(ONYXKEYS.ACCOUNT_MANAGER_REPORT_ID);
const [withSession, SessionProvider, SessionContext] = createOnyxContext(ONYXKEYS.SESSION, {});
const [withSkinTone, SkinToneProvider, SkinToneContext] = createOnyxContext(ONYXKEYS.PREFERRED_EMOJI_SKIN_TONE, {});

const propTypes = {
    /** Rendered child component */
    children: PropTypes.node.isRequired,
};

function OnyxProvider(props) {
    return (
        <ComposeProviders
            components={[
                NetworkProvider,
                PersonalDetailsProvider,
                ReportActionsDraftsProvider,
                CurrentDateProvider,
                BlockedFromConciergeProvider,
                BetasProvider,
                ReportCommentDraftsProvider,
                AccountManagerReportIDProvider,
                SessionProvider,
                SkinToneProvider,
            ]}
        >
            {props.children}
        </ComposeProviders>
    );
}

OnyxProvider.displayName = 'OnyxProvider';
OnyxProvider.propTypes = propTypes;

export default OnyxProvider;

export {
    withSession,
    withSkinTone,
    withAccountManagerReportID,
    withNetwork,
    withPersonalDetails,
    withReportActionsDrafts,
    withCurrentDate,
    withBlockedFromConcierge,
    withBetas,
    NetworkContext,
    withReportCommentDrafts,
};
