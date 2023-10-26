import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { adminContext } from "../../../context/AdminContext";
import { useQuery } from "@tanstack/react-query";
import { GetAllDiscountService } from "../../../services/DiscountService";
import HeaderTable from "../../../common/HeaderTable";
import Paper from "../../../common/Paper";
import DiscountList from "./DiscountList/DiscountList";
const Discount = () => {
  const { tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    idDiscount: "",
    page: 1,
    totalPage: 10,
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoading, isFetching, refetch } = useQuery(
    ["list-discount"],
    () =>
      GetAllDiscountService(tokenAdmin, {
        idDiscount: query.idDiscount,
        page: query.page,
      }),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("response", response);
        const { success, data, page } = response;
        if (success) {
          setData(data);
          setQuery((prev) => {
            return {
              ...prev,
              page: Number(page?.currentPage),
              totalPage: Number(page?.totalPage),
            };
          });
        }
      },
    }
  );
  //! Function
  const handleDelete = useCallback(() => {}, [selectedRowKeys]);
  const handleChangeModal = useCallback(
    () => setIsOpenModal((active) => !active),
    []
  );
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query.page, query.idDiscount]);
  //! Render
  return (
    <Fragment>
      <HeaderTable
        title="Discount list"
        isCreate={true}
        isDelete={true}
        selectedRowKeys={selectedRowKeys}
        onRefetch={refetch}
        onCreate={() => {}}
        onDelete={handleDelete}
        isLoadingDelete={false}
        isOpenModal={isOpenModal}
        handleChangeModal={handleChangeModal}
      />
      <Paper>
        <DiscountList
          isLoading={isLoading || isFetching}
          data={data}
          query={query}
          setQuery={setQuery}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </Paper>
    </Fragment>
  );
};

export default Discount;
