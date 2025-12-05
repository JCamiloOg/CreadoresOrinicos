import { upload } from "@/config/uploadFiles";
import { createEvent, getEvents, updateEvent, updateEventImage, updateEventStatus } from "@/controllers/admin/events.controller";
import { validateCreateEvent, validateUpdateEvent, ValidateUpdateStatus } from "@/middlewares/validations/validateEvent";
import { validationErrors } from "@/middlewares/validationsErrors";
import { Router } from "express";

const router = Router();

router.get("/", getEvents);
router.get("/:id", getEvents);
router.post("/create", upload.single("image"), validateCreateEvent, validationErrors, createEvent);
router.put("/update/:id", validateUpdateEvent, validationErrors, updateEvent);
router.post("/update/image/:id", upload.single("image"), updateEventImage);
router.put("/update/status/:id", ValidateUpdateStatus, validationErrors, updateEventStatus);

export default router;