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
import LoginAdmin from "../pages/AuthPage/LoginPage/LoginAdmin";
import LayoutAdmin from "../layout/LayoutAdmin";
import Dashboard from "../pages/AdminPage/Dashboard/Dashboard";
import Order from "../pages/AdminPage/Order/Order";
import User from "../pages/AdminPage/User/User";
import Product from "../pages/AdminPage/Product/Product";
import NotExistedPage from "../pages/NotExistedPage/NotExistedPage";
import ProtectedRouteAdmin from "./ProtectedRouteAdmin";

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
      <Route
        path="/admin/login"
        element={
          <Layout>
            <LoginAdmin />
          </Layout>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRouteAdmin>
            <LayoutAdmin>
              <Dashboard />
            </LayoutAdmin>
          </ProtectedRouteAdmin>
        }
      />
      <Route
        path="/admin/product"
        element={
          <ProtectedRouteAdmin>
            <LayoutAdmin>
              <Product />
            </LayoutAdmin>
          </ProtectedRouteAdmin>
        }
      />
      <Route
        path="/admin/user"
        element={
          <ProtectedRouteAdmin>
            <LayoutAdmin>
              <User />
            </LayoutAdmin>
          </ProtectedRouteAdmin>
        }
      />
      <Route
        path="/admin/order"
        element={
          <ProtectedRouteAdmin>
            <LayoutAdmin>
              <Order />
            </LayoutAdmin>
          </ProtectedRouteAdmin>
        }
      />
      <Route path="*" element={<NotExistedPage />} />
    </Routes>
  );
};

export default Routers;
