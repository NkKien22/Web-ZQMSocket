export const formatPrice = (num) => {
    return `${num?.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')} VND`;
};