/* eslint-disable react/jsx-props-no-spreading */
import React, {useMemo} from 'react';
import PropTypes from 'prop-types';
import ThemeContext from './ThemeContext';
import useThemePreference from './useThemePreference';
import CONST from '../../CONST';

// Going to eventually import the light theme here too
import darkTheme from './default';

const propTypes = {
    /** Rendered child component */
    children: PropTypes.node.isRequired,
};

function ThemeProvider(props) {
    const themePreference = useThemePreference();

    const theme = useMemo(
        () =>
            themePreference === CONST.THEME.LIGHT
                ? /* TODO: replace with light theme */ {
                      ...darkTheme,
                      sidebar: '#F8F4F0',
                      sidebarHover: '#F8F4F0',
                      border: '#EBE6DF',
                      text: '#002E22',
                      textSupporting: '#76847E',
                      activeComponentBG: '#EBE6DF',
                      success: '#EBE6DF',
                      icon: '#A2A9A3',
                  }
                : darkTheme,
        [themePreference],
    );

    return <ThemeContext.Provider value={theme}>{props.children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = propTypes;
ThemeProvider.displayName = 'ThemeProvider';

export default ThemeProvider;
