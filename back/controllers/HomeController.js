import HomeService from '../services/HomeService.js';

class UserController {
  async getShoeSale(req, res) {
    try {
      const shoeSale = await HomeService.getShoeSale();

      res.status(200).json(shoeSale);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new UserController();
