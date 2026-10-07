import React from 'react';
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

// Public Marketing Pages
import { HomePage } from './pages/HomePage';
import { FeaturesPage } from './pages/FeaturesPage';
import { SolutionsPage } from './pages/SolutionsPage';
import { IntegrationsPage } from './pages/IntegrationsPage';
import { PricingPage } from './pages/PricingPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { DemoPage } from './pages/DemoPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';

// CRM Workspace Pages & Layouts
import { CrmLayout } from './layouts/CrmLayout';
import { SuperAdminLayout } from './layouts/SuperAdminLayout';
import { DashboardOverviewPage } from './pages/crm/DashboardOverviewPage';
import { LeadsPage } from './pages/crm/LeadsPage';
import { PipelinePage } from './pages/crm/PipelinePage';
import { DealsPage } from './pages/crm/DealsPage';
import { CustomersPage } from './pages/crm/CustomersPage';
import { CompaniesPage } from './pages/crm/CompaniesPage';
import { TasksPage } from './pages/crm/TasksPage';
import { CallsPage } from './pages/crm/CallsPage';
import { ActivitiesPage } from './pages/crm/ActivitiesPage';
import { ReportsPage } from './pages/crm/ReportsPage';
import { TeamPage } from './pages/crm/TeamPage';
import { WorkflowsPage } from './pages/crm/WorkflowsPage';
import { CrmIntegrationsPage } from './pages/crm/IntegrationsPage';
import { SettingsPage } from './pages/crm/SettingsPage';
import { SuperAdminPage } from './pages/crm/SuperAdminPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const { currentPath } = useNavigation();

  // Active path determined by router
  const activePath = path || currentPath || '/';

  // 1. Super Admin Portal
  if (activePath.startsWith('/super-admin')) {
    return (
      <SuperAdminLayout>
        <SuperAdminPage />
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

    return <CrmLayout>{renderCrmPage()}</CrmLayout>;
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
      <main className="flex-1 w-full">{renderPublicPage()}</main>
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
