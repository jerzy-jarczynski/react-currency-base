export const convertPLNToUSD = (PLN) => {

  if (typeof PLN === 'string' || PLN instanceof String) {
    return NaN;
  }

  if (typeof PLN === 'undefined') {
    return NaN;
  }

  if (Array.isArray(PLN) || typeof PLN === 'object' || PLN === null || typeof PLN === 'function') {
    return 'Error';
  }

  if (PLN < 0) {
    return '$0.00';
  }

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}