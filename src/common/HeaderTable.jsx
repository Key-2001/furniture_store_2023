/* eslint-disable react/prop-types */
import { DeleteOutlined, PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Button, Flex } from "antd";
import Paper from "./Paper";

const HeaderTable = (props) => {
  //! Props
  const { isCreate, isDelete, onRefetch } = props;

  //! State

  //! Function

  //! Effect

  //! Render
  return (
    <Paper style={{ marginBottom: "12px" }}>
      <Flex justify={"flex-end"} align="center" gap={"middle"}>
        {isDelete && (
          <Button danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        )}
        {isCreate && (
          <Button type="primary" icon={<PlusOutlined />}>
            Create
          </Button>
        )}
        <Button icon={<RedoOutlined />} onClick={onRefetch} />
      </Flex>
    </Paper>
  );
};

export default HeaderTable;
