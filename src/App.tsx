import React, {lazy, Suspense} from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { RouterProvider, useRouter } from './router/Router';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/common/Toast';
import { CommandPaletteProvider } from './context/CommandPaletteContext';
import { AnnouncementBar } from './components/navbar/AnnouncementBar';
import { Navbar } from './components/navbar/Navbar';
import { Footer } from './components/footer/Footer';
import { CommandPalette } from './components/ui/CommandPalette';
import { ExploreDemoModal } from './components/ui/ExploreDemoModal';

// CRM Workspace Layouts
import { CrmLayout } from './layouts/CrmLayout';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';

// Load route pages only when a user visits them.
const HomePage = lazy(() => import('./pages/HomePage').then((module) => ({default: module.HomePage})));
const FeaturesPage = lazy(() => import('./pages/FeaturesPage').then((module) => ({default: module.FeaturesPage})));
const SolutionsPage = lazy(() => import('./pages/SolutionsPage').then((module) => ({default: module.SolutionsPage})));
const IntegrationsPage = lazy(() => import('./pages/IntegrationsPage').then((module) => ({default: module.IntegrationsPage})));
const PricingPage = lazy(() => import('./pages/PricingPage').then((module) => ({default: module.PricingPage})));
const ResourcesPage = lazy(() => import('./pages/ResourcesPage').then((module) => ({default: module.ResourcesPage})));
const AboutPage = lazy(() => import('./pages/AboutPage').then((module) => ({default: module.AboutPage})));
const ContactPage = lazy(() => import('./pages/ContactPage').then((module) => ({default: module.ContactPage})));
const DemoPage = lazy(() => import('./pages/DemoPage').then((module) => ({default: module.DemoPage})));
const LoginPage = lazy(() => import('./pages/LoginPage').then((module) => ({default: module.LoginPage})));
const SignupPage = lazy(() => import('./pages/SignupPage').then((module) => ({default: module.SignupPage})));
const DashboardOverviewPage = lazy(() => import('./pages/crm/DashboardOverviewPage').then((module) => ({default: module.DashboardOverviewPage})));
const LeadsPage = lazy(() => import('./pages/crm/LeadsPage').then((module) => ({default: module.LeadsPage})));
const PipelinePage = lazy(() => import('./pages/crm/PipelinePage').then((module) => ({default: module.PipelinePage})));
const DealsPage = lazy(() => import('./pages/crm/DealsPage').then((module) => ({default: module.DealsPage})));
const CustomersPage = lazy(() => import('./pages/crm/CustomersPage').then((module) => ({default: module.CustomersPage})));
const CompaniesPage = lazy(() => import('./pages/crm/CompaniesPage').then((module) => ({default: module.CompaniesPage})));
const TasksPage = lazy(() => import('./pages/crm/TasksPage').then((module) => ({default: module.TasksPage})));
const CallsPage = lazy(() => import('./pages/crm/CallsPage').then((module) => ({default: module.CallsPage})));
const ActivitiesPage = lazy(() => import('./pages/crm/ActivitiesPage').then((module) => ({default: module.ActivitiesPage})));
const ReportsPage = lazy(() => import('./pages/crm/ReportsPage').then((module) => ({default: module.ReportsPage})));
const TeamPage = lazy(() => import('./pages/crm/TeamPage').then((module) => ({default: module.TeamPage})));
const WorkflowsPage = lazy(() => import('./pages/crm/WorkflowsPage').then((module) => ({default: module.WorkflowsPage})));
const CrmIntegrationsPage = lazy(() => import('./pages/crm/IntegrationsPage').then((module) => ({default: module.CrmIntegrationsPage})));
const SettingsPage = lazy(() => import('./pages/crm/SettingsPage').then((module) => ({default: module.SettingsPage})));
const SuperAdminPage = lazy(() => import('./pages/crm/SuperAdminPage').then((module) => ({default: module.SuperAdminPage})));

const RouteLoading: React.FC = () => (
  <div className="flex min-h-[40vh] items-center justify-center text-sm text-slate-500" role="status">
    Loading page...
  </div>
);

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const { currentPath } = useNavigation();

  // Active path determined by router
  const activePath = path || currentPath || '/';

  // 1. Super Admin Portal
  if (activePath.startsWith('/super-admin')) {
    return (
      <SuperAdminLayout>
        <Suspense fallback={<RouteLoading />}>
          <SuperAdminPage />
        </Suspense>
      </SuperAdminLayout>
    );
  }

  // 2. CRM Workspace
  if (activePath.startsWith('/app')) {
    const renderCrmPage = () => {
      if (activePath.startsWith('/app/leads')) return <LeadsPage />;
      if (activePath.startsWith('/app/pipeline')) return <PipelinePage />;
      if (activePath.startsWith('/app/deals')) return <DealsPage />;
      if (activePath.startsWith('/app/customers')) return <CustomersPage />;
      if (activePath.startsWith('/app/companies')) return <CompaniesPage />;
      if (activePath.startsWith('/app/tasks')) return <TasksPage />;
      if (activePath.startsWith('/app/calls')) return <CallsPage />;
      if (activePath.startsWith('/app/activities')) return <ActivitiesPage />;
      if (activePath.startsWith('/app/reports')) return <ReportsPage />;
      if (activePath.startsWith('/app/team')) return <TeamPage />;
      if (activePath.startsWith('/app/workflows')) return <WorkflowsPage />;
      if (activePath.startsWith('/app/integrations')) return <CrmIntegrationsPage />;
      if (activePath.startsWith('/app/settings')) return <SettingsPage />;
      return <DashboardOverviewPage />;
    };

    return (
      <CrmLayout>
        <Suspense fallback={<RouteLoading />}>{renderCrmPage()}</Suspense>
      </CrmLayout>
    );
  }

  // 3. Auth Pages
  const isAuthPage = activePath === '/login' || activePath === '/signup';

  const renderPublicPage = () => {
    switch (activePath) {
      case '/features':
        return <FeaturesPage />;
      case '/solutions':
        return <SolutionsPage />;
      case '/integrations':
        return <IntegrationsPage />;
      case '/pricing':
        return <PricingPage />;
      case '/resources':
        return <ResourcesPage />;
      case '/about':
        return <AboutPage />;
      case '/contact':
        return <ContactPage />;
      case '/demo':
        return <DemoPage />;
      case '/login':
        return <LoginPage />;
      case '/signup':
        return <SignupPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f8f6] text-slate-900 dark:bg-[#071714] dark:text-slate-100 transition-colors selection:bg-indigo-200 selection:text-indigo-950">
      {!isAuthPage && <AnnouncementBar />}
      <Navbar />
      <main className="flex-1 w-full">
        <Suspense fallback={<RouteLoading />}>{renderPublicPage()}</Suspense>
      </main>
      {!isAuthPage && <Footer />}
      <CommandPalette />
      <ExploreDemoModal />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <NavigationProvider>
          <AuthProvider>
            <ToastProvider>
              <CommandPaletteProvider>
                <AppContent />
              </CommandPaletteProvider>
            </ToastProvider>
          </AuthProvider>
        </NavigationProvider>
      </RouterProvider>
    </ThemeProvider>
  );
}
