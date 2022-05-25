import Shoe from '../models/shoe.js';

class UserService {
  async getShoeSale() {
    const saleShoe = await Shoe.aggregate([
      { $match: { shoeSale: true } },
      { $sample: { size: 5 } },
    ]);

    return saleShoe;
  }
}

export default new UserService();
