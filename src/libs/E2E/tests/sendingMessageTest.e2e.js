import E2ELogin from '../actions/e2eLogin';
import E2EClient from '../client';
import Navigation from '../../Navigation/Navigation';
import ROUTES from '../../../ROUTES';
import * as Report from '../../actions/Report';
import Performance from '../../Performance';
import CONST from '../../../CONST';

// Same as in apiMocks/openReport
const reportID = '98345625';

const test = () => {
    const email = 'applausetester+perf2@applause.expensifail.com';
    const password = 'Password123';

    console.debug('[E2E] App is ready, logging in…');

    // check for login (if already logged in the action will simply resolve)
    E2ELogin(email, password).then((neededLogin) => {
        if (neededLogin) {
            // we don't want to submit the first login to the results
            return E2EClient.submitTestDone();
        }

        console.debug('[E2E] Logged in, getting metrics and submitting them…');

        // Open report
        Navigation.navigate(ROUTES.getReportRoute(reportID));

        // Wait before trying to send message to get the screen rendered
        setTimeout(() => {
            const reportActionID = Report.addComment(reportID, 'Hello world!');
            Performance.subscribeToMeasurements((entry) => {
                if (entry.name !== `${CONST.TIMING.SEND_ACTION}.${reportActionID}`) {
                    return;
                }

                console.debug('[E2E] Got metrics, submitting them…');
                E2EClient.submitTestResults({
                    name: 'Time for sent message to appear',
                    duration: entry.duration,
                }).then(E2EClient.submitTestDone);
            });
        }, 10_000);
    });
};

export default test;
