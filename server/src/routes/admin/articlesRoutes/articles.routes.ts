import { upload } from "@/config/uploadFiles";
import { createArticle, updateArticle, updateArticleImage, updateArticleStatus } from "@/controllers/admin/articles.controller";
import { validateCreateArticle, validateUpdateArticle, validateUpdateStatus } from "@/middlewares/validations/validateArticle";
import { validationErrors } from "@/middlewares/validationsErrors";
import { findAllArticles, findArticleByID } from "@/models/articles.model";
import { Router } from "express";

const router = Router();

router.get("/", findAllArticles);
router.get("/:id", findArticleByID);
router.post("/create", upload.single("image"), validateCreateArticle, validationErrors, createArticle);
router.put("/update/:id", validateUpdateArticle, validationErrors, updateArticle);
router.post("/update/image/:id", upload.single("image"), updateArticleImage);
router.put("/update/status/:id", validateUpdateStatus, validationErrors, updateArticleStatus);

export default router;