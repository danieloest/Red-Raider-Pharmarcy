const UserModel = require("../models/User.js");

module.exports = {
  getUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.findUser({ id: userId })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  createUser: (req, res) => {
    const {username, email, password, age, firstName, lastName, role} = req.body;

      if (!Object.keys(req.body).length) {
        return res.status(400).json({
          status: false,
          error: {
            message: "Body is empty, hence can not create the user.",
          },
        });
      }

      const user = {
        username,
        email,
        password,
        age,
        firstName,
        lastName,
        role
      }

      UserModel.createUser(user)
          .then((data) => { res.status(201).send(data)})
          .catch((err) => { console.log(err.message); res.status(500).end()});
  },

  updateUser: (req, res) => {
    const {
      user: { userId },
      body: payload,
    } = req;

    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the user.",
        },
      });
    }

    UserModel.updateUser({ id: userId }, payload)
      .then(() => {
        return UserModel.findUser({ id: userId });
      })
      .then((user) => {
        return res.status(200).json({
          status: true,
          data: user.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  deleteUser: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.deleteUser({ id: userId })
      .then((numberOfEntriesDeleted) => {
        return res.status(200).json({
          status: true,
          data: {
            numberOfUsersDeleted: numberOfEntriesDeleted,
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  getAllUsers: (req, res) => {
    UserModel.findAllUsers(req.query)
      .then((users) => {
        return res.status(200).json({
          status: true,
          data: users,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
