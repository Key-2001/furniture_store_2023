/* eslint-disable react/prop-types */
import { InfoOutlined } from "@ant-design/icons";
import { Button, Flex, Table, Tag } from "antd";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { enumStatus } from "../../../constants";
import { formatCurrency } from "../../../utils";

const OrderAccountList = (props) => {
  const navigate = useNavigate();
  //! Props
  const { query, setQuery, data, isLoading } = props;
  //! State
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (_) => {
        return (
          <Tag color={enumStatus.find((el) => el?.value === _)?.color}>
            {enumStatus.find((el) => el?.value === _)?.label.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Total order",
      dataIndex: "totalCurrentPrice",
      render: (_) => <>{formatCurrency(_)}</>
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, order) => {
        return (
          <Flex align={"center"} justify="center">
            <Button
              icon={<InfoOutlined />}
              shape="circle"
              onClick={() => {
                navigate(`/user/order/${order._id}`, { replace: true });
              }}
            />
          </Flex>
        );
      },
    },
  ];
  //! Function

  //! Effect

  //! Render
  return (
    <Fragment>
      <Table
        rowKey={"_id"}
        bordered
        key={"order-list"}
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{
          total: query.totalPage * 10,
          current: query.page,
          position: ["bottomCenter"],
          onChange: (page) => {
            setQuery((prev) => {
              return {
                ...prev,
                page: page,
              };
            });
          },
        }}
      />
    </Fragment>
  );
};

export default OrderAccountList;
