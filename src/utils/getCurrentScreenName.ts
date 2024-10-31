import { NavigationState, Route } from '@react-navigation/native';

// Type guard to check if a route has a nested state
const hasNestedState = (
  route: Route<string> | (Route<string> & { state?: NavigationState }),
): route is Route<string> & { state: NavigationState } => {
  return !!(route as Route<string> & { state?: NavigationState }).state;
};

const getCurrentScreenName = (
  route: Route<string> | (Route<string> & { state?: NavigationState }),
): string | undefined => {
  let currentRoute = route;

  while (hasNestedState(currentRoute) && currentRoute.state.index !== undefined) {
    currentRoute = currentRoute.state.routes[currentRoute.state.index];
  }

  return currentRoute.name;
};

export default getCurrentScreenName;
