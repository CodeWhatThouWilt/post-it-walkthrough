"use strict";

const { Post } = require("../models");
const { Op } = require("sequelize");

const posts = [
	{
		body: "This app is so cool dood",
		userId: 1,
	},
	{
		body: "I'm yake's evil twin shmake. Hahahahahah",
		userId: 2,
	},
	{
		body: "My mom named me Shmakenstein how cool",
		userId: 3,
	},
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await Post.bulkCreate(posts, { validate: true });
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
