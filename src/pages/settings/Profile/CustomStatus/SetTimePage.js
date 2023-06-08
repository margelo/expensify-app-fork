import React from 'react';
import ScreenWrapper from '../../../../components/ScreenWrapper';
import HeaderWithBackButton from '../../../../components/HeaderWithBackButton';
import ROUTES from '../../../../ROUTES';
import Navigation from '../../../../libs/Navigation/Navigation';
import styles from '../../../../styles/styles';
import Form from '../../../../components/Form';
import withLocalize, {withLocalizePropTypes} from '../../../../components/withLocalize';
import TextInput from '../../../../components/TextInput';
import TimeOfDayTabs from '../../../../components/CustomStatus/TimeOfDayTabs';

// TODO: connect to onyx for existing data, or use the form id
function SetTimePage(props) {
    const onSubmit = () => {
        // TODO: save to onyx draft state
        Navigation.goBack(ROUTES.SETTINGS_STATUS_CLEAR_AFTER);
    };

    return (
        <ScreenWrapper includeSafeAreaPaddingBottom={false}>
            <HeaderWithBackButton
                title="Clear after"
                onBackButtonPress={() => Navigation.goBack(ROUTES.SETTINGS_STATUS)}
            />
            <Form
                style={[styles.flexGrow1, styles.ph5]}
                formID="settime"
                validate={() => ({})}
                onSubmit={onSubmit}
                submitButtonText={props.translate('common.save')}
                enabledWhenOffline
            >
                <TextInput />

                <TimeOfDayTabs />
            </Form>
        </ScreenWrapper>
    );
}

SetTimePage.displayName = 'SetTimePage';
SetTimePage.propTypes = withLocalizePropTypes;

export default withLocalize(SetTimePage);
