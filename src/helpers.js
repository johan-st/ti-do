const millisElapsedToString = millis => {
  let rem = Math.floor(millis / 1000);
  const days = Math.floor(rem / 86400);
  rem -= days * 86400;
  const hours = Math.floor(rem / 3600);
  rem -= hours * 3600;
  const minutes = Math.floor(rem / 60);
  rem -= minutes * 60;
  const seconds = rem % 60;
  const res = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  return res;
};

const millisToString = millis => {
  const date = new Date(parseInt(millis)).toLocaleString();
  return date;
};
module.exports = { millisElapsedToString, millisToString };
