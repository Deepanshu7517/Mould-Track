import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./app/layout";
import DashboardPage from "./app/(app)/dashboard/page";
import AppLayout from "./app/(app)/layout";
import LoginPage from "./app/page";
import ValidationPage from "./app/(app)/validation/page";
import PreventiveMaintenancePage from "./app/(app)/preventive-maintenance/page";
import MasterDataPage from "./app/(app)/master-data/page";
import MonitoringPage from "./app/(app)/monitoring/page";
import HealthPage from "./app/(app)/health/page";
import BreakdownsPage from "./app/(app)/breakdowns/page";
import AssetsManagementPage from "./app/(app)/assets-management/page";
import SettingsPage from "./app/(app)/settings/page";
import CheckSheet from "./app/(app)/checkSheet/checkSheet";
import MasterListChecksheet from "./components/mouldDetails/mouldDetails";
import { Counter } from "./toolkit/features/counter/counter";
import { PMScheduleForm } from "./app/(app)/preventive-maintenance/schedule/pm-schedule-forms";
import AnalyticsPage from "./app/(app)/analytics/page";
import QRCodePDFGenerator from "./qrGenerator";
// import { MouldForm } from "./components/ui/MouldForm";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout>
      <AppLayout>
        <DashboardPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/login",
    element: <RootLayout>
      <LoginPage />
    </RootLayout>
  },
  {
    path: "/validation",
    element: <RootLayout>
      <AppLayout>
        <ValidationPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/preventive-maintenance",
    element: <RootLayout>
      <AppLayout>
        <PreventiveMaintenancePage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/preventive-maintenance/form",
    element: <RootLayout>
      <AppLayout>
        <PMScheduleForm />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/master-data",
    element: <RootLayout>
      <AppLayout>
        <MasterDataPage />
      </AppLayout>
    </RootLayout>
  },
  // {
  //   path: "/mould-form",
  //   element: <RootLayout>
  //     <AppLayout>
  //       <MouldForm />
  //     </AppLayout>
  //   </RootLayout>
  // },
  {
    path: "/monitoring",
    element: <RootLayout>
      <AppLayout>
        <MonitoringPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/health",
    element: <RootLayout>
      <AppLayout>
        <HealthPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/breakdowns",
    element: <RootLayout>
      <AppLayout>
        <BreakdownsPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/assets-management",
    element: <RootLayout>
      <AppLayout>
        <AssetsManagementPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/settings",
    element: <RootLayout>
      <AppLayout>
        <SettingsPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/check-sheet",
    element: <RootLayout>
      <AppLayout>
        <CheckSheet />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/analytics",
    element: <RootLayout>
      <AppLayout>
        <AnalyticsPage />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/master-list-checksheet",
    element: <RootLayout>
      <AppLayout>
        <MasterListChecksheet />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/qr-generator",
    element: <RootLayout>
      <AppLayout>
        <QRCodePDFGenerator />
      </AppLayout>
    </RootLayout>
  },
  {
    path: "/counter",
    element: <Counter />
  },
])
const RouterProviderComponent = () => {
  return (
    <RouterProvider router={routes} />
  );
}

export default RouterProviderComponent;