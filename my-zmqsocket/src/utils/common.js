export const URL_API = 'http://192.168.1.13:8989/api';
export const TOKEN_KEY = 'TOKEN_ZMQ';
export const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN_ZMQ';

export const formatPrice = (num) => {
  return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND`;
};