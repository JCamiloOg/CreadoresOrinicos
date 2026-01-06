import { body, param } from "express-validator";

export const validateCreateWord = [
    body(["word_es", "word_en"])
        .trim()
        .notEmpty()
        .withMessage("La palabra es obligatoria")
        .isString()
        .withMessage("La palabra debe ser una cadena de texto")
        .isLength({ min: 3, max: 30 })
        .withMessage("La palabra debe tener entre 3 y 30 caracteres"),
    body(["description_es", "description_en"])
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres")
];

export const validateUpdateWord = [
    param("id")
        .trim()
        .notEmpty()
        .withMessage("ID no idenficado."),
    body("word")
        .trim()
        .notEmpty()
        .withMessage("La palabra es obligatoria")
        .isString()
        .withMessage("La palabra debe ser una cadena de texto")
        .isLength({ min: 3, max: 30 })
        .withMessage("La palabra debe tener entre 3 y 30 caracteres"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("La descripción es obligatoria")
        .isString()
        .withMessage("La descripción debe ser una cadena de texto")
        .isLength({ min: 10, max: 1000 })
        .withMessage("La descripción debe tener entre 10 y 1000 caracteres")
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

