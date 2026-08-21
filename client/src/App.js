import Chat from "./pages/Chat";
import EditProfile from "./pages/EditProfile";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ResetPassword from "./pages/ResetPassword";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import Resources from "./pages/Resources";
import Requests from "./pages/Requests";
import SearchUsers from "./pages/SearchUsers";
import ProtectedRoute from "./routes/ProtectedRoute";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
function AppContent() {

  const location = useLocation();

  // AUTH PAGES
  const authPages = [
    "/auth",
    "/reset-password",
  ];

  // CHECK CURRENT PAGE
  const isAuthPage =
    authPages.includes(location.pathname);

  return (

    <div className="app-container">

      {/* SHOW NAVBAR ONLY IF NOT AUTH PAGE */}
      {!isAuthPage && <Navbar />}

      <div className="main-content">

        <Routes>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route
  path="/chat"
  element={<Chat />}
/>

     <Route
  path="/"
  element={<Navigate to="/auth" />}
/>
<Route
  path="/home"
  element={<Home />}
/>
          <Route
            path="/auth"
            element={<Auth />}
          />

          <Route
            path="/reset-password"
            element={<ResetPassword />}
          />

          <Route
            path="/search"
            element={<SearchUsers />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requests"
            element={
              <ProtectedRoute>
                <Requests />
              </ProtectedRoute>
            }
          />

          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <Resources />
              </ProtectedRoute>
            }
          />

        </Routes>

      </div>

      {/* SHOW FOOTER ONLY IF NOT AUTH PAGE */}
      {!isAuthPage && <Footer />}

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <AppContent />

    </BrowserRouter>
  );
}

export default App;