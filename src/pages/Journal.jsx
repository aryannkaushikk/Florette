import { useState } from "react";
import Sidebar from "../components/Sidebar";
import MoodLogList from "../components/MoodLogList";
import MoodCharts from "../components/MoodCharts";
import NewMoodLogDialog from "../components/NewMoodLogDialog";
import { useFetchMoodLogs } from "../hooks/useFetchMoodLogs";
import { useAddMoodLog } from "../hooks/useAddMoodLog";
import { useDeleteMoodLog } from "../hooks/useDeleteMoodLog";
import { useAuth } from "../context/AuthContext";

export default function Journal({ sidebarVisible, setSidebarVisible, showLogoutDialog, setShowLogoutDialog }) {
  const { user } = useAuth();
  const userId = user?.id;

  // React Query hooks
  const {
    data: moodLogs = [],
    isLoading,
    isError,
    error,
  } = useFetchMoodLogs(userId);
  const addMoodLogMutation = useAddMoodLog();
  const deleteMoodLogMutation = useDeleteMoodLog();

  const [dialogOpen, setDialogOpen] = useState(false);

  const addNewLog = (newLog) => {
    addMoodLogMutation.mutate(
      { ...newLog, user_id: userId }, // include userId when adding new log
      {
        onSuccess: () => setDialogOpen(false),
        onError: (err) => alert("Failed to add mood log: " + err.message),
      }
    );
  };

  const deleteLog = (logId) => {
    deleteMoodLogMutation.mutate(logId, {
      onError: (err) => alert("Failed to delete mood log: " + err.message),
    });
  };

  return (
    <div className="bg-rose-300 min-h-screen flex">
      <Sidebar
        color="rose"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setShowLogoutDialog={setShowLogoutDialog}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Main Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <div className="max-w-screen-xl mx-auto space-y-10 pb-8">
            <h1 className="text-3xl font-bold text-rose-600">Journal</h1>

            <div className="flex gap-6">
              {/* Left: Logs + Button */}
              <div className="w-2/3 space-y-4 overflow-y-auto pr-2">
                <button
                  onClick={() => setDialogOpen(true)}
                  className="bg-rose-700 hover:bg-rose-500 text-white px-4 py-2 rounded-xl shadow-md"
                  disabled={addMoodLogMutation.isLoading}
                >
                  {addMoodLogMutation.isLoading
                    ? "Saving..."
                    : "+ New Mood Log"}
                </button>

                {isLoading && <p>Loading mood logs...</p>}
                {isError && (
                  <p className="text-red-600">
                    Error loading logs: {error.message}
                  </p>
                )}
                {!isLoading && !isError && (
                  <MoodLogList logs={moodLogs} onDelete={deleteLog} />
                )}
              </div>

              {/* Right: Charts */}
              <div className="w-1/3 overflow-y-auto">
                <MoodCharts logs={moodLogs} />
              </div>
            </div>

            <NewMoodLogDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              onSave={addNewLog}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
