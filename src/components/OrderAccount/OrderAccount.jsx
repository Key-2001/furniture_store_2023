import { useQuery } from "@tanstack/react-query";
import React, { Fragment, useEffect, useState } from "react";
import { GetAllOrderUserService } from "../../services/OrderService";

const OrderAccount = () => {
  //! Props

  //! State
  const [query, setQuery] = useState({
    page: 1,
    totalPage: 1,
    email: ''
  })
  const [data, setData] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["order-user"],
    () => GetAllOrderUserService({email: query.email, page: query.page}),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("response", response);
        const {page, data} = response;
        setData(data);
        setQuery(prev => {
          return{
            ...prev,
            page: page.currentPage,
            totalPage: page.totalPage
          }
        })
      },
    }
  );
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return (
    <Fragment>
      <h3
        style={{
          marginBottom: "1.5rem",
          textTransform: "unset",
          letterSpacing: "unset",
          color: "#453227",
        }}
      >
        Order
      </h3>
      
    </Fragment>
  );
};

export default OrderAccount;
