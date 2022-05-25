import ShoeService from '../services/ShoeService.js';

class ShoeController {
  async getShoes(req, res) {
    try {
      const { page } = req.params;

      if (!page) res.status(400).json({ error: 'invalid data' });

      const shoes = await ShoeService.getShoes(page);

      res.status(200).json(shoes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
  async sortShoe(req, res) {
    try {
      const { page, sort } = req.params;

      if (!page && !sort) res.status(400).json({ error: 'invalid data' });

      const sortedShoe = await ShoeService.sortShoe(page, sort);

      res.status(200).json(sortedShoe);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async filterShoes(req, res) {
    try {
      // const filter = {
      //   shoeColor: ['black', 'white', 'pink', 'gray'],
      //   shoeStyleName: ['sandals', 'bootforts'],
      //   shoeStyleMaterial: ['fiber', 'leather'],
      //   shoePrice: {
      //     from: 2500,
      //     to: 6000,
      //   },
      //   shoeSize: [40],
      // };
      const { page, filter } = req.params;

      if (!page && !filter) res.status(400).json({ error: 'invalid data' });

      const filteredShoes = await ShoeService.filterShoes(page, filter);

      res.status(200).json(filteredShoes);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ShoeController();
