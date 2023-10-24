import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { adminContext } from "../../../../context/AdminContext";
import { GetOrderAdminDetailService } from "../../../../services/AdminService";

const OrderDetail = () => {
  const { id } = useParams();
  console.log("njsad", id);
  const { tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const [data, setData] = useState({});
  const { isLoading, isFetching, refetch } = useQuery(
    ["order-detail"],
    () => GetOrderAdminDetailService(id, tokenAdmin),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("response", response);
        const { success, data } = response;
        if (success) {
          setData(data);
        }
      },
    }
  );
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return <div>OrderDetail</div>;
};

export default OrderDetail;
