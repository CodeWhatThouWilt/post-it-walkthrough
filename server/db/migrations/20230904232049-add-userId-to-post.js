"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.addColumn("Posts", "userId", {
			type: Sequelize.INTEGER,
			references: {
				model: "Users",
				key: "id",
			},
			allowNull: false,
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.removeColumn("Posts", "userId");
	},
};
