import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Tracker from "./pages/Tracker";
import Journal from "./pages/Journal";
import TipsAndTricks from "./pages/TipsAndTricks";
import Faq from "./pages/Faq";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { useState } from "react";
import PrivateRoute from "./components/PrivateRoute";
import LogoutDialog from "./components/LogoutDialog";

export default function App() {
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  function toggleSidebar() {
    setSidebarVisible(!sidebarVisible);
  }

  return (
    <>
      {showLogoutDialog && (
        <LogoutDialog open={showLogoutDialog} onClose={() => setShowLogoutDialog(false)} />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              sidebarVisible={sidebarVisible}
              setSidebarVisible={toggleSidebar}
              setShowLogoutDialog={setShowLogoutDialog}
              showLogoutDialog={showLogoutDialog}
            />
          }
        />
        <Route
          path="/tracker"
          element={
            <PrivateRoute>
              <Tracker
                sidebarVisible={sidebarVisible}
                setSidebarVisible={toggleSidebar}
                setShowLogoutDialog={setShowLogoutDialog}
                showLogoutDialog={showLogoutDialog}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/journal"
          element={
            <PrivateRoute>
              <Journal
                sidebarVisible={sidebarVisible}
                setSidebarVisible={toggleSidebar}
                setShowLogoutDialog={setShowLogoutDialog}
                showLogoutDialog={showLogoutDialog}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/tips-tricks"
          element={
            <PrivateRoute>
              <TipsAndTricks
                sidebarVisible={sidebarVisible}
                setSidebarVisible={toggleSidebar}
                setShowLogoutDialog={setShowLogoutDialog}
                showLogoutDialog={showLogoutDialog}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/faq"
          element={
            <Faq
              sidebarVisible={sidebarVisible}
              setSidebarVisible={toggleSidebar}
              setShowLogoutDialog={setShowLogoutDialog}
              showLogoutDialog={showLogoutDialog}
            />
          }
        />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
    </>
  );
}
