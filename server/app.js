const express = require("express");
const app = express();

require("dotenv").config();
require("express-async-errors");

const { User, Post } = require("./db/models");

app.use(express.json());

// Lesgiddit
app.get("/users", async (req, res) => {
	const users = await User.findAll();
	console.log(users);

	return res.json({ users });
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
		// stack: isProduction ? null : err.stack,
	});
});

const port = 8000;
app.listen(port, () => console.log("Server is listening on port", port));
