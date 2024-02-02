const blog = (sequelize, Sequelize) => {
  const Blog = sequelize.define("blog", {
    title: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    content: {
      type: Sequelize.DataTypes.JSONB,
      allowNull: true,
      defaultValue: {},
    },
    author: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    published: {
      type: Sequelize.DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    background: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  });

  return Blog;
};

export { blog };
