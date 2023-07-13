export const validateConfig = (...params) => {
  // this function identifies if some key is empty
  const emptyKeys = [];
  params.forEach((obj, index) => {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key) && (obj[key] === null || obj[key] === undefined || obj[key] === "")) {
        emptyKeys.push({ index, key });
      }
    }
  });
  return emptyKeys;
};

export const mapObjectToArray = (obj) => {
  // this function converts objects into array
  return Object.entries(obj).map(([key, value]) => ({ key, value }));
};
