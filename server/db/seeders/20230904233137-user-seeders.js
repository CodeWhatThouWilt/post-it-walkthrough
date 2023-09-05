"use strict";

const { User } = require("../models");
const { Op } = require("sequelize");

const users = [
	{
		username: "yake",
	},
	{
		username: "shmake",
	},
	{
		username: "shmakenstein",
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// Will validate at a model level before performing insertions
		await User.bulkCreate(users, { validate: true });

		// Does not validate at a model level before performing insertions
		// await queryInterface.bulkInsert("Users", users, {});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: ["yake", "shmake", "shmakenstein"],
				},
			},
			{}
		);

		// await queryInterface.bulkDelete('Users', {
		//   username: {
		//     [Op.in]: users.map(user => user.username)
		//   }
		// }, {});

		// await queryInterface.bulkDelete("Users", null, {});
	},
};
