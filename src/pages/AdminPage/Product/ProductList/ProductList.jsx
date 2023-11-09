/* eslint-disable react/prop-types */
import { Button, Flex, Image, Input, Space, Table } from "antd";
import { Fragment, useEffect, useRef, useState } from "react";
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
  const handleReset = (clearFilters, confirm, close, dataIndex) => {
    clearFilters();
    setQuery((prev) => {
      return {
        ...prev,
        [dataIndex]: "",
        page: 1,
      };
    });
    confirm();
    close();
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
              clearFilters &&
              handleReset(clearFilters, confirm, close, dataIndex)
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
      filters: [
        {
          text: "Marcos",
          value: "marcos",
        },
        {
          text: "Liddy",
          value: "liddy",
        },
        {
          text: "Ikea",
          value: "ikea",
        },
        {
          text: "Caressa",
          value: "caressa",
        },
      ],
      filteredValue: filteredInfo.company || null,
      onFilter: (value, record) => record.company.includes(value),
      defaultFilteredValue: [],
      filterResetToDefaultFilteredValue: true,
      ellipsis: true,
    },
    {
      title: "Category",
      dataIndex: "category",
      filters: [
        {
          text: "Office",
          value: "office",
        },
        {
          text: "Living room",
          value: "living room",
        },
        {
          text: "Kitchen",
          value: "kitchen",
        },
        {
          text: "Bedroom",
          value: "bedroom",
        },
        {
          text: "Dining",
          value: "dining",
        },
        {
          text: "Kids",
          value: "kids",
        },
      ],
      filteredValue: filteredInfo.category || null,
      onFilter: (value, record) => record.category.includes(value),
      defaultFilteredValue: [],
      filterResetToDefaultFilteredValue: true,
      ellipsis: true,
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
      align: "center",
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
  const handleChange = (pagination, filters) => {
    setFilteredInfo(filters);
  };
  //! Effect
  useEffect(() => {
    setQuery((prev) => {
      return {
        ...prev,
        company: filteredInfo.company ? filteredInfo.company : [],
        category: filteredInfo.category ? filteredInfo.category : [],
      };
    });
  }, [filteredInfo.company, filteredInfo.category]);
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

export default ProductList;
