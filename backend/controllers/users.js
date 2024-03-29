import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/User.js";

// @Desc Register User & Get token
// @route POST /api/users/
// @access Public

const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	const userExists = await User.findOne({ email });
	if (userExists) {
		res.status(400);
		throw new Error("User exists");
	}
	try {
		const user = await User.create({
			name,
			email,
			password,
		});
		const payload = {
			user: {
				id: user._id,
			},
		};
		res.status(201).json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(payload),
		});
	} catch (error) {
		res.status(400);
		throw new Error(error.message);
	}
});

// @Desc Auth User & Get token
// @route GET /api/users/login
// @access Public

const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (user && (await user.matchPassword(password, user.password))) {
		const payload = {
			user: {
				id: user._id,
			},
		};
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(payload),
		});
	} else {
		res.status(403);
		throw new Error("Invalid Email or Password");
	}
});

// @Desc Get User's Profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		res.json({
			_id: user.id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @Desc Update User's Profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		req.body.password ? (user.password = req.body.password) : user.password;
		const updatedUser = await user.save();
		const payload = {
			user: {
				id: updatedUser._id,
			},
		};
		res.json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(payload),
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @Desc Get Users
// @route Get /api/users/
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	if (!users) {
		res.status(404);
		throw new Error("No users found");
	} else {
		res.status(200).json(users);
	}
});

// @Desc Delete User
// @route Delete /api/users/:user_id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.user_id);
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else {
		await user.remove();
		res.json({ message: "User Removed" });
	}
});

// @Desc Get User
// @route GET /api/users/:user_id
// @access Private/Admin
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.user_id).select("-password");
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else {
		res.status(200).json(user);
	}
});

// @Desc Update User
// @route PUT /api/users/:user_id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.user_id).select("-password");
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else {
		user.isAdmin = req.body.isAdmin;
		const updatedUser = await user.save();
		res.status(201).json(updatedUser);
	}
});

// @Desc add to Cart
// @route PUT /api/users/:user_id/cart
// @access Private
const addToCart = asyncHandler(async (req, res) => {
	const cartItems = req.body;
	const user = await User.findById(req.params.user_id).select("-password");
	if (!user) {
		res.status(404);
		throw new Error("User not found");
	} else {
		user.cart.push(...cartItems);
		const updatedUser = await user.save();
		res.status(201).json(updatedUser);
	}
});

export {
	registerUser,
	loginUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUser,
	updateUser,
	addToCart,
};
