/* eslint-disable react/prop-types */
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Flex, Modal } from "antd";
import { Fragment } from "react";
import Paper from "./Paper";

const HeaderTable = (props) => {
  //! Props
  const {
    isCreate,
    isDelete,
    onRefetch,
    onCreate,
    title,
    selectedRowKeys,
    onDelete,
    isLoadingDelete,
    isOpenModal,
    handleChangeModal,
  } = props;
  //! State
  //! Function

  //! Effect

  //! Render
  return (
    <ConfigProvider
      key={"header-table"}
      theme={{ token: { colorBgContainer: "#fff" } }}
    >
      <Fragment>
        <Paper style={{ marginBottom: "12px" }}>
          <Flex justify={"space-between"} align="center">
            <h4 style={{ marginBottom: 0 }}>{title}</h4>
            <Flex align="center" justify="flex-end" gap={"middle"}>
              {isDelete && (
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  disabled={selectedRowKeys.length === 0}
                  onClick={handleChangeModal}
                >
                  Delete
                </Button>
              )}
              {isCreate && (
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={onCreate}
                >
                  Create
                </Button>
              )}
              <Button icon={<RedoOutlined />} onClick={onRefetch} />
            </Flex>
          </Flex>
        </Paper>
        {isOpenModal && (
          <Modal
            title="Remove Products"
            open={isOpenModal}
            onOk={onDelete}
            confirmLoading={isLoadingDelete}
            onCancel={handleChangeModal}
            okText="Remove"
            okType="danger"
          >
            <p>Are you sure want to remove products</p>
          </Modal>
        )}
      </Fragment>
    </ConfigProvider>
  );
};

export default HeaderTable;
