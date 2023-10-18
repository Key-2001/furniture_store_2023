import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Loading from "../../components/Loader/Loading";
import { GetDetailProductService } from "../../services/ProductService";
import { BsCheck, BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ProductDetailPage = () => {
  const { id } = useParams();
  const queryParams = new URLSearchParams(window.location.search);
  const nameProduct = queryParams.get("name");
  //! Props

  //! State
  const [detailProduct, setDetailProduct] = useState(null);
  const [imgMain, setImgMain] = useState(0);
  const [stockCurrent, setStockCurrent] = useState(null);
  const [amountProduct, setAmountProduct] = useState(1);
  const { isLoading, isFetching, refetch } = useQuery(
    ["product-detail"],
    () => GetDetailProductService(id),
    {
      enabled: false,
      onSuccess: (response) => {
        setDetailProduct(response.product);
        setStockCurrent(response?.product?.stock[0]);
      },
    }
  );
  //! Function
  const handleClickAddCartItem = useCallback(() => {}, []);
  const handleChangeColorStock = useCallback(
    (stockItem) => {
      setStockCurrent(stockItem);
      setAmountProduct(1);
    },
    [stockCurrent]
  );
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  console.log("detailProduct", detailProduct);
  return (
    <Fragment>
      <section className="title-section">
        <div className="section-center">
          <h3>
            <Link to="/">Home</Link>
            <Link to="/products">/ Products</Link> /{" "}
            {nameProduct ? nameProduct : id}
          </h3>
        </div>
      </section>

      {isLoading && isFetching && (
        <div style={{ height: "calc(80vh - 160px)" }}>
          <Loading />
        </div>
      )}
      {!isLoading && !isFetching && (
        <Fragment>
          <div className="section section-center page">
            <Link to="/products" className="btn">
              back to products
            </Link>
            <div className="product-center">
              <section className="img-section">
                <img
                  src={detailProduct?.images[imgMain]}
                  alt=""
                  className="main"
                />
                {detailProduct?.images && (
                  <div className="gallery">
                    {(detailProduct?.images || [])?.map((url, index) => {
                      return (
                        <img
                          key={index}
                          src={url}
                          alt=""
                          className={`${imgMain === index ? "active" : ""}`}
                          onClick={() => setImgMain(index)}
                        />
                      );
                    })}
                  </div>
                )}
              </section>
              <section className="content">
                <h2>{detailProduct?.name}</h2>
                {/* <div className="review">
                  <div className="stars">
                    {starList.map((starItem) => {
                      let temp = stars - starItem;

                      if (temp >= 1) {
                        return (
                          <span key={starItem}>
                            <BsStarFill />
                          </span>
                        );
                      } else if (temp > 0 && temp < 1) {
                        return (
                          <span key={starItem}>
                            <BsStarHalf />
                          </span>
                        );
                      } else {
                        return (
                          <span key={starItem}>
                            <BsStar />
                          </span>
                        );
                      }
                    })}
                  </div>
                  <p className="reviewer">({reviews} customer reviewers)</p>
                </div> */}
                <h5>${detailProduct?.price}</h5>
                <p className="description">{detailProduct?.description}</p>
                <p className="info">
                  <span>available:</span>
                  {stockCurrent?.amount} products in stock
                </p>
                <p className="info">
                  <span>SKU:</span> {id}
                </p>
                <p className="info">
                  <span>brand:</span> {detailProduct?.company}
                </p>

                {detailProduct?.stock && (
                  <div className="colors-single-product info">
                    <span>colors:</span>
                    <div style={{ display: "flex" }}>
                      {detailProduct?.stock.map((el, index) => {
                        const { amount, color } = el;
                        return (
                          <button
                            key={index}
                            type="button"
                            className={`${
                              stockCurrent.color === color
                                ? "color-btn active"
                                : "color-btn"
                            }`}
                            style={{ backgroundColor: `${color}` }}
                            onClick={() => handleChangeColorStock(el)}
                          >
                            <BsCheck className="check-icon" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
                <div className="btn-cart-container">
                  <div className="amounts-btn">
                    {amountProduct === 1 ? (
                      <button
                        disabled
                        style={{ cursor: "no-drop" }}
                        type="button"
                        className="dec-btn"
                      >
                        <AiOutlineMinus />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="dec-btn"
                        onClick={() => setAmountProduct(amountProduct - 1)}
                      >
                        <AiOutlineMinus />
                      </button>
                    )}
                    <h2>{amountProduct}</h2>
                    {amountProduct === stockCurrent?.amount ? (
                      <button
                        disabled
                        style={{ cursor: "no-drop" }}
                        type="button"
                        className="inc-btn"
                      >
                        <AiOutlinePlus />
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="inc-btn"
                        onClick={() => setAmountProduct(amountProduct + 1)}
                      >
                        <AiOutlinePlus />
                      </button>
                    )}
                  </div>
                  {/* <Link to='/cart' className='btn' onClick={() => handleAddCartItem(cartItem)}>add to cart</Link> */}
                  <button
                    className="btn"
                    onClick={() => handleClickAddCartItem()}
                  >
                    add to cart
                  </button>
                </div>
              </section>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetailPage;
