import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";
import { useQuery } from "@tanstack/react-query";
import { GetAllProductsService } from "../../services/ProductService";
import { useEffect, useState } from "react";
import Loading from "../Loader/Loading";

const ProductDemo = () => {
  //! Props

  //! State
  const [productsData, setProductsData] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["products-demo"],
    () => GetAllProductsService({}),
    {
      enabled: false,
      onSuccess: (response) => {
        setProductsData(response?.products);
      },
    }
  );
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return (
    <section className="products-demo">
      <div className="title">
        <h2>featured products</h2>
        <div className="underline" />
      </div>
      <div className="section-center featured-wrap">
        {isLoading && isFetching && <Loading />}
        {(productsData || [])?.slice(0, 3).map((product) => {
          const { _id, name, price, images } = product;
          return (
            <article key={_id} className="featured">
              <div className="container">
                <img src={images[0]} alt={name} />
                <Link to={`/products/${_id}?name=${name}`} className="link">
                  <BiSearchAlt2 />
                </Link>
              </div>
              <div className="footer-featured">
                <h5>{name}</h5>
                <p>${price}</p>
              </div>
            </article>
          );
        })}
      </div>
      <Link to="/products" className="btn">
        all products
      </Link>
    </section>
  );
};

export default ProductDemo;
