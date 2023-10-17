export const getSortType = () => {
  const data = localStorage.getItem("sortType");
  return data ? data : "priceLowest";
};

export const getTypeRender = () => {
  const data = localStorage.getItem("typeRender");
  if (data === "true") {
    return true;
  } else if (data === "false") {
    return false;
  } else {
    return true;
  }
};