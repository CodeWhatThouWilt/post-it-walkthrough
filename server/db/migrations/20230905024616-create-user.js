"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			await queryInterface.createTable("Users", {
				id: {
					allowNull: false,
					autoIncrement: true,
					primaryKey: true,
					type: Sequelize.INTEGER,
				},
				username: {
					type: Sequelize.STRING,
					allowNull: false, // NOT NULL
					unique: true, // UNIQUE
				},
				createdAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
				updatedAt: {
					allowNull: false,
					type: Sequelize.DATE,
					defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
				},
			});
		} catch (error) {
			console.log(error);
		}
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable("Users");
	},
};
