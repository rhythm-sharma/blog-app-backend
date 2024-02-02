const user = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    profileImage: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return User;
};

export { user };
