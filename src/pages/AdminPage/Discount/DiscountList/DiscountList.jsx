/* eslint-disable react/prop-types */
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Input, Space, Table } from "antd";
import { Fragment, useCallback, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import DiscountDrawer from "../DiscountDrawer/DiscountDrawer";
import { formatCurrency } from "../../../../utils";

const DiscountList = (props) => {
  //! Props
  const {
    query,
    isLoading,
    data,
    setQuery,
    selectedRowKeys,
    setSelectedRowKeys,
    discountValue,
    setDiscountValue,
    setIsOpenDrawer,
    isOpenDrawer,
    refetch,
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
        idDiscount: selectedKeys[0],
      };
    });
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setQuery((prev) => {
      return {
        ...prev,
        page: 1,
        idDiscount: "",
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
          searchWords={[query.idDiscount]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Discount code",
      dataIndex: "idDiscount",
      ...getColumnSearchProps("idDiscount"),
    },
    {
      title: "Value",
      dataIndex: "valueDiscount",
      render: (_) => {
        if (_.includes("%")) {
          return <>{_}</>;
        } else {
          return <>{formatCurrency(_)}</>;
        }
      },
    },
    {
      title: "Number of uses",
      dataIndex: "amountUse",
      align: "center",
    },
    {
      title: "Action",
      dataIndex: "_id",
      align: "center",
      render: (_, item) => (
        <Button
          icon={<SettingOutlined />}
          onClick={() => {
            setIsOpenDrawer(true);
            setDiscountValue(item);
          }}
        />
      ),
    },
  ];
  //! Function
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const handleCloseDrawer = useCallback(() => {
    setIsOpenDrawer((active) => !active);
    setDiscountValue(null);
  }, []);
  //! Effect

  //! Render
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    getCheckboxProps: (record) => ({
      disabled: record.amountUse !== 0,
    }),
  
  };
  return (
    <Fragment>
      <Table
        rowKey={"_id"}
        bordered
        key={"discount-list"}
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
      {isOpenDrawer && (
        <DiscountDrawer
          discount={discountValue}
          onClose={handleCloseDrawer}
          isOpen={isOpenDrawer}
          refetch={refetch}
        />
      )}
    </Fragment>
  );
};

export default DiscountList;
