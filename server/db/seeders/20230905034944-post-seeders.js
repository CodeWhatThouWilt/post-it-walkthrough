"use strict";

const { Post } = require("../models");
const { Op } = require("sequelize");

const posts = [
	{
		body: "Hello World",
		userId: 1,
	},
	{
		body: "This is a cool app!",
		userId: 2,
	},
	{
		body: "I'm shmakenstein!",
		userId: 3,
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		try {
			await Post.bulkCreate(posts, { validate: true });
		} catch (error) {
			console.log(error);
		}
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete(
			"Posts",
			{
				body: {
					[Op.in]: posts.map((post) => post.body),
				},
			},
			{}
		);
	},
};
