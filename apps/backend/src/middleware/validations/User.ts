import { body, ValidationChain } from "express-validator";

// Validation function for the 'name' field
export const validateName: ValidationChain = body("name")
  .notEmpty()
  .withMessage("Name is required");

// Validation function for the 'email' field
export const validateEmail: ValidationChain = body("email")
  .notEmpty()
  .withMessage("Email is required");

// Validation function for the 'password' field
export const validatePassword: ValidationChain = body("password")
  .notEmpty()
  .withMessage("Password is required")
  .matches(
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()-=_+{}\[\]:;"'<>,.?\/\\]).{6,30}$/
  )
  .withMessage(
    "Password must be between 6 and 30 characters and contain at least one letter, one number, and one special character"
  );

export const validateOtp: ValidationChain = body("otp")
  .notEmpty()
  .withMessage("Otp is required");
export const CreateUserValidations = [
  validateName,
  validateEmail,
  validatePassword,
  validateOtp
];
