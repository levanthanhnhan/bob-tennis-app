import CryptoJS from 'crypto-js';

function createSignature(orderCode) {
  const data = {
    orderCode: orderCode,
    amount: import.meta.env.VITE_FUND_PRICE,
    description: "BOB" + orderCode,
    cancelUrl: import.meta.env.VITE_PAYOS_CANCEL_URL,
    returnUrl: import.meta.env.VITE_PAYOS_RETURN_URL,
  };

  const sortData = sortObjDataByAlphabet(data);
  const stringifyData = Object.keys(sortData)
    .map((key) => `${key}=${data[key]}`)
    .join("&");

    return CryptoJS.HmacSHA256(stringifyData, import.meta.env.VITE_PAYOS_CHECKSUM_KEY).toString(CryptoJS.enc.Hex);
}

function sortObjDataByAlphabet(obj) {
  const sortedKeys = Object.keys(obj).sort();
  const sortedObject = {};

  sortedKeys.forEach((key) => {
    sortedObject[key] = obj[key];
  });
  return sortedObject;
}

function createOrder() {
  const data = {
    orderCode: orderCode,
    amount: import.meta.env.VITE_FUND_AMOUNT,
    description: "BOB" + orderCode,
    items: [
      {
        name: "FUND",
        quantity: 1,
        price: import.meta.env.VITE_FUND_AMOUNT
      }
    ],
    cancelUrl: import.meta.env.VITE_PAYOS_CANCEL_URL,
    returnUrl: import.meta.env.VITE_PAYOS_RETURN_URL,
    signature: createSignature(),
  };

  return data;
}

const payOS = {
    createSignature: createSignature,
    createOrder: createOrder,
}

export default payOS;
