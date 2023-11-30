import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex } from "antd";
import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { colorsList } from "../../../constants";
import { GetOrderUserDetailService } from "../../../services/OrderService";
import "./OrderAccountDetail.scss";
import { RollbackOutlined } from "@ant-design/icons";
import { authContext } from "../../../context/AuthContext";
import { formatCurrency } from "../../../utils";
import { format } from "timeago.js";

const OrderAccountDetail = () => {
  const { dispatch, token } = useContext(authContext);
  const navigate = useNavigate();
  const { id } = useParams();
  //! Props

  //! State
  const [data, setData] = useState({});
  const { isLoading, isFetching, refetch } = useQuery(
    ["order-detail"],
    () => GetOrderUserDetailService(id, token),
    {
      enabled: false,
      onSuccess: (response) => {
        const { success, data } = response;
        if (success) {
          setData(data);
        } else {
          if (response?.statusCode == 404) {
            dispatch({ type: "LOG_OUT" });
          }
        }
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
    <Fragment>
      <Card
        title={`Order ${id}`}
        extra={
          <Button
            icon={<RollbackOutlined />}
            shape="default"
            onClick={() => {
              navigate("/user/order", { replace: true });
            }}
          />
        }
      >
        {isLoading || isFetching ? (
          <Flex align={"center"} justify="center">
            <HashLoader size={35} color="#ab7a5f" />
          </Flex>
        ) : (
          <Fragment>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              <Card.Grid style={{ width: "50%", textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>Created date: </span>
                {format(data.createdAt)}
              </Card.Grid>
              <Card.Grid style={{ width: "50%", textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>Updated date: </span>
                {format(data.updatedAt)}
              </Card.Grid>
              <Card.Grid style={{ width: "33.33%", textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>Email: </span>
                {data.email}
              </Card.Grid>
              <Card.Grid style={{ width: "33.33%", textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>Full name: </span>
                {data.name}
              </Card.Grid>
              <Card.Grid style={{ width: "33.33%", textAlign: "left" }}>
                <span style={{ fontWeight: 500 }}>Phone number: </span>
                {data.phoneNumber}
              </Card.Grid>
              <Card.Grid style={{ width: "100%" }}>
                <span style={{ fontWeight: 500 }}>Address: </span>
                {data.address}
              </Card.Grid>
              <Card.Grid style={{ width: "100%" }}>
                <span style={{ fontWeight: 500 }}>Note: </span>
                {data.note}
              </Card.Grid>
              {(data.products || []).map((el) => {
                return (
                  <Card.Grid
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    key={el?._id}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "60px",
                        height: "60px",
                        borderRadius: "8px",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img
                        src={el?.img}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                    <div className="product-info">
                      <span style={{ fontWeight: 500 }}>{el?.name}</span>
                      <span style={{ color: "#d9d9d9" }}>
                        Price: {formatCurrency(el?.price)}
                      </span>
                      <span style={{ color: "#d9d9d9" }}>
                        Color:{" "}
                        {
                          colorsList.find((item) => item.value === el?.color)
                            .label
                        }
                      </span>
                      <span style={{ color: "#d9d9d9" }}>
                        Amount: {el?.amount}
                      </span>
                    </div>
                    <div className="product-price">
                      <span style={{ fontWeight: 500, fontSize: "16px" }}>
                        {formatCurrency(el.amount * el.price)}
                      </span>
                    </div>
                  </Card.Grid>
                );
              })}
              <Card.Grid style={{ width: "45%" }}>
                <h5>Subtotal: </h5>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "55%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {formatCurrency(data.totalPrice)}
              </Card.Grid>
              <Card.Grid style={{ width: "45%" }}>
                <h5>Shipping fee: </h5>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "55%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {formatCurrency(data.shippingFee)}
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "45%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h5>Total discount: </h5>
                <span style={{ color: "#d9d9d9" }}>
                  Discount code: {data.discount?.discountCode}
                </span>
                <span style={{ color: "#d9d9d9" }}>
                  Discount value: {formatCurrency(data.discount?.discountValue)}
                </span>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "55%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                - {formatCurrency(data.totalDiscount)}
              </Card.Grid>
              <Card.Grid style={{ width: "45%" }}>
                <h4 style={{ marginBottom: 0 }}>Total: </h4>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "55%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                {formatCurrency(data.totalCurrentPrice)}
              </Card.Grid>
            </div>
          </Fragment>
        )}
      </Card>
    </Fragment>
  );
};

export default OrderAccountDetail;
