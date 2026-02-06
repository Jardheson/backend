const UserService = require("../services/UserService");

class UserController {
  static async getById(req, res) {
    try {
      const user = await UserService.getById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async create(req, res) {
    try {
      const { password, confirmPassword } = req.body;

      if (password !== confirmPassword) {
        return res.status(400).json({ message: "Senhas não conferem" });
      }

      const user = await UserService.create(req.body);

      return res.status(201).json({
        id: user.id,
        firstname: user.firstname,
        surname: user.surname,
        email: user.email,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async update(req, res) {
    try {
      const user = await UserService.update(req.params.id, req.body);

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    try {
      const success = await UserService.delete(req.params.id);

      if (!success) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = UserController;
