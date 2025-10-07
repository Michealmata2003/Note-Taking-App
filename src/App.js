import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { SidebarProvider } from "./ContextAPI/SidebarContext";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Settings from "./pages/Settings";

function App() {
  return (
    <Router>
      <SidebarProvider>
        <Header />
        <Sidebar />
        <Main />
        <Footer />

        <Routes>
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </SidebarProvider>
    </Router>
  );
}

export default App;
