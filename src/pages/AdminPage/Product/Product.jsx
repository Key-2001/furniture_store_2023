import { Fragment, useCallback, useContext, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { GetProductAdminService } from "../../../services/AdminService";
import Paper from "../../../common/Paper";
import ProductList from "./ProductList/ProductList";
import HeaderTable from "../../../common/HeaderTable";
import { adminContext } from "../../../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { RemoveProductService } from "../../../services/ProductService";
import { toast } from "react-toastify";
const Product = () => {
  const navigate = useNavigate();
  const { dispatch, tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [query, setQuery] = useState({
    name: "",
    page: 1,
    totalPage: 1,
    company: [],
    category: [],
  });

  const [data, setData] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["list-product"],
    () =>
      GetProductAdminService(
        {
          name: query.name,
          page: query.page,
          company: query.company,
          category: query.category,
        },
        tokenAdmin
      ),
    {
      enabled: false,
      onSuccess: (response) => {
        const { data, page, success } = response;
        if (success) {
          setQuery((prev) => {
            return {
              ...prev,
              page: Number(page?.currentPage),
              totalPage: Number(page?.totalPage),
            };
          });
          setData(data);
        } else {
          if (response?.statusCode === 404) {
            dispatch({ type: "LOG_OUT" });
          }
        }
      },
    }
  );

  const mutateRemove = useMutation({
    mutationFn: (ids) => RemoveProductService(ids, tokenAdmin),
  });
  //! Function
  const handleChangeModal = useCallback(
    () => setIsOpenModal((active) => !active),
    []
  );
  const handleDelete = useCallback(async () => {
    try {
      const ids = `ids[]=${selectedRowKeys.join("&ids[]=")}`;
      const response = await mutateRemove.mutateAsync(ids);
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
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query.page, query.name, query.company, query.category]);
  //! Render
  return (
    <Fragment>
      <HeaderTable
        title="Product list"
        isCreate={true}
        isDelete={true}
        selectedRowKeys={selectedRowKeys}
        onRefetch={refetch}
        onCreate={() => {
          navigate("/admin/product/create", { replace: true });
        }}
        onDelete={handleDelete}
        isLoadingDelete={mutateRemove.isLoading}
        isOpenModal={isOpenModal}
        handleChangeModal={handleChangeModal}
      />
      <Paper isFix={true}>
        <ProductList
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

export default Product;
