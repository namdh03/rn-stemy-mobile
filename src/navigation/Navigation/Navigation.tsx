import { useShallow } from 'zustand/react/shallow';

import { NavigationContainer } from '@react-navigation/native';

import LoadingOverlay from '~components/customs/LoadingOverlay';
import configs from '~configs';
import constants from '~constants';
import { Role } from '~graphql/graphql';
import { useAppIsReady, useColorScheme, usePushNotifications } from '~hooks';
import AuthStack from '~navigation/AuthStack';
import RootStack from '~navigation/RootStack';
import StaffStack from '~navigation/StaffStack';
import { useStore } from '~store';

const Navigation = () => {
  usePushNotifications();
  const { isDarkColorScheme } = useColorScheme();
  const { isLoading, appIsReady, onLayoutRootView } = useAppIsReady();
  const { isAuthenticated, user } = useStore(
    useShallow((state) => ({
      isAuthenticated: state.isAuthenticated,
      user: state.user,
    })),
  );

  const renderNavigator = () => {
    if (!isAuthenticated || !user) {
      return <AuthStack />;
    }

    switch (user.role) {
      case Role.Customer:
        return <RootStack />;
      case Role.Staff:
        return <StaffStack />;
    }
  };

  if (isLoading) {
    return <LoadingOverlay message='Loading...' loop />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer
      linking={configs.linking}
      onReady={onLayoutRootView}
      theme={isDarkColorScheme ? constants.THEME.DARK_THEME : constants.THEME.LIGHT_THEME}
    >
      {renderNavigator()}
    </NavigationContainer>
  );
};

export default Navigation;
