import { createWord, getWords, updateStatusWord, updateWord } from "@/controllers/admin/glossary.controller";
import { validateCreateWord, ValidateUpdateStatus, validateUpdateWord } from "@/middlewares/validations/validateWord";
import { validationErrors } from "@/middlewares/validationsErrors";
import { Router } from "express";

const router = Router();

router.get("/", getWords);
router.get("/:id", getWords);
router.post("/create", validateCreateWord, validationErrors, createWord);
router.put("/update/:id", validateUpdateWord, validationErrors, updateWord);
router.put("/updateStatus/:id", ValidateUpdateStatus, validationErrors, updateStatusWord);

export default router;