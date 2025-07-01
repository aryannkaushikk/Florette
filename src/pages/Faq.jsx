import FAQBox from "../components/FAQBox";
import periodFaqData from "../data/periodFaqData";
import Sidebar from "../components/Sidebar";
import colorTheme from "../themes/colorTheme";

export default function Faq({ sidebarVisible, setSidebarVisible, showLogoutDialog, setShowLogoutDialog }) {
  const color = "rose"; // or pass as prop if dynamic
  const theme = colorTheme[color];

  return (
    <div className={`bg-rose-300 flex min-h-screen`}>
      <Sidebar
        color={color}
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        setShowLogoutDialog={setShowLogoutDialog}
        showLogoutDialog={showLogoutDialog}
      />

      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 pt-8">
          <div className="max-w-screen-xl mx-auto space-y-9 pb-8">
            <div className="space-y-1">
              <h1 className={`text-3xl font-bold ${theme.text}`}>
                Period FAQs
              </h1>
              <h3 className={`text-lg ${theme.textLight}`}>
                Things you might be wondering about 🌸
              </h3>
            </div>

            <FAQBox faqData={periodFaqData} color={color} page={true} />
          </div>
        </div>
      </div>
    </div>
  );
}
