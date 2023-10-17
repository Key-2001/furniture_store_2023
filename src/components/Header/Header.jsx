/* eslint-disable react/prop-types */
import { Link, NavLink } from "react-router-dom";
import logoImg from "../../assets/images/logo.svg";
import { FaBars, FaShoppingCart, FaUser } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { useEffect, useRef } from "react";

const Header = (props) => {
  //! Props
  const { handleToggleShowSidebar } = props;
  //! State
  let activeStyle = {
    borderBottom: "2px solid #936a53",
  };
  const headerRef = useRef(null);
  //! Function
  const handleStickyHeader = () => {
    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("sticky__header");
      } else {
        headerRef.current.classList.remove("sticky__header");
      }
    });
  };
  //! Effect
  useEffect(() => {
    handleStickyHeader();
    return () => window.removeEventListener("scroll", handleStickyHeader);
  }, []);
  //! Render
  return (
    <nav ref={headerRef}>
      <div className="nav-center">
        <div className="nav-header">
          <Link to="/" style={{ display: "flex" }}>
            <img src={logoImg} alt="" />
          </Link>
          <button
            type="button"
            className="nav-toggle"
            onClick={handleToggleShowSidebar}
          >
            <FaBars />
          </button>
        </div>
        <ul className="nav-links">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              about
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              products
            </NavLink>
          </li>
        </ul>
        <div className="cart-btn-wrap">
          <Link to="/cart" className="cart-btn">
            cart
            <span className="cart-container">
              <FaShoppingCart />
              <span className="cart-values">{0}</span>
            </span>
          </Link>
          {/* <button className='login-btn' type='button' onClick={() => setIsFormLogin((prev) => {
                        return{
                            ...prev,
                            isLogin: true,
                        }
                    })}> */}
          {true ? (
            <button className="login-btn" type="button">
              login
              <BsFillPersonPlusFill className="icon-login" />
            </button>
          ) : (
            <Link to={`/user/me`} className="login-btn">
              User
              <FaUser className="icon-login" />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
