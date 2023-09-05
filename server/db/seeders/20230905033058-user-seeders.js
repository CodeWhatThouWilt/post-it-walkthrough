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
		// Does NOT provide model level validations when inserting
		// await queryInterface.bulkInsert('Users', users, {});

		// Does provide model level validations when inserting
		await User.bulkCreate(users, { validate: true });
	},

	async down(queryInterface, Sequelize) {
		// Will remove all users from your database
		// await queryInterface.bulkDelete('Users', null, {});

		// Will remove the users that were seeded into the db
		await queryInterface.bulkDelete(
			"Users",
			{
				username: {
					[Op.in]: users.map((user) => user.username),
				},
			},
			{}
		);
		// DELETE FROM Users
		// WHERE username IN ('yake','shmake','shmakenstein')
	},
};
