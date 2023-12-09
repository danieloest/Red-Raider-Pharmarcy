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
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "User was not found.",
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
          .then((user) => {
            return res.status(201).json({
              status: true,
              data: user,
            })})
          .catch((err) => {
            console.log(err);
            return res.status(500).json({
              status: false,
              error: "User was not created.",
            });
          });
  },

  update: (req, res) => {
    const {
      params: { userId },
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
        .then((user) => {
          return res.status(200).json({
            status: true,
            data: user,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "User was not updated.",
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
        console.log(err);
        return res.status(500).json({
          status: false,
          error: "User was not deleted.",
        });
      });
  },

  getAll: (req, res) => {
    UserModel.getAll(req.query)
        .then((user) => {
          return res.status(200).json({
            status: true,
            data: user,
          })})
        .catch((err) => {
          console.log(err);
          return res.status(500).json({
            status: false,
            error: "Users were not found.",
          });
        });
  },
};
