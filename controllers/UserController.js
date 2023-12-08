const UserModel = require("../models/User.js");

module.exports = {
  get: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.get({ id: userId })
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

  create: (req, res) => {
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

      UserModel.create(user)
          .then((data) => { res.status(201).send(data)})
          .catch((err) => { console.log(err.message); res.status(500).end()});
  },

  update: (req, res) => {
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

    UserModel.update({ id: userId }, payload)
      .then(() => {
        return UserModel.get({ id: userId });
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

  delete: (req, res) => {
    const {
      params: { userId },
    } = req;

    UserModel.delete({ id: userId })
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

  getAll: (req, res) => {
    UserModel.getAll(req.query)
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
