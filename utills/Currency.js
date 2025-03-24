export const formatToCurrency = (number) => {
    let integerPart = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `$${integerPart}`;
  };