const { User } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

class AuthService {
  static async authenticate(email, password) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Usuário ou senha inválidos");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("Usuário ou senha inválidos");
    }

    const token = jwt.sign(
      { id: user.id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1d",
      },
    );

    return token;
  }
}

module.exports = AuthService;
