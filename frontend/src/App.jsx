import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import ProfilePage from "./pages/dashboard/ProfilePage";
import EditProfilePage from "./pages/dashboard/EditProfilePage";

// add inside <Routes>
// Public
import Home from "./pages/Home";
import SignIn from "./pages/auth/SignIn";
import Signup from "./pages/auth/Signup";

// Dashboard
import DashboardPage from "./pages/dashboard/DashboardPage";
import NotebookPage from "./pages/dashboard/NotebookPage";
import ReminderPage from "./pages/dashboard/ReminderPage";
import BinPage from "./pages/dashboard/BinPage";
import NewNotePage from "./pages/dashboard/NewNotePage";
import TagsPage from "./pages/dashboard/TagsPage";
import SettingsPage from "./pages/dashboard/SettingsPage";
import EditNotePage from "./pages/dashboard/EditNotePage";

// Context
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notebooks/:id"
            element={
              <ProtectedRoute>
                <NotebookPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/reminder"
            element={
              <ProtectedRoute>
                <ReminderPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bin"
            element={
              <ProtectedRoute>
                <BinPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/new"
            element={
              <ProtectedRoute>
                <NewNotePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <EditProfilePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/notes/edit/:id"
            element={
              <ProtectedRoute>
                <EditNotePage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/tags"
            element={
              <ProtectedRoute>
                <TagsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
