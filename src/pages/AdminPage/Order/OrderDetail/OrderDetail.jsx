import { FormOutlined, RollbackOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Card, Flex, Tag } from "antd";
import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import Paper from "../../../../common/Paper";
import {
  colorsList,
  enumPaymentStatus,
  enumStatus,
} from "../../../../constants";
import { adminContext } from "../../../../context/AdminContext";
import { GetOrderAdminDetailService } from "../../../../services/AdminService";
import { format } from "timeago.js";
import ModalChangeStatus from "../Modal/ModalChangeStatus";
import ModalChangePaymentStatus from "../Modal/ModalChangePaymentStatus";
import { formatCurrency } from "../../../../utils";
const OrderDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [isModalStatus, setIsModalStatus] = useState(false);
  const [isModalPayment, setIsModalPayment] = useState(false);
  const [data, setData] = useState({});
  const { isLoading, isFetching, refetch } = useQuery(
    ["order-detail"],
    () => GetOrderAdminDetailService(id, tokenAdmin),
    {
      enabled: false,
      onSuccess: (response) => {
        const { success, data } = response;
        if (success) {
          setData(data);
        }
      },
    }
  );
  //! Function
  const handleChangeModal = useCallback(
    () => setIsModalStatus((active) => !active),
    []
  );
  const handleChangeModalPayment = useCallback(
    () => setIsModalPayment((active) => !active),
    []
  );
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return (
    <Fragment>
      <Paper style={{ marginBottom: "1rem" }}>
        <Flex align={"center"} justify={"space-between"}>
          <h4 style={{ marginBottom: "0" }}>Order {id}</h4>
          <Flex align={"center"} justify="flex-end" gap={"middle"}>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => {
                navigate("/admin/order", { replace: true });
              }}
            />
          </Flex>
        </Flex>
      </Paper>
      <Paper style={{ height: "calc(100vh - 184px)", overflowY: "auto" }}>
        {isLoading || isFetching ? (
          <Flex align={"center"} justify="center" style={{ height: "100%" }}>
            <HashLoader size={35} color="#ab7a5f" />
          </Flex>
        ) : (
          <Card
            title={
              <Flex
                vertical
                style={{ paddingTop: "12px", paddingBottom: "12px" }}
              >
                <p style={{ fontSize: "16px" }}>Order detail</p>
                <p style={{ color: "#dedede", fontWeight: "400" }}>
                  Created date: {format(data.createdDate)}
                </p>
              </Flex>
            }
          >
            <div style={{ display: "flex", flexWrap: "wrap" }}>
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
              <Card.Grid style={{ width: "50%" }}>
                <Flex align={"center"} justify="space-between">
                  <Flex align={"center"} gap="small">
                    <span style={{ fontWeight: 500 }}>Status: </span>
                    {
                      <Tag
                        color={
                          enumStatus.find((el) => el.value === data.status)
                            ?.color
                        }
                      >
                        {
                          enumStatus.find((el) => el.value === data.status)
                            ?.label
                        }
                      </Tag>
                    }
                  </Flex>
                  <Button icon={<FormOutlined />} onClick={handleChangeModal} />
                </Flex>
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                <Flex align={"center"} justify="space-between">
                  <Flex align={"center"} gap="small">
                    <span style={{ fontWeight: 500 }}>Payment status: </span>
                    {
                      <Tag
                        color={
                          enumPaymentStatus.find(
                            (el) => el.value === data.paymentStatus
                          )?.color
                        }
                      >
                        {
                          enumPaymentStatus.find(
                            (el) => el.value === data.paymentStatus
                          )?.label
                        }
                      </Tag>
                    }
                  </Flex>
                  <Button
                    icon={<FormOutlined />}
                    onClick={handleChangeModalPayment}
                  />
                </Flex>
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
              <Card.Grid style={{ width: "30%" }}>
                <h5>Subtotal: </h5>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "70%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {formatCurrency(data.totalPrice)}
              </Card.Grid>
              <Card.Grid style={{ width: "30%" }}>
                <h5>Total discount: </h5>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "70%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {formatCurrency(data.totalDiscount)}
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                <span style={{ fontWeight: 500 }}>Discount code: </span>
                {data.discount?.discountCode}
              </Card.Grid>
              <Card.Grid style={{ width: "50%" }}>
                <span style={{ fontWeight: 500 }}>Value: </span>
                {formatCurrency(data.discount?.discountValue)}
              </Card.Grid>
              <Card.Grid style={{ width: "30%" }}>
                <h5>Shipping fee: </h5>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "70%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "16px",
                }}
              >
                {formatCurrency(data.shippingFee)}
              </Card.Grid>
              <Card.Grid style={{ width: "30%" }}>
                <h4 style={{ marginBottom: 0 }}>Total order: </h4>
              </Card.Grid>
              <Card.Grid
                style={{
                  width: "70%",
                  textAlign: "end",
                  fontWeight: 500,
                  fontSize: "18px",
                }}
              >
                {formatCurrency(data.totalCurrentPrice)}
              </Card.Grid>
            </div>
          </Card>
        )}
      </Paper>
      {isModalStatus && (
        <ModalChangeStatus
          isActive={isModalStatus}
          changeActive={handleChangeModal}
          refetch={refetch}
          status={data.status}
        />
      )}
      {isModalPayment && (
        <ModalChangePaymentStatus
          changeActive={handleChangeModalPayment}
          isActive={isModalPayment}
          refetch={refetch}
          status={data.paymentStatus}
        />
      )}
    </Fragment>
  );
};

export default OrderDetail;
