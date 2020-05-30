var i;
i = new Promise(() => {
  console.log("1");
});
i = Promise.resolve(3).then(() => {
  console.log("3");
});
console.log("2");
