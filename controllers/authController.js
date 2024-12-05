const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;


const authController = {
  async signup(req, res) {
    const { username, email, password, first_name, last_name, user_role } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        first_name,
        last_name,
        user_role,
        date_joined: new Date(),
      });
      res.status(201).json({ message: 'User registered successfully!', user: newUser });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(400).send("User not found!");
      console.log(user.password);
      console.log(password);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials!");

      const token = jwt.sign({ id: user.id }, "your_secret_key", { expiresIn: "8h" });
      res.status(200).json({ token });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },

  async getProfile(req, res) {
    const userId = req.params.id;

    try {
      // Check if the logged-in user ID matches the requested user ID
      if (parseInt(req.user.id) !== parseInt(userId)) {
        return res.status(403).send("Access denied!");
      }

      // Fetch the user details, excluding the password
      const user = await User.findByPk(userId, {
        attributes: { exclude: ['password'] },
      });
      if (!user) return res.status(404).send('User not found!');

      res.status(200).json(user);
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  async updateProfile(req, res) {
    const userId = req.params.id;

    try {
      // Check if the logged-in user matches the requested user
      if (parseInt(req.user.id) !== parseInt(userId)) {
        return res.status(403).send("Access denied!");
      }

      const { first_name, last_name, status } = req.body;
      const user = await User.findByPk(userId);

      if (!user) return res.status(404).send('User not found!');

      await user.update({ first_name, last_name, status });
      res.status(200).json({ message: 'User updated successfully!', user });
    } catch (err) {
      res.status(500).send(err.message);
    }
  },
  async deleteUser(req, res) {
    const userId = req.params.id;

    try {
      // Check if the logged-in user matches the requested user
      if (parseInt(req.user.id) !== parseInt(userId)) {
        return res.status(403).send("Access denied!");
      }

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).send('User not found!');

      await user.destroy();
      res.status(200).send('User deleted successfully!');
    } catch (err) {
      res.status(500).send(err.message);
    }
  },




};

module.exports = authController;