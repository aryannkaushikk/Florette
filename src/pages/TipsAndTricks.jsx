import Sidebar from "../components/Sidebar";
import TipCard from "../components/TipCard";
import PostTipForm from "../components/PostTipForm";
import { useTips } from "../hooks/useTips";

export default function TipsAndTricks({ sidebarVisible, setSidebarVisible, setShowLogoutDialog, showLogoutDialog }) {
  const { data: tips, isLoading } = useTips();

  return (
    <div className="bg-rose-300 min-h-screen flex">
      <Sidebar
        color="rose"
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setShowLogoutDialog={setShowLogoutDialog}
        showLogoutDialog={showLogoutDialog}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header + Scrollable Tip Cards */}
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <div className="max-w-screen-xl mx-auto space-y-10 pb-8">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-rose-600">
                Tips & Tricks
              </h1>
              <h3 className="text-lg text-rose-500">By you, For you</h3>
            </div>

            {/* Scrollable Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading ? (
                <p>Loading tips...</p>
              ) : (
                tips?.map((tip) => <TipCard key={tip.id} tip={tip} />)
              )}
            </div>
          </div>
        </div>

        {/* Fixed Post Form */}
        <div className="sticky bottom-0 z-10 bg-rose-300 border-t border-rose-400 px-6 py-4">
          <div className="max-w-screen-xl mx-auto">
            <PostTipForm />
          </div>
        </div>
      </div>
    </div>
  );
}
