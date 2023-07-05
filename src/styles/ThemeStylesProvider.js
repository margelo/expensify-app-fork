/* eslint-disable react/jsx-props-no-spreading */
import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import useTheme from './themes/useTheme';
import StylesContext from './ThemeStylesContext';
import defaultStyles from './styles';

const propTypes = {
    children: PropTypes.node.isRequired,
};

function ThemeStylesProvider(props) {
    const theme = useTheme();

    const appContent = useMemo(
        () => ({
            ...defaultStyles.appContent,
            backgroundColor: theme.appBG,
        }),
        [theme.appBG],
    );

    const sidebar = useMemo(
        () => ({
            ...defaultStyles.sidebar,
            backgroundColor: theme.sidebar,
        }),
        [theme.sidebar],
    );

    const sidebarLinkHover = useMemo(
        () => ({
            ...defaultStyles.sidebarLinkHover,
            backgroundColor: theme.sidebarHover,
        }),
        [theme.sidebarHover],
    );

    const sidebarLinkActive = useMemo(
        () => ({
            ...defaultStyles.sidebarLinkActive,
            backgroundColor: theme.border,
        }),
        [theme.border],
    );

    const sidebarLinkActiveText = useMemo(
        () => ({
            ...defaultStyles.sidebarLinkActiveText,
            color: theme.textSupporting,
        }),
        [theme.textSupporting],
    );

    const sidebarLinkText = useMemo(
        () => ({
            ...defaultStyles.sidebarLinkText,
            color: theme.textSupporting,
        }),
        [theme.textSupporting],
    );

    const styles = useMemo(
        () => ({
            appContent,
            sidebar,
            sidebarLinkHover,
            sidebarLinkActive,
            sidebarLinkActiveText,
            sidebarLinkText,
        }),
        [appContent, sidebar, sidebarLinkActive, sidebarLinkActiveText, sidebarLinkHover, sidebarLinkText],
    );

    return <StylesContext.Provider value={styles}>{props.children}</StylesContext.Provider>;
}
ThemeStylesProvider.propTypes = propTypes;
ThemeStylesProvider.displayName = 'ThemeStylesProvider';

export default ThemeStylesProvider;
