import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import RootNavigation from '~navigation/RootNavigation';

import './global.css';

// Config react query
const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RootNavigation />
    </QueryClientProvider>
  );
}
