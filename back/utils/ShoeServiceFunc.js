const Shoe = require('../models/Shoe');

module.exports = chooseCurrentPageFunc = async (page, discount) => {
  if (discount) {
    if (page === 'new')
      return await Shoe.find({ shoeNew: true, shoeDiscountPrice: { $gt: 0 } });
    if (page === 'sale')
      return await Shoe.find({ shoeSale: true, shoeDiscountPrice: { $gt: 0 } });

    return await Shoe.find({ shoeFor: page, shoeDiscountPrice: { $gt: 0 } });
  }

  if (page === 'new') return await Shoe.find({ shoeNew: true });
  if (page === 'sale') return await Shoe.find({ shoeSale: true });

  return await Shoe.find({ shoeFor: page });
};

module.exports = addPercentageFunc = async (page) => {
  const addPercentage = await chooseCurrentPageFunc(page, 'discount');
  const copyFns = JSON.parse(JSON.stringify(addPercentage));

  return copyFns
    .map((data) => {
      const percentageSale = Math.floor(
        100 - (data.shoeDiscountPrice * 100) / data.shoePrice
      );

      return { ...data, percentageSale };
    })
    .sort((a, b) => b.percentageSale - a.percentageSale);
};

module.exports = comparativeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where === what[i]) return true;
  }
  return false;
};

module.exports = includesSizeFunc = (where, what) => {
  for (var i = 0; i < what.length; i++) {
    if (where.indexOf(what[i]) === -1) return false;
  }
  return true;
};

module.exports = colorFunc = (currentPage, shoeColor) => {
  let currentData = [];

  currentPage.map(
    (data) =>
      comparativeFunc(data.shoeColor, shoeColor) && currentData.push(data)
  );
  return currentData;
};

module.exports = styleFunc = (filtered, currentPage, shoeStyleName, value) => {
  let currentData = [];

  value &&
    filtered.map((data) => {
      comparativeFunc(data.shoeStyleName, shoeStyleName) &&
        currentData.push(data);
    });

  !value &&
    currentPage.map((data) => {
      comparativeFunc(data.shoeStyleName, shoeStyleName) &&
        currentData.push(data);
    });
  return currentData;
};

module.exports = materialFunc = (
  filtered,
  currentPage,
  shoeStyleMaterial,
  value
) => {
  let currentData = [];

  value &&
    filtered.map((data) => {
      comparativeFunc(data.shoeStyleMaterial, shoeStyleMaterial) &&
        currentData.push(data);
    });

  !value &&
    currentPage.map((data) => {
      comparativeFunc(data.shoeStyleMaterial, shoeStyleMaterial) &&
        currentData.push(data);
    });

  return currentData;
};

module.exports = priceFunc = (filtered, currentPage, shoePrice, value) => {
  const { from = 0, to = 10000 } = shoePrice;
  let currentData;

  value &&
    (currentData = filtered.filter(
      (f) => f.shoePrice >= from && f.shoePrice <= to
    ));

  !value &&
    (currentData = currentPage.filter(
      (f) => f.shoePrice >= from && f.shoePrice <= to
    ));

  return currentData;
};

module.exports = sizeFunc = (filtered, currentPage, shoeSize, value) => {
  let currentData = [];

  value &&
    filtered.map(
      (data) =>
        includesSizeFunc(data.shoeSize, shoeSize) && currentData.push(data)
    );

  !value &&
    currentPage.map(
      (data) =>
        includesSizeFunc(data.shoeSize, shoeSize) && currentData.push(data)
    );

  return currentData;
};
