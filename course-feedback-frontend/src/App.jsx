import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import CoursePage from "./pages/CoursePage";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./auth/ProtectedRoute";
import Header from "./components/Header";

/* ---------- Layout with Header ---------- */
function MainLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ---------- Public course page WITH header ---------- */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<CoursePage />} />

          {/* ---------- Protected admin dashboard WITH header ---------- */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* ---------- Admin login WITHOUT header ---------- */}
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
}
