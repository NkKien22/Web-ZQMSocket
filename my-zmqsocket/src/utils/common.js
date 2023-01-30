export const URL_API = 'https://localhost:7076/api';
export const TOKEN_KEY = 'TOKEN_ZMQ';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_ZMQ';
export const CART_ID = "CART_ID"
export const USER_ID = "USER_ID"
export const formatPrice = (num) => {
  return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND`;
};