/* eslint-disable react/prop-types */
import { Fragment } from "react";
import Loading from "../Loader/Loading";
import { Link } from "react-router-dom";
import { BiSearchAlt2 } from "react-icons/bi";

const ViewProductsPage = (props) => {
  //! Props
  const { isTypeRender, dataProducts, isLoading } = props;
  //! State

  //! Function

  //! Effect

  //! Render
  console.log("snadkls", dataProducts);
  return (
    <Fragment>
      {isLoading && <Loading />}
      {!isLoading && dataProducts?.length === 0 && (
        <h5>Sorry, no products matched your search</h5>
      )}
      {!isLoading && dataProducts?.length > 0 && (
        <Fragment>
          <section className="wrap-product-center">
            <div
              className={`${
                isTypeRender
                  ? "products-container"
                  : "products-container-column"
              }`}
            >
              {(dataProducts || [])?.map((product) => {
                const { _id: id, name, price, images, description } = product;
                const text = description.slice(0, 150);
                return (
                  <article key={id} className="featured">
                    <div className="container">
                      <img src={images[0]} alt={name} />
                      <Link
                        to={`/products/${id}?name=${name}`}
                        className="link"
                      >
                        <BiSearchAlt2 />
                      </Link>
                    </div>
                    {isTypeRender && (
                      <div
                        className="footer-featured"
                        style={{ textTransform: "unset" }}
                      >
                        <h5>{name}</h5>
                        <p style={{ textTransform: "unset" }}>${price}</p>
                      </div>
                    )}

                    {!isTypeRender && (
                      <div>
                        <h4>{name}</h4>
                        <h5 style={{ textTransform: "unset" }}>${price}</h5>
                        <p>{text}...</p>
                        <Link
                          to={`/products/${id}?name=${name}`}
                          className="btn"
                        >
                          details
                        </Link>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ViewProductsPage;
