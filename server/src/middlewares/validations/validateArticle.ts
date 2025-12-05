import { body, param } from "express-validator";

export const validateCreateArticle = [
    body(["title_es", "title_en"])
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio.")
        .isString()
        .withMessage("El título debe ser una cadena de texto.")
        .isLength({ min: 3, max: 40 })
        .withMessage("El título debe tener entre 3 y 40 caracteres."),
    body(["subtitle_es", "subtitle_en"])
        .trim()
        .notEmpty()
        .withMessage("El subtítulo es obligatorio.")
        .isString()
        .withMessage("El subtítulo debe ser una cadena de texto.")
        .isLength({ min: 3, max: 40 })
        .withMessage("El subtítulo debe tener entre 3 y 40 caracteres."),
    body(["description_es", "description_en"])
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria.")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto.")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres."),
    body("date")
        .trim()
        .notEmpty()
        .withMessage("La fecha es obligatoria.")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("La fecha debe tener el formato YYYY-MM-DD.")
];


export const validateUpdateArticle = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID no idenficado."),
    body(["title_es", "title_en"])
        .trim()
        .notEmpty()
        .withMessage("El título es obligatorio.")
        .isString()
        .withMessage("El título debe ser una cadena de texto.")
        .isLength({ min: 3, max: 40 })
        .withMessage("El título debe tener entre 3 y 40 caracteres."),
    body(["subtitle_es", "subtitle_en"])
        .trim()
        .notEmpty()
        .withMessage("El subtítulo es obligatorio.")
        .isString()
        .withMessage("El subtítulo debe ser una cadena de texto.")
        .isLength({ min: 3, max: 40 })
        .withMessage("El subtítulo debe tener entre 3 y 40 caracteres."),
    body(["description_es", "description_en"])
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria.")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto.")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres."),
    body("date")
        .trim()
        .notEmpty()
        .withMessage("La fecha es obligatoria.")
        .isDate({ format: "YYYY-MM-DD", strictMode: true })
        .withMessage("La fecha debe tener el formato YYYY-MM-DD.")
];

export const validateUpdateStatus = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID no idenficado."),
    body("status")
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio.")
        .isIn([0, 1])
        .withMessage("El estado debe ser 0 o 1.")
];

