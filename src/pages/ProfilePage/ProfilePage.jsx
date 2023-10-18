import { Fragment, useCallback, useContext, useState } from "react";
import "./Profile.scss";
import { Link } from "react-router-dom";
import { authContext } from "../../context/AuthContext";
import UserAccount from "../../components/UserAccount/UserAccount";
const ProfilePage = () => {
  const { dispatch, user } = useContext(authContext);
  //! Props

  //! State
  const [isOrder, setIsOrder] = useState(false);
  //! Function
  const handleLogOutUser = useCallback(() => {
    dispatch({
      type: "LOG_OUT",
    });
  }, []);
  //! Effect
  //! Render
  return (
    <Fragment>
      <section
        className="screen-default account-page"
        style={{ maxWidth: "1300px", width: "100%", margin: "0 auto" }}
      >
        <div className="account-page-wrap">
          <div className="sidebar-account-wrap">
            <div className="sidebar-account">
              <h3 style={{ marginLeft: "1rem" }}>{user.name}</h3>
              <div className="option-account">
                <div
                  id="info"
                  className={`${
                    !isOrder
                      ? "sidebar-account-item is-active"
                      : "sidebar-account-item"
                  }`}
                  onClick={() => setIsOrder(false)}
                >
                  Profile
                </div>
                <div
                  id="order"
                  className={`${
                    isOrder
                      ? "sidebar-account-item is-active"
                      : "sidebar-account-item"
                  }`}
                  onClick={() => setIsOrder(true)}
                >
                  Orders
                </div>
                <Link
                  to="/"
                  className="sidebar-account-item"
                  onClick={handleLogOutUser}
                >
                  Log out
                </Link>
              </div>
            </div>
          </div>
          <div className="content-account">
            {!isOrder && <UserAccount />}
            {/* {!isOrder && (
              <UserInfo
                name={name}
                phoneNumber={phoneNumber}
                email={email}
                address={address}
              />
            )}
            {}
            {isOrder && <Order />} */}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProfilePage;
