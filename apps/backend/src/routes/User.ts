import expess from "express";
import { body } from "express-validator";
import { createUser, generateOtp } from "../controllers/User";
import { CreateUserValidations, validateName } from "../middleware/validations/User";
import { validateOtp } from "../middleware/validations";

const userRouter = expess.Router();

userRouter.get("/", (req, res) => {
  res.send("users");
});

userRouter.post("/", [...CreateUserValidations,validateOtp], createUser);

userRouter.post("/generate-otp",[validateName], generateOtp);

export default userRouter;
