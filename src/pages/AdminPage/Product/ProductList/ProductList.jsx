/* eslint-disable react/prop-types */
import { Button, Flex, Image, Input, Space, Table } from "antd";
import { Fragment, useRef, useState } from "react";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { formatCurrency } from "../../../../utils";
import { useNavigate } from "react-router-dom";

const ProductList = (props) => {
  const navigate = useNavigate();
  //! Props
  const {
    query,
    isLoading,
    data,
    setQuery,
    selectedRowKeys,
    setSelectedRowKeys,
  } = props;
  //! State
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
        name: selectedKeys[0],
      };
    });
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setQuery((prev) => {
      return {
        ...prev,
        name: "",
        page: 1,
      };
    });
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
            onClick={() => clearFilters && handleReset(clearFilters)}
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
          searchWords={[query.name]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "Preview",
      dataIndex: "images",
      render: (img) => {
        return <Image width={100} src={img[0].url} />;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (_) => {
        return <>{formatCurrency(_)}</>;
      },
    },
    {
      title: "Action",
      dataIndex: "_id",
      align: 'center',
      render: (id) => {
        return (
          <Flex align="center" justify="center">
            <Button
              icon={<SettingOutlined />}
              onClick={() => {
                navigate(`/admin/product/${id}`, { replace: true });
              }}
            />
          </Flex>
        );
      },
    },
  ];
  //! Function
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  //! Effect
  //! Render
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <Fragment>
      <Table
        rowKey={"_id"}
        bordered
        key={"product-list"}
        rowSelection={rowSelection}
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

export default ProductList;
