const UserModel = require("../models/User");

module.exports = {

    checkPermission: (role) => {
        return (req, res, next) => {
            const userId = req.get("userId");

            UserModel.get(userId)
                .then((user) => {
                    if (!user) {
                        return res.status(403).json({
                            status: false,
                            error: "You do not have access, please login again.",
                        });
                    }
                    const userRole = user.role;
                    if (userRole !== role) {
                        return res.status(403).json({
                            status: false,
                            error: `You need the role of ${role} to access this endpoint.`,
                        });
                    }

                next();
            });
        };
    },
};