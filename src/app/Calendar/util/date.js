export const getDate = date => {
    return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
};

export const checkDate = date =>
  Object.prototype.toString.call(date) === '[object Date]';
