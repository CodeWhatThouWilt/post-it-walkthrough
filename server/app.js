const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const { User, Post } = require("./db/models");

app.use(express.json());

// Get all users
app.get("/users", async (req, res) => {
	const users = await User.findAll();

	return res.json({ users });
});

app.get("/users/:userId", async (req, res) => {
	const { userId } = req.params;

	const user = await User.findByPk(userId);

	return res.json({ user });
});

app.post("/users", async (req, res) => {
	const { username } = req.body;

	const newUser = await User.create({
		username,
	});

	return res.status(201).json({ user: newUser });
});

app.delete("/users/:userId", async (req, res) => {
	const { userId } = req.params;

	const doomedUser = await User.findByPk(userId);

	await doomedUser.destroy();

	return res.json({ msg: `User ${userId} successfully deleted` });
});

app.put("/users/:userId", async (req, res) => {
	const { username } = req.body;
	const { userId } = req.params;

	const user = await User.findByPk(userId);

	user.username = username;

	await user.save();

	return res.json({ user });
});

app.get("/", (req, res) => {
	res.json({
		message: "API server is running",
	});
});

// Error handlers
app.use((_req, _res, next) => {
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = ["The requested resource couldn't be found."];
	err.status = 404;
	next(err);
});

const { ValidationError } = require("sequelize");

app.use((err, _req, _res, next) => {
	if (err instanceof ValidationError) {
		err.errors = err.errors.map((e) => e.message);
		err.title = "Validation error";
	}
	next(err);
});

app.use((err, _req, res, _next) => {
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || "Server Error",
		message: err.message,
		errors: err.errors,
	});
});

const port = 8000;
app.listen(port, () => console.log("Server is listening on port", port));
