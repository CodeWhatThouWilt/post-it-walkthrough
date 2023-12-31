"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
			Post.belongsTo(models.User, { foreignKey: "userId" });
		}
	}
	Post.init(
		{
			body: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					len: [1, 22],
				},
			},
			userId: {
				type: DataTypes.STRING,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: "Post",
		}
	);
	return Post;
};
