import { useQuery } from "@tanstack/react-query";
import { Fragment, useContext, useEffect, useState } from "react";
import HeaderTable from "../../../common/HeaderTable";
import Paper from "../../../common/Paper";
import { GetUserAdminService } from "../../../services/AdminService";
import UserList from "./UserList/UserList";
import { adminContext } from "../../../context/AdminContext";

const User = () => {
  const {tokenAdmin} = useContext(adminContext)
  //! Props

  //! State
  const [data, setData] = useState([]);
  const [query, setQuery] = useState({
    email: "",
    page: 1,
    totalPage: 1,
  });

  const { isLoading, isFetching, refetch } = useQuery(
    ["user-list"],
    () => GetUserAdminService({ email: query.email, page: query.page }, tokenAdmin),
    {
      enabled: false,
      onSuccess: (response) => {
        console.log("responseUser", response);
        const { data, page } = response;
        setQuery((prev) => {
          return {
            ...prev,
            page: Number(page.currentPage),
            totalPage: Number(page.totalPage),
          };
        });
        setData(data);
      },
    }
  );
  //! Function
  useEffect(() => {
    refetch && refetch();
  }, []);
  //! Effect

  //! Render
  return (
    <Fragment>
      <HeaderTable onRefetch={refetch} title="User list" />
      <Paper>
        <UserList
          isLoading={isLoading || isFetching}
          data={data}
          query={query}
          setQuery={setQuery}
        />
      </Paper>
    </Fragment>
  );
};

export default User;
