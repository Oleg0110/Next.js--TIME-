import {
  chooseCurrentPageFunc,
  addPercentageFunc,
  includesSizeFunc,
  comparativeFunc,
  colorFunc,
  styleFunc,
  materialFunc,
  priceFunc,
  sizeFunc,
} from '../utils/ShoeServiceFunc.js';

class ShoeService {
  async getShoes(page) {
    return await chooseCurrentPageFunc(page);
  }

  async sortShoe(page, sort) {
    const currentPage = await chooseCurrentPageFunc(page);

    switch (sort) {
      case 'cheapToExpensive':
        return currentPage.sort((a, b) => a.shoePrice - b.shoePrice);

      case 'expensiveToCheap':
        return currentPage.sort((a, b) => b.shoePrice - a.shoePrice);

      case 'novelty':
        return currentPage.sort((a, b) => b.date - a.date);

      case 'maximumDiscount':
        return addPercentageFunc(page);

      default:
        break;
    }
  }

  async filterShoes(page, filter) {
    const { shoeColor, shoeStyleName, shoeSize, shoeStyleMaterial, shoePrice } =
      filter;

    const currentPage = await chooseCurrentPageFunc(page);

    let filtered = [];

    //Color
    shoeColor !== undefined && (filtered = colorFunc(currentPage, shoeColor));

    // Style
    shoeStyleName !== undefined && shoeColor
      ? (filtered = styleFunc(filtered, currentPage, shoeStyleName, true))
      : shoeStyleName !== undefined &&
        (filtered = styleFunc(filtered, currentPage, shoeStyleName, false));

    // Material
    shoeStyleMaterial !== undefined && (shoeColor || shoeStyleName)
      ? (filtered = materialFunc(
          filtered,
          currentPage,
          shoeStyleMaterial,
          true
        ))
      : shoeStyleMaterial !== undefined &&
        (filtered = materialFunc(
          filtered,
          currentPage,
          shoeStyleMaterial,
          false
        ));

    // Price
    shoePrice !== undefined && (shoeColor || shoeStyleName || shoeStyleMaterial)
      ? (filtered = priceFunc(filtered, currentPage, shoePrice, true))
      : shoePrice !== undefined &&
        (filtered = priceFunc(filtered, currentPage, shoePrice, false));

    //Size
    shoeSize !== undefined &&
    (shoeColor || shoeStyleName || shoeStyleMaterial || shoePrice)
      ? (filtered = sizeFunc(filtered, currentPage, shoeSize, true))
      : (filtered =
          shoeSize !== undefined &&
          sizeFunc(filtered, currentPage, shoeSize, false));

    return filtered;
  }
}

export default new ShoeService();
