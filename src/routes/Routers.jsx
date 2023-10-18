import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ProductsPage from "../pages/ProductPage/ProductsPage";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";
import Login from "../pages/AuthPage/LoginPage/Login";
import Signup from "../pages/AuthPage/Signup/Signup";
import ProtectedRoute from "./ProtectedRoute";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import ForgotPassword from "../pages/AuthPage/ForgotPassword/ForgotPassword";
import CartPage from "../pages/CartPage/CartPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/cart" element={<CartPage />} />
      <Route
        path="/user/me"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
