import { useContext } from "react";
import { cartContext } from "../../context/CartContext";
import { discountContext } from "../../context/DiscountContext";
import {
  handleRenderSubtotalCart,
  handleRenderTotalDiscount,
} from "../../utils";
import { colorsList } from "../../constants";

const ProductCheckout = () => {
  const { products } = useContext(cartContext);
  const { discountCode, value: valueDiscount } = useContext(discountContext);
  //! Props

  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <div className="checkout-content-product">
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {(products || []).map((el) => {
          return (
            <div className="checkout-content-product_item" key={el?.id}>
              <div className="checkout-content-product_item-img">
                <img src={el?.image} alt="" />
              </div>
              <div className="checkout-content-product_item-info">
                <span className="title">{el?.name}</span>
                <span>
                  color:{" "}
                  {colorsList.find((color) => color.value === el?.color).label}
                </span>
                <span>amount: {el?.amount}</span>
                <span>price: ${el?.price}</span>
              </div>
              <div className="checkout-content-product_item-price">
                <span>${el?.amount * el?.price}</span>
              </div>
            </div>
          );
        })}
        <hr />
        <div className="checkout-content-product-total">
          <div className="checkout-content-product-total_item">
            <span>Subtotal</span>
            <span>${handleRenderSubtotalCart(products)}</span>
          </div>
          <div className="checkout-content-product-total_item">
            <span style={{ fontWeight: "400" }}>Discount code</span>
            <span style={{ fontWeight: "400" }}>{discountCode ?? ""}</span>
          </div>
          <div className="checkout-content-product-total_item">
            <span style={{ fontWeight: "400" }}>Discount</span>
            <span style={{ fontWeight: "400" }}>
              $
              {handleRenderTotalDiscount(discountCode, valueDiscount, products)}
            </span>
          </div>
          <div className="checkout-content-product-total_item">
            <span style={{ fontSize: "24px" }}>Order total</span>
            <span style={{ fontSize: "24px" }}>
              $
              {handleRenderSubtotalCart(products) -
                handleRenderTotalDiscount(
                  discountCode,
                  valueDiscount,
                  products
                )}
            </span>
          </div>
          <button
            className="btn"
            style={{ padding: "14px", borderRadius: "4px", marginTop: "12px" }}
            type="submit"
          >
            Pay now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
