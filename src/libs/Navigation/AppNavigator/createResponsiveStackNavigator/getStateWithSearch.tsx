import type {EventMapBase, ParamListBase, RouteProp} from '@react-navigation/native';
import getTopmostCentralPaneRoute from '@libs/Navigation/getTopmostCentralPaneRoute';
import type {PlatformSpecificEventMap, PlatformSpecificNavigationOptions, PlatformStackNavigationState} from '@libs/Navigation/PlatformStackNavigation/types';
import type {TransformStateProps} from '@libs/Navigation/PlatformStackNavigation/types/NavigatorComponent';
import type {RootStackParamList, State} from '@libs/Navigation/types';
import {isCentralPaneName} from '@libs/NavigationUtils';
import SCREENS from '@src/SCREENS';

type Routes = PlatformStackNavigationState<ParamListBase>['routes'];
function reduceCentralPaneRoutes(routes: Routes): Routes {
    const result: Routes = [];
    let count = 0;
    const reverseRoutes = [...routes].reverse();

    reverseRoutes.forEach((route) => {
        if (isCentralPaneName(route.name)) {
            // Remove all central pane routes except the last 3. This will improve performance.
            if (count < 3) {
                result.push(route);
                count++;
            }
        } else {
            result.push(route);
        }
    });

    return result.reverse();
}

function getStateWithSearch({state, windowDimensions}: TransformStateProps<PlatformSpecificNavigationOptions, PlatformSpecificEventMap & EventMapBase, ParamListBase>) {
    const routes = reduceCentralPaneRoutes(state.routes);

    if (windowDimensions.isSmallScreenWidth) {
        const isSearchCentralPane = (route: RouteProp<ParamListBase>) => getTopmostCentralPaneRoute({routes: [route]} as State<RootStackParamList>)?.name === SCREENS.SEARCH.CENTRAL_PANE;

        const lastRoute = routes[routes.length - 1];
        const lastSearchCentralPane = isSearchCentralPane(lastRoute) ? lastRoute : undefined;
        const filteredRoutes = routes.filter((route) => !isSearchCentralPane(route));

        // On narrow layout, if we are on /search route we want to hide all central pane routes and show only the bottom tab navigator.
        if (lastSearchCentralPane) {
            return {
                stateToRender: {
                    ...state,
                    index: 0,
                    routes: [filteredRoutes[0]],
                },
                searchRoute: lastSearchCentralPane,
            };
        }

        return {
            stateToRender: {
                ...state,
                index: filteredRoutes.length - 1,
                routes: filteredRoutes,
            },
            searchRoute: undefined,
        };
    }

    return {
        stateToRender: {
            ...state,
            index: routes.length - 1,
            routes: [...routes],
        },
        searchRoute: undefined,
    };
}

export default getStateWithSearch;