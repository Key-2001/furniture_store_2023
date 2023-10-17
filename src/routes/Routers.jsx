import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import AboutPage from "../pages/AboutPage/AboutPage";
import ProductsPage from "../pages/ProductPage/ProductsPage";
import ProductDetailPage from "../pages/ProductPage/ProductDetailPage";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/products/:id" element={<ProductDetailPage />} />
    </Routes>
  );
};

export default Routers;
