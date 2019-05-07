export const getDate = date => {
  if (checkDate(date)) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
};

export const getTimeFromDate = date => {
  const hoursString = date.getHours().toString();
  const minsString = date.getMinutes().toString();
  let hour = hoursString;
  if (hoursString.length < 2) {
    hour = '0' + hoursString;
  }
  let mins = minsString;
  if (minsString.length < 2) {
    mins = '0' + minsString;
  }

  return hour + ':' + mins;
};

export const checkDate = date =>
  Object.prototype.toString.call(date) === '[object Date]';
