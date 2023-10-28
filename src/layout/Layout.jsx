/* eslint-disable react/prop-types */
import { Fragment, useCallback, useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";
const Layout = ({ children, isLayout }) => {
  //! State
  const [isShowSidebar, setIsShowSidebar] = useState(false);
  //! Function
  const handleToggleShowSidebar = useCallback(
    () => setIsShowSidebar((active) => !active),
    []
  );
  //! Render
  return (
    <Fragment>
      {isLayout && (
        <Fragment>
          <Header handleToggleShowSidebar={handleToggleShowSidebar} />
          <Sidebar
            isShowSidebar={isShowSidebar}
            handleToggleShowSidebar={handleToggleShowSidebar}
          />
        </Fragment>
      )}
      <main>
        {/* <Routers /> */}
        {children}
      </main>
      {isLayout && (
        <Fragment>
          <Footer />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Layout;
