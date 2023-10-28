/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { categoryList, colorsList, companyList } from "../../constants";
import { BsCheck } from "react-icons/bs";
import { formatCurrency } from "../../utils";
import { useEffect, useState } from "react";

const FilterProductsPage = (props) => {
  //! Props
  const { query, handleChangeQuery, handleClearFilter, setQuery } = props;
  //! State
  const [queryDebounce, setQueryDebounce] = useState({
    name: query.name,
    price: query.price,
  });
  //! Function

  //! Effect
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setQuery((prev) => {
        return {
          ...prev,
          name: queryDebounce.name,
        };
      });
    }, 500);
    return () => clearTimeout(idTimeout);
  }, [queryDebounce.name]);
  useEffect(() => {
    const idTimeout = setTimeout(() => {
      setQuery((prev) => {
        return {
          ...prev,
          price: queryDebounce.price,
        };
      });
    }, 500);
    return () => clearTimeout(idTimeout);
  }, [queryDebounce.price]);
  //! Render
  return (
    <div className="classify-options">
      <div className="content">
        <form>
          <div className="form-control">
            <input
              type="text"
              name="name"
              placeholder="Search"
              className="search-input"
              value={queryDebounce?.name}
              onChange={(e) =>
                setQueryDebounce((prev) => {
                  return {
                    ...prev,
                    name: e.target.value,
                  };
                })
              }
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            <div className="wrap-category">
              <button
                type="button"
                name="category"
                className={`${query?.category === "" ? "null active" : "null"}`}
                value={""}
                onClick={handleChangeQuery}
              >
                all
              </button>
              {categoryList &&
                categoryList.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    name="category"
                    value={item.value}
                    className={`${
                      item.value === query?.category ? "null active" : "null"
                    }`}
                    onClick={handleChangeQuery}
                  >
                    {item.label}
                  </button>
                ))}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select
              name="company"
              className="company"
              value={query?.company}
              onChange={handleChangeQuery}
            >
              <option value="all">all</option>
              {companyList &&
                companyList.map((item, index) => (
                  <option key={index} value={item?.value}>
                    {item?.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-control">
            <h5>colors</h5>
            <div className="colors">
              <button
                type="button"
                name="color"
                value=""
                className={`${
                  query?.color === "" ? "all-btn active" : "all-btn"
                }`}
                onClick={handleChangeQuery}
              >
                all
              </button>
              {colorsList &&
                colorsList.map((item, index) => (
                  <button
                    type="button"
                    key={index}
                    name="color"
                    value={item?.value}
                    className={`${
                      query?.color === item?.value
                        ? "color-btn active"
                        : "color-btn"
                    }`}
                    style={{
                      backgroundColor: `${item.value}`,
                      border: "1px solid #dedede",
                    }}
                    onClick={handleChangeQuery}
                  >
                    <BsCheck
                      className="check-icon"
                      style={{
                        color: item.value === "#ffffff" ? "#000" : "#fff",
                      }}
                    />
                  </button>
                ))}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatCurrency(queryDebounce?.price)}</p>
            <input
              type="range"
              min="0"
              max="5000000"
              name="price"
              value={queryDebounce?.price}
              onChange={(e) =>
                setQueryDebounce((prev) => {
                  return {
                    ...prev,
                    price: e.target.value,
                  };
                })
              }
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={handleClearFilter}>
          clear filter
        </button>
      </div>
    </div>
  );
};

export default FilterProductsPage;
