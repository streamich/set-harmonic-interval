const setInt = setInterval;

setInt(() => console.log(1), 1000);
setTimeout(() => {
  setInt(() => console.log(2), 1000);
}, 500);
