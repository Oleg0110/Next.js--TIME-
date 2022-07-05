export const firstLetterUpper = (category: string | string[]) => {
  const str = JSON.parse(JSON.stringify(category));
  let word;

  if (str) {
    word = str.split('')[0].toLocaleUpperCase() + str.slice(1);
  }
  return word;
};

export const includesSizeFunc = (where, what) => {
  let obj;

  const notAreInArray = where
    .filter((i) => !what.includes(i))
    .map((data) => (obj = { size: data, is: false }));

  const areInArray = where
    .filter((i) => what.includes(i))
    .map((data) => (obj = { size: data, is: true }));

  const sizes = []
    .concat(notAreInArray, areInArray)
    .sort((a, b) => a.size - b.size);

  return sizes;
};
