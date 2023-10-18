import React, { Fragment, useCallback, useContext } from "react";
import CartEmpty from "../../components/CartEmpty/CartEmpty";
import { Link, useNavigate } from "react-router-dom";
import { FastField, Form, Formik } from "formik";
import "./Cart.scss";
import { cartContext } from "../../context/CartContext";
const CartPage = () => {
  const navigate = useNavigate();
  const { products } = useContext(cartContext);
  console.log("jsankdjsa", products);
  //! Props

  //! State

  //! Function
  const handleClearCart = useCallback(() => {}, []);
  const handeSubmitDiscount = useCallback(() => {}, []);
  //! Effect

  //! Render
  if (products?.length === 0) return <CartEmpty />;
  return (
    <Fragment>
      <section className="title-section">
        <div className="section-center">
          <h3>
            <a href="/">Home</a> / cart
          </h3>
        </div>
      </section>
      <section className="cart-center section section-center page">
        <div className="title-cart">
          <div className="content-title">
            <h5>item</h5>
            <h5>price</h5>
            <h5>quantity</h5>
            <h5>subtotal</h5>
            <span style={{ width: "2rem" }}></span>
          </div>
          <hr />
        </div>
        <div className="carts-content">
          {/* {cartProducts.map((cart) => {
            const {
              id,
              img,
              name,
              color,
              price,
              stock,
              shipping,
              amountCart,
              maxQuantity,
            } = cart;
            return (
              <article key={`${id}-${color}`} className="cart-item">
                <div className="img-title">
                  <img src={img} alt={name} />
                  <div>
                    <h5 className="name-cart">{name}</h5>
                    <p className="color-cart">
                      color: <span style={{ backgroundColor: `${color}` }} />
                    </p>
                    <h5 className="price-small">${price}</h5>
                  </div>
                </div>
                <h5 className="price-cart">${price}</h5>
                <div className="amounts-btn">
                  {amountCart === 1 ? (
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
                      onClick={() =>
                        dispatch(
                          toggleAmountCartItem({ id, msg: "dec", color })
                        )
                      }
                    >
                      <AiOutlineMinus />
                    </button>
                  )}
                  <h3>{amountCart}</h3>
                  {amountCart === maxQuantity ? (
                    <button
                      disabled
                      type="button"
                      style={{ cursor: "no-drop" }}
                      className="inc-btn"
                    >
                      <AiOutlinePlus />
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="inc-btn"
                      onClick={() =>
                        dispatch(
                          toggleAmountCartItem({ id, msg: "inc", color })
                        )
                      }
                    >
                      <AiOutlinePlus />
                    </button>
                  )}
                </div>
                <h5 className="subtotal">${price * amountCart}</h5>
                <button
                  className="remove-btn"
                  onClick={() => dispatch(removeCartItem({ id, color }))}
                >
                  <MdOutlineRemoveShoppingCart />
                </button>
              </article>
            );
          })} */}
        </div>
        <hr />
        <div className="links-container">
          <Link className="link-btn" to="/products">
            continue shopping
          </Link>
          <button
            type="button"
            className="link-btn clear-btn"
            onClick={handleClearCart}
          >
            clear shopping cart
          </button>
        </div>
        <section className="total-price">
          <div>
            <article>
              <h5>
                subtotal : <span>${0}</span>
              </h5>
              <p>
                discount :{" "}
                <span>
                  {/* {discountState?.discount &&
                  discountState?.discount?.amountUse > 0
                    ? discountState?.discount?.valueDiscount
                    : ""} */}
                </span>
              </p>
              <hr />
              <h4>
                order total : <span>${0}</span>
              </h4>
            </article>
            <Formik
              initialValues={{
                discountCode: "",
              }}
              onSubmit={handeSubmitDiscount}
            >
              {(helperFormik) => {
                return (
                  <Form className="form-discount">
                    <FastField
                      // component={InputCustom}
                      name="discountCode"
                      placeholder="Discount code ..."
                      // variant="outlined"
                      // sx={{ marginTop: ".25rem", width: "100%" }}
                    />
                  </Form>
                );
              }}
            </Formik>
            {/* {isLoginUser ? (
              <CheckoutDialog />
            ) : ( */}
            <button
              type="button"
              className="btn btn-checkout"
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            >
              login
            </button>
            {/* )} */}
          </div>
        </section>
      </section>
    </Fragment>
  );
};

export default CartPage;
