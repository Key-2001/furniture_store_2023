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
import CheckoutPage from "../pages/CheckoutPage/CheckoutPage";
import Layout from "../layout/Layout";

const Routers = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout isLayout={true}>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout isLayout={true}>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/products"
        element={
          <Layout isLayout={true}>
            <ProductsPage />
          </Layout>
        }
      />
      <Route
        path="/products/:id"
        element={
          <Layout isLayout={true}>
            <ProductDetailPage />
          </Layout>
        }
      />
      <Route
        path="/login"
        element={
          <Layout isLayout={true}>
            <Login />
          </Layout>
        }
      />
      <Route
        path="/signup"
        element={
          <Layout isLayout={true}>
            <Signup />
          </Layout>
        }
      />
      <Route
        path="/forgot-password"
        element={
          <Layout isLayout={true}>
            <ForgotPassword />
          </Layout>
        }
      />
      <Route
        path="/cart"
        element={
          <Layout isLayout={true}>
            <CartPage />
          </Layout>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <Layout>
              <CheckoutPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/user/me"
        element={
          <ProtectedRoute>
            <Layout isLayout={true}>
              <ProfilePage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;
