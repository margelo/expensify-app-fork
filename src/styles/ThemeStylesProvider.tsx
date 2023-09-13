/* eslint-disable react/jsx-props-no-spreading */
import React, {useMemo} from 'react';
import useTheme from './themes/useTheme';
import ThemeStylesContext from './ThemeStylesContext';
// TODO: Rename this to "styles" once the app is migrated to theme switching hooks and HOCs
import {stylesGenerator as stylesUntyped} from './styles';

const styles = stylesUntyped as (theme: Record<string, string>) => Record<string, unknown>;

type ThemeStylesProviderProps = {
    children: React.ReactNode;
};

function ThemeStylesProvider({children}: ThemeStylesProviderProps) {
    const theme = useTheme();

<<<<<<< HEAD
    const appContent = useMemo(
        () => ({
            ...defaultStyles.appContent,
            backgroundColor: theme.appBG,
        }),
        [theme.appBG],
    );
||||||| 1baf33af3b
    const appContentStyle = useMemo(
        () => ({
            ...defaultStyles.appContent,
            backgroundColor: theme.appBG,
        }),
        [theme.appBG],
    );
=======
    const themeStyles = useMemo(() => styles(theme), [theme]);
>>>>>>> @chrispader/re-structure-theme-styles

<<<<<<< HEAD
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

    return <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>;
||||||| 1baf33af3b
    const styles = useMemo(
        () => ({
            ...defaultStyles,
            appContent: appContentStyle,
        }),
        [appContentStyle],
    );

    return <StylesContext.Provider value={styles}>{children}</StylesContext.Provider>;
=======
    return <ThemeStylesContext.Provider value={themeStyles}>{children}</ThemeStylesContext.Provider>;
>>>>>>> @chrispader/re-structure-theme-styles
}

ThemeStylesProvider.displayName = 'ThemeStylesProvider';

export default ThemeStylesProvider;
