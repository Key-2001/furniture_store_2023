/* eslint-disable react/prop-types */
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Paper from "./Paper";

const HeaderTable = (props) => {
  //! Props
  const { isCreate, isDelete, onRefetch, onCreate, title } = props;

  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <Paper style={{ marginBottom: "12px" }}>
      <Flex justify={"space-between"} align="center">
        <h4 style={{ marginBottom: 0 }}>{title}</h4>
        <Flex align="center" justify="flex-end" gap={"middle"}>
          {isDelete && (
            <Button danger icon={<DeleteOutlined />}>
              Delete
            </Button>
          )}
          {isCreate && (
            <Button type="primary" icon={<PlusOutlined />} onClick={onCreate}>
              Create
            </Button>
          )}
          <Button icon={<RedoOutlined />} onClick={onRefetch} />
        </Flex>
      </Flex>
    </Paper>
  );
};

export default HeaderTable;
