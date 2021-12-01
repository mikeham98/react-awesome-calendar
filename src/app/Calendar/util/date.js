export const getDate = date => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

export const checkDate = date =>
  Object.prototype.toString.call(date) === '[object Date]';
