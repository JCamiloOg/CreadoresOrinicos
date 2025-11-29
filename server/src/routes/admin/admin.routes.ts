import { login } from "@/controllers/admin/users.controller";
import { Router } from "express";
import usesrRouter from "./userRoutes/users.routes";
import { validateLogin } from "@/middlewares/validations/validateUser";
import { validationErrors } from "@/middlewares/validationsErrors";
import { checkAuthAdmin } from "@/middlewares/authAdmin";
const router = Router();

router.post("/login", validateLogin, validationErrors, login);
router.use("/users", checkAuthAdmin, usesrRouter);

export default router;