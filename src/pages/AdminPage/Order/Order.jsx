import { useQuery } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useState } from "react";
import HeaderTable from "../../../common/HeaderTable";
import Paper from "../../../common/Paper";
import { adminContext } from "../../../context/AdminContext";
import { GetOrderAdminService } from "../../../services/AdminService";
import OrderList from "./OrderList/OrderList";

const Order = () => {
  const { dispatch, tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    email: "",
    page: 1,
    totalPage: 1,
    phoneNumber: "",
    name: "",
    status: [],
  });

  const { isLoading, isFetching, refetch } = useQuery(
    ["user-list"],
    () =>
      GetOrderAdminService(
        {
          email: query.email,
          page: query.page,
          phoneNumber: query.phoneNumber,
          name: query.name,
          status: query.status,
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
              page: Number(page.currentPage),
              totalPage: Number(page.totalPage),
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
  }, [query.page, query.email, query.phoneNumber, query.name, query.status]);

  //! Render
  return (
    <Fragment>
      <HeaderTable onRefetch={refetch} title="Order list" />
      <Paper isFix={true}>
        <OrderList
          isLoading={isLoading || isFetching}
          data={data}
          query={query}
          setQuery={setQuery}
        />
      </Paper>
    </Fragment>
  );
};

export default Order;
