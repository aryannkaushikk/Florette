import Sidebar from "../components/Sidebar";
import PeriodForm from "../components/PeriodForm";
import TrackerCalender from "../components/TrackerCalender";
import CycleSummaryCard from "../components/CycleSummaryCard";
import { usePeriodLogs } from "../hooks/usePeriodLogs";
import { useAuth } from "../context/AuthContext";

export default function Tracker({ sidebarVisible, setSidebarVisible, setShowLogoutDialog, showLogoutDialog}) {
  const { user } = useAuth();
  const { data: periodLogs, isLoading } = usePeriodLogs(user?.id);

  return (
    <div className="bg-rose-300 min-h-screen flex relative">
      <Sidebar
        color="rose"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setShowLogoutDialog={setShowLogoutDialog}
        showLogoutDialog={showLogoutDialog}
      />

      <main className="flex-1 flex flex-col px-6 py-8 md:px-12 lg:px-18">
        <h1 className="text-3xl font-bold text-rose-600 mb-15">
          Period Tracker
        </h1>

        <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div className="flex flex-col w-full max-w-xl items-start gap-6">
            <PeriodForm />
            {periodLogs?.length > 0 && (
              <CycleSummaryCard periodLogs={periodLogs} />
            )}
          </div>
          <TrackerCalender periodLogs={periodLogs} />
        </div>
      </main>
    </div>
  );
}
