import { type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  Route,
  Switch,
  Router as WouterRouter,
} from 'wouter';
import { useHashLocation } from "wouter/use-hash-location";

import { Layout } from './components/layout';
import HomePage from './pages/home';
import SectionPage from './pages/section';
import ApiExplorer from './pages/api-explorer';
import DataDictionary from './pages/data-dictionary';
import Simulator from './pages/simulator';
import Sources from './pages/sources';
import SystemMap from './pages/system-map';

const queryClient = new QueryClient();

function Router() {
  return (
    <Layout>
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/section/:id" component={SectionPage} />
          <Route path="/api-explorer" component={ApiExplorer} />
          <Route path="/data-dictionary" component={DataDictionary} />
          <Route path="/simulator" component={Simulator} />
          <Route path="/sources" component={Sources} />
          <Route path="/system-map" component={SystemMap} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
    </Layout>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useHashLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter hook={useHashLocation}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
