/* eslint-disable react/prop-types */
import { Table } from "antd";
import { Fragment } from "react";

const OrderList = (props) => {
  //! Props
  const { isLoading, data, query, setQuery } = props;
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
  ];
  //! State

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

export default OrderList;
