import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import ManageStores from './pages/ManageStores';
import AddUser from './pages/AddUser';
import AddStore from './pages/AddStore';
import UserDashboard from './pages/UserDashboard';
import StoreOwnerDashboard from './pages/StoreOwnerDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin routes */}
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/users" element={<ProtectedRoute role="admin"><ManageUsers /></ProtectedRoute>} />
        <Route path="/admin/stores" element={<ProtectedRoute role="admin"><ManageStores /></ProtectedRoute>} />
        <Route path="/admin/add-user" element={<ProtectedRoute role="admin"><AddUser /></ProtectedRoute>} />
        <Route path="/admin/add-store" element={<ProtectedRoute role="admin"><AddStore /></ProtectedRoute>} />

        {/* User routes */}
        <Route path="/user" element={<ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>} />

        {/* Store Owner routes */}
        <Route path="/store-owner" element={<ProtectedRoute role="store_owner"><StoreOwnerDashboard /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;