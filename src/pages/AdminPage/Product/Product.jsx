import { Fragment, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetProductAdminService } from "../../../services/AdminService";
import Paper from "../../../common/Paper";
import ProductList from "./ProductList/ProductList";
import HeaderTable from "../../../common/HeaderTable";
import { adminContext } from "../../../context/AdminContext";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(adminContext);
  //! Props

  //! State
  const [query, setQuery] = useState({
    name: "",
    page: 1,
    totalPage: 1,
  });

  const [data, setData] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["list-product"],
    () => GetProductAdminService({ name: query.name, page: query.page }),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("response", response);
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
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query.page, query.name]);
  //! Render
  return (
    <Fragment>
      <HeaderTable
        isCreate={true}
        isDelete={true}
        onRefetch={refetch}
        onCreate={() => {
          navigate("/admin/product/create", { replace: true });
        }}
      />
      <Paper>
        <ProductList
          isLoading={isLoading || isFetching}
          data={data}
          query={query}
          setQuery={setQuery}
        />
      </Paper>
    </Fragment>
  );
};

export default Product;
