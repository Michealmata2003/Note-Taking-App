import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./pages/Home";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import Dashboard from "./pages/Dashboard";
import Reminder from "./pages/Reminder";
import Bin from './pages/Bin'
import Projectplan from "./pages/Projectplan";
import Routine from "./pages/Routine"
import Planning from "./pages/Planning"
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />
          
          <Route path="/reminder" element={<Reminder />}/>
          <Route path="/bin" element={<Bin />}/>
          <Route path="/notebooks/project" element={<Projectplan />}/>
          <Route path="/notebooks/routine" element={<Routine />}/>
          <Route path="/notebooks/planning" element={<Planning />}/>
          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
