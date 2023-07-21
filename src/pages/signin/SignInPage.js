import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import _ from 'underscore';
import {withOnyx} from 'react-native-onyx';
import {View} from 'react-native';
import Str from 'expensify-common/lib/str';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ONYXKEYS from '../../ONYXKEYS';
import styles from '../../styles/styles';
import SignInPageLayout from './SignInPageLayout';
import LoginForm from './LoginForm';
import PasswordForm from './PasswordForm';
import ValidateCodeForm from './ValidateCodeForm';
import ResendValidationForm from './ResendValidationForm';
import Performance from '../../libs/Performance';
import * as App from '../../libs/actions/App';
import UnlinkLoginForm from './UnlinkLoginForm';
import EmailDeliveryFailurePage from './EmailDeliveryFailurePage';
import * as Localize from '../../libs/Localize';
import * as StyleUtils from '../../styles/StyleUtils';
import useLocalize from '../../hooks/useLocalize';
import usePermissions from '../../hooks/usePermissions';
import useWindowDimensions from '../../hooks/useWindowDimensions';
import Log from '../../libs/Log';

const propTypes = {
    /** The details about the account that the user is signing in with */
    account: PropTypes.shape({
        /** Error to display when there is an account error returned */
        errors: PropTypes.objectOf(PropTypes.string),

        /** Whether the account is validated */
        validated: PropTypes.bool,

        /** The primaryLogin associated with the account */
        primaryLogin: PropTypes.string,

        /** Has the user pressed the forgot password button? */
        forgotPassword: PropTypes.bool,

        /** Does this account require 2FA? */
        requiresTwoFactorAuth: PropTypes.bool,

        /** Is this account having trouble receiving emails */
        hasEmailDeliveryFailure: PropTypes.bool,
    }),

    /** The credentials of the person signing in */
    credentials: PropTypes.shape({
        login: PropTypes.string,
        password: PropTypes.string,
        twoFactorAuthCode: PropTypes.string,
        validateCode: PropTypes.string,
    }),
};

const defaultProps = {
    account: {},
    credentials: {},
};

/**
 * @param {Boolean} hasLogin
 * @param {Boolean} hasPassword
 * @param {Boolean} hasValidateCode
 * @param {Boolean} isPrimaryLogin
 * @param {Boolean} isAccountValidated
 * @param {Boolean} didForgetPassword
 * @param {Boolean} canUsePasswordlessLogins
 * @param {Boolean} hasEmailDeliveryFailure
 * @returns {Object}
 */
function getRenderOptions({hasLogin, hasPassword, hasValidateCode, hasAccount, isPrimaryLogin, isAccountValidated, didForgetPassword, canUsePasswordlessLogins, hasEmailDeliveryFailure}) {
    const shouldShowLoginForm = !hasLogin && !hasValidateCode;
    const shouldShowEmailDeliveryFailurePage = hasLogin && hasEmailDeliveryFailure;
    const isUnvalidatedSecondaryLogin = hasLogin && !isPrimaryLogin && !isAccountValidated && !shouldShowEmailDeliveryFailurePage;
    const shouldShowPasswordForm =
        hasLogin && isAccountValidated && !hasPassword && !didForgetPassword && !isUnvalidatedSecondaryLogin && !canUsePasswordlessLogins && !shouldShowEmailDeliveryFailurePage;
    const shouldShowValidateCodeForm = hasAccount && (hasLogin || hasValidateCode) && !isUnvalidatedSecondaryLogin && canUsePasswordlessLogins && !shouldShowEmailDeliveryFailurePage;
    const shouldShowResendValidationForm =
        hasLogin && (!isAccountValidated || didForgetPassword) && !isUnvalidatedSecondaryLogin && !canUsePasswordlessLogins && !shouldShowEmailDeliveryFailurePage;
    const shouldShowWelcomeHeader = shouldShowLoginForm || shouldShowPasswordForm || shouldShowValidateCodeForm || isUnvalidatedSecondaryLogin || shouldShowEmailDeliveryFailurePage;
    const shouldShowWelcomeText = shouldShowLoginForm || shouldShowPasswordForm || shouldShowValidateCodeForm;
    return {
        shouldShowLoginForm,
        shouldShowEmailDeliveryFailurePage,
        shouldShowUnlinkLoginForm: isUnvalidatedSecondaryLogin,
        shouldShowPasswordForm,
        shouldShowValidateCodeForm,
        shouldShowResendValidationForm,
        shouldShowWelcomeHeader,
        shouldShowWelcomeText,
    };
}

function SignInPage({credentials, account}) {
    const {translate, formatPhoneNumber} = useLocalize();
    const {canUsePasswordlessLogins} = usePermissions();
    const {isSmallScreenWidth} = useWindowDimensions();
    const safeAreaInsets = useSafeAreaInsets();

    useEffect(() => Performance.measureTTI(), []);
    useEffect(() => {
        App.setLocale(Localize.getDevicePreferredLocale());
    }, []);

    const {
        shouldShowLoginForm,
        shouldShowEmailDeliveryFailurePage,
        shouldShowUnlinkLoginForm,
        shouldShowPasswordForm,
        shouldShowValidateCodeForm,
        shouldShowResendValidationForm,
        shouldShowWelcomeHeader,
        shouldShowWelcomeText,
    } = getRenderOptions({
        hasLogin: Boolean(credentials.login),
        hasPassword: Boolean(credentials.password),
        hasValidateCode: Boolean(credentials.validateCode),
        hasAccount: !_.isEmpty(account),
        isPrimaryLogin: !account.primaryLogin || account.primaryLogin === credentials.login,
        isAccountValidated: Boolean(account.validated),
        didForgetPassword: Boolean(account.forgotPassword),
        canUsePasswordlessLogins,
        hasEmailDeliveryFailure: Boolean(account.hasEmailDeliveryFailure),
    });

    let welcomeHeader;
    let welcomeText;
    if (shouldShowValidateCodeForm || shouldShowResendValidationForm) {
        if (account.requiresTwoFactorAuth) {
            // We will only know this after a user signs in successfully, without their 2FA code
            welcomeHeader = isSmallScreenWidth ? '' : translate('welcomeText.welcomeBack');
            welcomeText = translate('validateCodeForm.enterAuthenticatorCode');
        } else {
            const userLogin = Str.removeSMSDomain(credentials.login || '');

            // replacing spaces with "hard spaces" to prevent breaking the number
            const userLoginToDisplay = Str.isSMSLogin(userLogin) ? formatPhoneNumber(userLogin).replace(/ /g, '\u00A0') : userLogin;
            if (account.validated) {
                welcomeHeader = isSmallScreenWidth ? '' : translate('welcomeText.welcomeBack');
                welcomeText = isSmallScreenWidth
                    ? `${translate('welcomeText.welcomeBack')} ${translate('welcomeText.welcomeEnterMagicCode', {login: userLoginToDisplay})}`
                    : translate('welcomeText.welcomeEnterMagicCode', {login: userLoginToDisplay});
            } else {
                welcomeHeader = isSmallScreenWidth ? '' : translate('welcomeText.welcome');
                welcomeText = isSmallScreenWidth
                    ? `${translate('welcomeText.welcome')} ${translate('welcomeText.newFaceEnterMagicCode', {login: userLoginToDisplay})}`
                    : translate('welcomeText.newFaceEnterMagicCode', {login: userLoginToDisplay});
            }
        }
    } else if (shouldShowPasswordForm) {
        welcomeHeader = isSmallScreenWidth ? '' : translate('welcomeText.welcomeBack');
        welcomeText = isSmallScreenWidth ? `${translate('welcomeText.welcomeBack')} ${translate('welcomeText.enterPassword')}` : translate('welcomeText.enterPassword');
    } else if (shouldShowUnlinkLoginForm || shouldShowEmailDeliveryFailurePage) {
        welcomeHeader = isSmallScreenWidth ? translate('login.hero.header') : translate('welcomeText.welcomeBack');

        // Don't show any welcome text if we're showing the user the email delivery failed view
        if (shouldShowEmailDeliveryFailurePage) {
            welcomeText = '';
        }
    } else if (!shouldShowResendValidationForm) {
        welcomeHeader = isSmallScreenWidth ? translate('login.hero.header') : translate('welcomeText.getStarted');
        welcomeText = isSmallScreenWidth ? translate('welcomeText.getStarted') : '';
    } else {
        Log.warn('SignInPage in unexpected state!');
    }

    // useEffect(() => {
    //     window.setSupportToken(
    //         'CFDA659151AFA9FF41053DF3FC399C87D36A01F3AA585EB9EF2AE31C8B3E58470D374807E3A6D8F48DCD5A6ECA45CF914504E73C134BCCDB2644FA3EF9BA23B6E6D1B3D7B12C7B5230B810C7D6C754484FB0F3E00EDD32991B71BF7203173E7929AF8C2DD6517C4DC3291E2DDED4116EB068D56B68D397B079B23ABD4EAD682FCBA92D35F5984CCBB92DEB31045021B25BC960B490E53DCAFAA73ABD54C3919FD797817BB0F0918FCC9E29B0F2599701E6ACF2F9785A93FF0C2C008FA59365E20460FCA14F90490E756575CD9EB9858BE41FABAB42A957D984688FF5806E82B6FE67E83C882B0B0FCECFE8AC6F3B10FEFAB9CA6EF7B144C91E9A65825C4AA8A2DCEBAE5BA249459F1518EB53A15490882285771C37CF2B64F5AC4FD605D710AA069198842214852475EFD98A4E254950446BA3EE399981EFEDD7FDD907F43FB1D38B5EE9424C9C0FF8457193175CF6111FF6BF06B425BA33DE81466D8E4C5E02',
    //         'savannah.green@team.expensify.com',
    //         '11538126',
    //     );
    // }, []);

    return (
        // Bottom SafeAreaView is removed so that login screen svg displays correctly on mobile.
        // The SVG should flow under the Home Indicator on iOS.
        <View style={[styles.signInPage, StyleUtils.getSafeAreaPadding({...safeAreaInsets, bottom: 0}, 1)]}>
            <SignInPageLayout
                welcomeHeader={welcomeHeader}
                welcomeText={welcomeText}
                shouldShowWelcomeHeader={shouldShowWelcomeHeader || !isSmallScreenWidth}
                shouldShowWelcomeText={shouldShowWelcomeText}
            >
                {/* LoginForm and PasswordForm must use the isVisible prop. This keeps them mounted, but visually hidden
                    so that password managers can access the values. Conditionally rendering these components will break this feature. */}
                <LoginForm
                    isVisible={shouldShowLoginForm}
                    blurOnSubmit={account.validated === false}
                />
                {shouldShowValidateCodeForm ? <ValidateCodeForm /> : <PasswordForm isVisible={shouldShowPasswordForm} />}
                {shouldShowResendValidationForm && <ResendValidationForm />}
                {shouldShowUnlinkLoginForm && <UnlinkLoginForm />}
                {shouldShowEmailDeliveryFailurePage && <EmailDeliveryFailurePage />}
            </SignInPageLayout>
        </View>
    );
}

SignInPage.propTypes = propTypes;
SignInPage.defaultProps = defaultProps;
SignInPage.displayName = 'SignInPage';

export default withOnyx({
    account: {key: ONYXKEYS.ACCOUNT},
    credentials: {key: ONYXKEYS.CREDENTIALS},
})(SignInPage);
