import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { adminContext } from "../../../context/AdminContext";
import { GetAnalyticService } from "../../../services/AnalyticService";

const Analytic = () => {
  const { tokenAdmin } = useContext(adminContext);
  //! Props

  //! State
  const { isLoading, isFetching, refetch } = useQuery(
    ["analytic"],
    () => GetAnalyticService(tokenAdmin),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("response", response);
      },
    }
  );
  //! Function

  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Render
  return <div>Analytic</div>;
};

export default Analytic;
