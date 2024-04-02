module.exports = (timestamp) => {
  const date = new Date(timestamp);

  // Hours, minutes and seconds
  const hours = "0" + date
  .getHours()
  .toString();
  const minutes = "0" + date
  .getMinutes()
  .toString();
  const seconds = "0" + date
  .getSeconds()
  .toString();
  
  return `${hours.slice(-2)}:${minutes.slice(-2)}:${seconds.slice(-2)}`;
};
  
