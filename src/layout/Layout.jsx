import { Fragment, useCallback, useState } from "react";
import Header from "../components/Header/Header";
import Routers from "../routes/Routers";
import Footer from "../components/Footer/Footer";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
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
      <Header handleToggleShowSidebar={handleToggleShowSidebar}/>
      <Sidebar isShowSidebar={isShowSidebar} handleToggleShowSidebar={handleToggleShowSidebar}/>
      <main>
        <Routers />
      </main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
