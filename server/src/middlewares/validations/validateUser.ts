import { body } from "express-validator";

export const validateUser = [
    body("username")
        .trim()
        .isLength({ min: 4, max: 15 })
        .withMessage("El nombre de usuario debe tener entre 4 y 15 caracteres")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .isString()
        .withMessage("El nombre de usuario debe ser una cadena de texto"),
    body("password")
        .trim()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto")
        .matches(/^(?=.*[A-Z])(?=(.*\d){3,}).{8,}$/)
        .withMessage("La contraseña debe tener al menos 3 números y una mayúscula")
];

export const validateLogin = [
    body("username")
        .trim()
        .notEmpty()
        .withMessage("El usuario es obligatorio"),
    body("password")
        .trim()
        .notEmpty()
        .withMessage("La contraseña es obligatoria")
];

export const validateUpdateStatus = [
    body("status")
        .trim()
        .notEmpty()
        .withMessage("El estado es obligatorio")
        .isNumeric()
        .withMessage("El estado debe ser un número")
        .isIn([0, 1])
        .withMessage("El estado debe ser 0 o 1")
];

export const validateUpdateUser = [
    body("username")
        .trim()
        .isLength({ min: 4, max: 15 })
        .withMessage("El nombre de usuario debe tener entre 4 y 15 caracteres")
        .notEmpty()
        .withMessage("El nombre de usuario es obligatorio")
        .isString()
        .withMessage("El nombre de usuario debe ser una cadena de texto"),
    body("password")
        .optional({ checkFalsy: true })
        .trim()
        .isLength({ min: 8 })
        .withMessage("La contraseña debe tener al menos 8 caracteres")
        .isString()
        .withMessage("La contraseña debe ser una cadena de texto")
        .matches(/^(?=.*[A-Z])(?=(.*\d){3,}).{8,}$/)
        .withMessage("La contraseña debe tener al menos 3 números y una mayúscula")
];
