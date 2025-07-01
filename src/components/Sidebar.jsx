import {
  LayoutDashboard,
  CalendarDays,
  NotebookPen,
  Sparkles,
  LogOut,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
  HandCoins,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import colorTheme from "../themes/colorTheme";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LogoutDialog from "./LogoutDialog";
import { useEffect, useState } from "react";

export default function Sidebar({ color, sidebarVisible, setSidebarVisible, showLogoutDialog , setShowLogoutDialog }) {
  const theme = colorTheme[color] || colorTheme["rose"];
  const baseStyle = `flex items-center gap-3 py-2 px-3 rounded transition whitespace-nowrap`;
  const activeStyle = `font-semibold bg-white ${theme.text}`;

  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
  logout().then(() => {
  setShowLogoutDialog(true);
  setTimeout(() => {
    setShowLogoutDialog(false);
    navigate("/signin");
  }, 3000);
});
}

  return (
    <div
      className={`h-screen sticky top-0 ${theme.buttonBg} ${
        sidebarVisible ? "w-64" : "w-20"
      } text-white flex flex-col items-center px-2 py-6 shadow-lg transition-all duration-300 z-40`}
    >
      {/* Collapse/Expand Button */}
      <button
        onClick={setSidebarVisible}
        className="absolute top-4 right-[-1.25rem] bg-white text-rose-600 rounded-full p-1 shadow-md z-50"
        title={sidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
      >
        {sidebarVisible ? (
          <ChevronLeft size={18} />
        ) : (
          <ChevronRight size={18} />
        )}
      </button>

      {/* Logo */}
      <div className="mb-10">
        <img
          src="/logo.png"
          alt="Florette Logo"
          className={`rounded-full transition-all duration-300 ${
            sidebarVisible ? "w-20 h-20" : "w-12 h-12"
          }`}
        />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 text-base w-full">
        {[
          { to: "/", icon: LayoutDashboard, label: "Home" },
          { to: "/tracker", icon: CalendarDays, label: "Tracker" },
          { to: "/journal", icon: NotebookPen, label: "Journal" },
          { to: "/tips-tricks", icon: Sparkles, label: "Tips & Tricks" },
          { to: "/faq", icon: HelpCircle, label: "FAQs" },
        ].map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${baseStyle} ${
                isActive ? activeStyle : `${theme.hover} ${theme.hoverText}`
              } ${
                sidebarVisible ? "justify-start px-4" : "justify-center px-2"
              }`
            }
            title={!sidebarVisible ? label : ""}
          >
            <Icon className="w-5 h-5" />
            {sidebarVisible && <span>{label}</span>}
          </NavLink>
        ))}

        {/* External: Support NGOs */}
        <a
          href="https://freepadsforindia.org/"
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyle} text-white ${theme.text} ${theme.hover} ${
            theme.hoverText
          } ${sidebarVisible ? "justify-start px-4" : "justify-center px-2"}`}
          title="Support NGOs"
        >
          <HeartHandshake className="w-5 h-5" />
          {sidebarVisible && <span>Support NGOs</span>}
        </a>

        {/* External: Donate */}
        <a
          href="https://milaap.org/fundraisers/support-menstruators-5"
          target="_blank"
          rel="noopener noreferrer"
          className={`${baseStyle} ${theme.text} ${theme.hover} ${
            theme.hoverText
          } text-white ${
            sidebarVisible ? "justify-start px-4" : "justify-center px-2"
          }`}
          title="Donate"
        >
          <HandCoins className="w-5 h-5" />
          {sidebarVisible && <span>Donate</span>}
        </a>
      </nav>

      {/* Logout */}
      <div className="mt-auto w-full px-2">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center ${
            sidebarVisible ? "justify-center gap-2 px-4" : "justify-center px-2"
          } bg-white ${theme.text} ${theme.hover} ${
            theme.hoverText
          } font-semibold py-2 rounded transition`}
        >
          <LogOut className="w-5 h-5" />
          {sidebarVisible && "Logout"}
        </button>
      </div>
    </div>
  );
}
