import express from "express";
import { forgotPasswordController, getOrdersController, registerController } from "../controllers/authController.js";
import { testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { loginController } from "../controllers/authController.js";
import {updateProfileController} from "../controllers/authController.js"

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/forgot-password", forgotPasswordController)
router.get("/test", requireSignIn,isAdmin, testController);
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ok: true})
})
router.get("/admin-auth", requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok: true})
})
router.put("/profile", requireSignIn, updateProfileController)
router.get("/orders", requireSignIn, getOrdersController)
export default router;
