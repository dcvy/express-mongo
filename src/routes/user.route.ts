import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/auth.middleware";

const router = Router();

router.use(verifyToken);

router.get("/", verifyToken, UserController.getUsers);
router.get("/:id", verifyToken, UserController.getUserById);
router.post("/", verifyToken, UserController.create);
router.put("/:id", verifyToken, UserController.update);
router.delete("/:id", verifyToken, UserController.delete);

export default router;
