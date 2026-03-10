import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Reminder from "./pages/Reminder";
import Bin from './pages/Bin';
import Projectplan from "./pages/Projectplan";
import Routine from "./pages/Routine";
import Planning from "./pages/Planning";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />

          {/* Protected routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          }/>
          <Route path="/reminder" element={
            <ProtectedRoute><Reminder /></ProtectedRoute>
          }/>
          <Route path="/bin" element={
            <ProtectedRoute><Bin /></ProtectedRoute>
          }/>
          <Route path="/notebooks/project" element={
            <ProtectedRoute><Projectplan /></ProtectedRoute>
          }/>
          <Route path="/notebooks/routine" element={
            <ProtectedRoute><Routine /></ProtectedRoute>
          }/>
          <Route path="/notebooks/planning" element={
            <ProtectedRoute><Planning /></ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;