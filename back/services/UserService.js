import User from '../models/user.js';

class UserService {
  async create(user) {
    const customer = new User({
      name: user.name,
      surname: user.surname,
    });

    await customer.save();

    return customer;
  }
}

export default new UserService();
