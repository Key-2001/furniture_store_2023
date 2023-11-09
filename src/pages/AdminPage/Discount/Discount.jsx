import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { adminContext } from "../../../context/AdminContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  DeleteMultiDiscountService,
  GetAllDiscountService,
} from "../../../services/DiscountService";
import HeaderTable from "../../../common/HeaderTable";
import Paper from "../../../common/Paper";
import DiscountList from "./DiscountList/DiscountList";
import { toast } from "react-toastify";
const Discount = () => {
  const { tokenAdmin, dispatch } = useContext(adminContext);
  //! Props

  //! State
  const [discountValue, setDiscountValue] = useState(null);
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    idDiscount: "",
    page: 1,
    totalPage: 10,
    valueDiscount: ''
  });
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { isLoading, isFetching, refetch } = useQuery(
    ["list-discount"],
    () =>
      GetAllDiscountService(tokenAdmin, {
        idDiscount: query.idDiscount,
        page: query.page,
        valueDiscount: query.valueDiscount
      }),
    {
      enabled: false,
      onSuccess: (response) => {
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
        } else {
          if (response.statusCode === 404) {
            dispatch({ type: "LOG_OUT" });
          }
        }
      },
    }
  );
  const mutateRemoves = useMutation({
    mutationFn: (ids) => DeleteMultiDiscountService(ids, tokenAdmin),
  });
  //! Function
  const handleDelete = useCallback(async () => {
    try {
      const ids = `ids[]=${selectedRowKeys.join("&ids[]=")}`;
      const response = await mutateRemoves.mutateAsync(ids);
      const { success, message } = response;
      if (!success) {
        throw new Error(message);
      }
      toast.success(message);
      refetch && refetch();
      setIsOpenModal(false);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }, [selectedRowKeys]);
  const handleChangeModal = useCallback(
    () => setIsOpenModal((active) => !active),
    []
  );
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query.page, query.idDiscount, query.valueDiscount]);
  //! Render
  return (
    <Fragment>
      <HeaderTable
        title="Discount list"
        isCreate={true}
        isDelete={true}
        selectedRowKeys={selectedRowKeys}
        onRefetch={refetch}
        onCreate={() => {
          setIsOpenDrawer(true);
        }}
        onDelete={handleDelete}
        isLoadingDelete={mutateRemoves.isLoading}
        isOpenModal={isOpenModal}
        handleChangeModal={handleChangeModal}
      />
      <Paper isFix={true}>
        <DiscountList
          isLoading={isLoading || isFetching}
          data={data}
          query={query}
          setQuery={setQuery}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          discountValue={discountValue}
          setDiscountValue={setDiscountValue}
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          refetch={refetch}
        />
      </Paper>
    </Fragment>
  );
};

export default Discount;
