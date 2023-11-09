/* eslint-disable react/prop-types */
import { InfoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Flex, Input, Space, Table, Tag } from "antd";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import { useNavigate } from "react-router-dom";
import { enumStatus } from "../../../../constants";
import { formatCurrency } from "../../../../utils";
import { format } from "timeago.js";

const OrderList = (props) => {
  const navigate = useNavigate();
  //! Props
  const { isLoading, data, query, setQuery } = props;
  const [searchedColumn, setSearchedColumn] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
        [dataIndex]: selectedKeys[0],
      };
    });
    confirm();
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters, confirm, dataIndex) => {
    clearFilters();
    setQuery((prev) => {
      return {
        ...prev,
        [dataIndex]: "",
        page: 1,
      };
    });
    confirm();
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters, confirm, dataIndex)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[query.name, query.phoneNumber, query.email]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Created date",
      dataIndex: "createdDate",
      render: (_) => format(_),
    },
    {
      title: "Email",
      dataIndex: "email",
      ...getColumnSearchProps("email"),
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      ...getColumnSearchProps("phoneNumber"),
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
      filters: [
        {
          text: "Pending",
          value: "01",
        },
        {
          text: "Preparing",
          value: "02",
        },
        {
          text: "Delivering",
          value: "03",
        },
        {
          text: "Completed",
          value: "04",
        },
        {
          text: "Cancel",
          value: "05",
        },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.includes(value),
      defaultFilteredValue: [],
      filterResetToDefaultFilteredValue: true,
      ellipsis: true,
    },
    {
      title: "Total order",
      dataIndex: "totalCurrentPrice",
      render: (_) => formatCurrency(_),
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
                navigate(`/admin/order/${order._id}`, { replace: true });
              }}
            />
          </Flex>
        );
      },
    },
  ];
  //! State

  //! Function
  const handleChange = useCallback((pagination, filters) => {
    setFilteredInfo(filters);
  }, []);
  //! Effect
  useEffect(() => {
    setQuery((prev) => {
      return {
        ...prev,
        status: filteredInfo.status ? filteredInfo.status : [],
      };
    });
  }, [filteredInfo.status]);
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
        onChange={handleChange}
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
