import express from "express";
import * as controller from "../controllers/users.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// @desc Login User
// @route POST /api/users/login
// @access Public
router
  .route("/")
  .post(controller.registerUser)
  .get(protect, admin, controller.getUsers);

// @desc Login User
// @route POST /api/users/login
// @access Public
router.post("/login", controller.loginUser);

// @ Get User Profile
// @GET /api/users/Profile
// @access Private
router.get("/profile", protect, controller.getUserProfile);

// @ UpdateUser Profile
// @PUT /api/users/Profile
// @access Private
router.put("/profile", protect, controller.updateUserProfile);

router
  .route("/:user_id")
  .get(protect, admin, controller.getUser)
  .put(protect, admin, controller.updateUser)
  .delete(protect, admin, controller.deleteUser);
export default router;
