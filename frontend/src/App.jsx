import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import TaskListPage from "./pages/TaskListPage";
import DailySummaryPage from "./pages/DailySummaryPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <div className="app-shell">
        <Routes>
          <Route path="/" element={<Navigate replace to="/tasks" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TaskListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <DailySummaryPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div className="container"><h2>Page not found</h2></div>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
