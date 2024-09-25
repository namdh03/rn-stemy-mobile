// eslint-disable-next-line simple-import-sort/imports
import './gesture-handler';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import configs from '~configs';
import RootNavigator from '~navigation/RootNavigator';

import './global.css';
import { enableScreens } from 'react-native-screens';

// Config react query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

// Config react native google sign in
GoogleSignin.configure({
  webClientId: configs.env.EXPO_PUBLIC_WEB_CLIENT_ID, // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
});

enableScreens();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigator />
    </QueryClientProvider>
  );
}
