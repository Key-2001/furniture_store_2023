export const categoryList = [
  {
    value: "office",
    label: "Office",
  },
  {
    value: "living room",
    label: "Living room",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "bedroom",
    label: "Bedroom",
  },
  {
    value: "dining",
    label: "Dining",
  },
  {
    value: "kids",
    label: "Kids",
  },
];

export const categoryListAdmin = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "office",
    label: "Office",
  },
  {
    value: "living room",
    label: "Living room",
  },
  {
    value: "kitchen",
    label: "Kitchen",
  },
  {
    value: "bedroom",
    label: "Bedroom",
  },
  {
    value: "dining",
    label: "Dining",
  },
  {
    value: "kids",
    label: "Kids",
  },
];

export const companyList = [
  {
    value: "marcos",
    label: "Marcos",
  },
  {
    value: "liddy",
    label: "Liddy",
  },
  {
    value: "ikea",
    label: "Ikea",
  },
  {
    value: "caressa",
    label: "Caressa",
  },
];

export const companyListAdmin = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "marcos",
    label: "Marcos",
  },
  {
    value: "liddy",
    label: "Liddy",
  },
  {
    value: "ikea",
    label: "Ikea",
  },
  {
    value: "caressa",
    label: "Caressa",
  },
];

export const colorsList = [
  {
    label: "Red",
    value: "#FF0000",
  },
  {
    label: "Green",
    value: "#00ff00",
  },
  {
    label: "Blue",
    value: "#0000FF",
  },
  {
    label: "Black",
    value: "#000000",
  },
  {
    label: "Yellow",
    value: "#FFB900",
  },
  {
    label: "White",
    value: "#ffffff",
  },
];

export const enumStatus = [
  {
    value: "01",
    label: "Pending",
    color: "purple",
  },
  {
    value: "02",
    label: "Preparing",
    color: "orange",
  },
  {
    value: "03",
    label: "Delivering",
    color: "blue",
  },
  {
    value: "04",
    label: "Completed",
    color: "success",
  },
  {
    value: "05",
    label: "Cancel",
    color: "error",
  },
];

export const enumStatusAdmin = (valueSelected) => {
  switch (valueSelected) {
    case "01":
      return [
        {
          value: "01",
          label: "Pending",
        },
        {
          value: "02",
          label: "Preparing",
        },
        {
          value: "03",
          label: "Delivering",
          disabled: true,
        },
        {
          value: "04",
          label: "Completed",
          disabled: true,
        },
        {
          value: "05",
          label: "Cancel",
        },
      ];
    case "02":
      return [
        {
          value: "01",
          label: "Pending",
          disabled: true,
        },
        {
          value: "02",
          label: "Preparing",
        },
        {
          value: "03",
          label: "Delivering",
        },
        {
          value: "04",
          label: "Completed",
          disabled: true,
        },
        {
          value: "05",
          label: "Cancel",
        },
      ];
    case "03":
      return [
        {
          value: "01",
          label: "Pending",
          disabled: true,
        },
        {
          value: "02",
          label: "Preparing",
          disabled: true,
        },
        {
          value: "03",
          label: "Delivering",
        },
        {
          value: "04",
          label: "Completed",
        },
        {
          value: "05",
          label: "Cancel",
        },
      ];
    case "04":
      return [
        {
          value: "01",
          label: "Pending",
          disabled: true,
        },
        {
          value: "02",
          label: "Preparing",
          disabled: true,
        },
        {
          value: "03",
          label: "Delivering",
          disabled: true,
        },
        {
          value: "04",
          label: "Completed",
        },
        {
          value: "05",
          label: "Cancel",
          disabled: true,
        },
      ];
    case "05":
      return [
        {
          value: "01",
          label: "Pending",
          disabled: true,
        },
        {
          value: "02",
          label: "Preparing",
          disabled: true,
        },
        {
          value: "03",
          label: "Delivering",
          disabled: true,
        },
        {
          value: "04",
          label: "Completed",
          disabled: true,
        },
        {
          value: "05",
          label: "Cancel",
        },
      ];
    default:
      return [
        {
          value: "01",
          label: "Pending",
        },
        {
          value: "02",
          label: "Preparing",
        },
        {
          value: "03",
          label: "Delivering",
        },
        {
          value: "04",
          label: "Completed",
        },
        {
          value: "05",
          label: "Cancel",
        },
      ];
  }
};

export const enumPaymentStatus = [
  {
    value: "01",
    label: "Unpaid",
    color: "red",
  },
  {
    value: "02",
    label: "Paid",
    color: "green",
  },
];
