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

export const token = JSON.parse(localStorage.getItem("token"));
export const tokenAdmin = JSON.parse(localStorage.getItem("token-admin"));

export const handleRenderSubtotalCart = (products) => {
  const subTotal = products.reduce((result, current) => {
    if (current?.amount <= current.maxAmount) {
      return result + current.amount * current.price;
    } else {
      return result + current.maxAmount * current.price;
    }
  }, 0);
  return subTotal;
};

export const handleRenderTotalDiscount = (
  discountCode,
  valueDiscount,
  products
) => {
  if (!discountCode) {
    return 0;
  } else {
    if (valueDiscount?.includes("%")) {
      const valueNumber = Number(valueDiscount?.split("%")[0]);
      return ((handleRenderSubtotalCart(products) / 100) * valueNumber).toFixed(
        2
      );
    } else {
      return Number(valueDiscount);
    }
  }
};

export const renderTotalAmountCartProducts = (products) => {
  const total = products?.reduce((result, current) => {
    if (current.amount <= current.maxAmount) {
      return result + current.amount;
    } else {
      return result + current.maxAmount;
    }
  }, 0);

  return products ? total : 0;
};

export const renderShippingFee = (products) => {
  if (handleRenderSubtotalCart(products) > 3000000) {
    return 0;
  } else {
    return 500000;
  }
};

export const formatCurrency = (money) => {
  return Number(money).toLocaleString("vi", {
    style: "currency",
    currency: "VND",
  });
};

export const getArrLast7Days = () => {
  const arr = [];
  for (let index = 6; index >= 0; index--) {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() - index))
      .toISOString()
      .slice(0, 10);
    arr.push(date);
  }
  return arr;
};
const dateDiffInDays = (a, b) => {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / _MS_PER_DAY);
};

export const getArrDays = (start, end) => {
  let arr = [];
  const startDate = new Date(start);
  const endDate = new Date(end);
  const difference = dateDiffInDays(startDate, endDate);
  for (let index = difference; index >= 0; index--) {
    const today = new Date();
    const date = new Date(today.setDate(today.getDate() - index))
      .toISOString()
      .slice(0, 10);
    arr.push(date);
  }
  return arr;
};
