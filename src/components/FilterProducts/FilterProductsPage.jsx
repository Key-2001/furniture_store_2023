/* eslint-disable react/prop-types */
import { categoryList, colorsList, companyList } from "../../constants";
import { BsCheck } from "react-icons/bs";
import { formatCurrency } from "../../utils";

const FilterProductsPage = (props) => {
  //! Props
  const { query, handleChangeQuery, handleClearFilter } = props;
  //! State

  //! Function

  //! Effect

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
              value={query?.name}
              onChange={handleChangeQuery}
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
                    <BsCheck className="check-icon" style={{color: item.value === '#ffffff' ? '#000' : '#fff'}}/>
                  </button>
                ))}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatCurrency(query?.price)}</p>
            <input
              type="range"
              min="0"
              max="5000000"
              name="price"
              value={query?.price}
              onChange={handleChangeQuery}
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
