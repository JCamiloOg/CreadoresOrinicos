import { body, param } from "express-validator";


export const validateCreateEvent = [
    body(["title_es", "title_en"])
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser una cadena de texto")
        .isLength({ min: 3, max: 30 })
        .withMessage("El título debe tener entre 3 y 30 caracteres"),
    body(["description_es", "description_en"])
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres"),
    body("date")
        .trim()
        .notEmpty()
        .withMessage("La fecha es obligatoria")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("La fecha debe tener el formato YYYY-MM-DD"),
    body("hour")
        .trim()
        .notEmpty()
        .withMessage("La hora es obligatoria")
        .isTime({ mode: "withSeconds", hourFormat: "hour24" })
        .withMessage("La hora debe tener el formato HH:mm:ss"),
    body("modality")
        .trim()
        .notEmpty()
        .withMessage("La modalidad es obligatoria")
        .isIn(["Presencial", "Virtual"])
        .withMessage("La modalidad debe ser Presencial o Virtual"),
    body("address")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("La dirección debe ser una cadena de texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("La dirección debe tener entre 3 y 100 caracteres"),
    body("inscription_link")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("El enlace de inscripción debe ser una cadena de texto")
        .isLength({ min: 3, max: 500 })
        .withMessage("El enlace de inscripción debe tener entre 3 y 500 caracteres")
];

export const validateUpdateEvent = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID no idenficado."),
    body(["title_es", "title_en"])
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio")
        .isString()
        .withMessage("El título debe ser una cadena de texto")
        .isLength({ min: 3, max: 30 })
        .withMessage("El título debe tener entre 3 y 30 caracteres"),
    body(["description_es", "description_en"])
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres"),
    body("date")
        .trim()
        .notEmpty()
        .withMessage("La fecha es obligatoria")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("La fecha debe tener el formato YYYY-MM-DD"),
    body("hour")
        .trim()
        .notEmpty()
        .withMessage("La hora es obligatoria")
        .isTime({ hourFormat: "hour24" })
        .withMessage("La hora debe tener el formato HH:mm:ss"),
    body("modality")
        .trim()
        .notEmpty()
        .withMessage("La modalidad es obligatoria")
        .isIn(["Presencial", "Virtual"])
        .withMessage("La modalidad debe ser Presencial o Virtual"),
    body("address")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("La dirección debe ser una cadena de texto")
        .isLength({ min: 3, max: 100 })
        .withMessage("La dirección debe tener entre 3 y 100 caracteres"),
    body("inscription_link")
        .optional({ checkFalsy: true })
        .isString()
        .withMessage("El enlace de inscripción debe ser una cadena de texto")
        .isLength({ min: 3, max: 500 })
        .withMessage("El enlace de inscripción debe tener entre 3 y 500 caracteres")
];

export const ValidateUpdateStatus = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID no idenficado."),
    body("status")
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isNumeric()
        .withMessage("El estado debe ser un número")
        .isIn([0, 1])
        .withMessage("El estado debe ser 0 o 1")
];