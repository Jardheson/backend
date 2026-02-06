const { User } = require("../models");

class UserService {
  static async getById(id) {
    return User.findByPk(id, {
      attributes: ["id", "firstname", "surname", "email"],
    });
  }

  static async create(data) {
    const { firstname, surname, email, password } = data;
    return User.create({ firstname, surname, email, password });
  }

  static async update(id, data) {
    const { firstname, surname, email } = data;
    const user = await User.findByPk(id);

    if (!user) return null;

    await user.update({ firstname, surname, email });
    return user;
  }

  static async delete(id) {
    const user = await User.findByPk(id);
    if (!user) return null;

    await user.destroy();
    return true;
  }
}

module.exports = UserService;
