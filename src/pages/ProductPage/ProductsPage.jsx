import { Fragment, useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FilterProductsPage from "../../components/FilterProducts/FilterProductsPage";
import SortProducts from "../../components/SortProducts/SortProducts";
import ViewProductsPage from "../../components/ProductsRender/ViewProductsPage";
import { getSortType, getTypeRender } from "../../utils";
import { useQuery } from "@tanstack/react-query";
import { GetAllProductsService } from "../../services/ProductService";

const ProductsPage = () => {
  //! Props

  //! State
  const [isTypeRender, setIsTypeRender] = useState(getTypeRender());
  const [query, setQuery] = useState({
    name: "",
    category: "",
    company: "",
    color: "",
    price: 3000000,
    sort: getSortType(),
  });
  const [dataProducts, setDataProducts] = useState([]);
  const { isLoading, isFetching, refetch } = useQuery(
    ["products-list"],
    () => GetAllProductsService(query),
    {
      enabled: false,
      onSuccess: (response) => {
        setDataProducts(response?.products);
      },
    }
  );
  //! Function
  const handleChangeQuery = useCallback(
    (e) => {
      setQuery((prev) => {
        return {
          ...prev,
          [e.target.name]: e.target.value,
        };
      });
    },
    [query]
  );
  const handleClearFilter = useCallback(() => {
    setQuery((prev) => {
      return {
        ...prev,
        name: "",
        category: "",
        company: "",
        color: "",
        price: 3000000,
        sort: getSortType(),
      };
    });
  }, []);
  //! Effect
  useEffect(() => {
    refetch && refetch();
  }, [query]);
  //! Render
  return (
    <Fragment>
      <section className="title-section">
        <div className="section-center">
          <h3>
            <Link to="/">Home</Link> / products
          </h3>
        </div>
      </section>
      <section className="section-center products-section">
        <FilterProductsPage
          query={query}
          handleChangeQuery={handleChangeQuery}
          handleClearFilter={handleClearFilter}
          setQuery={setQuery}
        />
        <div>
          <SortProducts
            isTypeRender={isTypeRender}
            setIsTypeRender={setIsTypeRender}
            query={query}
            handleChangeQuery={handleChangeQuery}
            productLength={dataProducts?.length || 0}
          />
          <ViewProductsPage
            query={query}
            isTypeRender={isTypeRender}
            dataProducts={dataProducts}
            isLoading={isLoading || isFetching}
          />
        </div>
      </section>
    </Fragment>
  );
};

export default ProductsPage;
