/* eslint-disable react/prop-types */
import React from "react";
import logoImg from "../../assets/images/logo.svg";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import {AiOutlineClose} from 'react-icons/ai'


const Sidebar = (props) => {
  const { isShowSidebar, handleToggleShowSidebar } = props;
  return (
    <div>
      <aside
        className={`${isShowSidebar ? "sidebar is-show-sidebar" : "sidebar"}`}
      >
        <div className="sidebar-header">
          <img src={logoImg} alt="" />
          <button className="close-btn" onClick={handleToggleShowSidebar}>
            <AiOutlineClose />
          </button>
        </div>
        <ul className="nav-links">
          <li onClick={handleToggleShowSidebar}>
            <Link to="/">home</Link>
          </li>
          <li onClick={handleToggleShowSidebar}>
            <Link to="/about">about</Link>
          </li>
          <li onClick={handleToggleShowSidebar}>
            <Link to="/products">products</Link>
          </li>
        </ul>
        <div className="cart-btn-wrap">
          <Link
            to="/cart"
            className="cart-btn"
            onClick={handleToggleShowSidebar}
          >
            cart
            <span className="cart-container">
              <FaShoppingCart />
              <span className="cart-values">{0}</span>
            </span>
          </Link>
          {true ? (
            <button className="login-btn" type="button">
              login
              <BsFillPersonPlusFill className="icon-login" />
            </button>
          ) : (
            <Link
              to={`/user/me`}
              className="login-btn"
              onClick={handleToggleShowSidebar}
            >
              User
              <FaUser className="icon-login" />
            </Link>
          )}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
