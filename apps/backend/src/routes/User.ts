import expess from "express";
import { body } from "express-validator";
import { createUser, generateOtp, getUserDetails, login } from "../controllers/User";
import { CreateUserValidations, validateName } from "../middleware/validations/User";
import { validateOtp, validateToken } from "../middleware/validations";

const userRouter = expess.Router();

userRouter.get("/", (req, res) => {
  res.send("users");
});

userRouter.post("/", [...CreateUserValidations,validateOtp], createUser);
userRouter.post("/login",login );
userRouter.get('/get-userdata',[validateToken],getUserDetails);

userRouter.post("/generate-otp",[validateName], generateOtp);



export default userRouter;
