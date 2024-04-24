import expess from "express";
import { body } from "express-validator";
import { createUser } from "../controllers/User";
import { CreateUserValidations } from "../middleware/validations/User";

const userRouter = expess.Router();

userRouter.get("/", (req, res) => {
  res.send("users");
});

userRouter.post(
  "/",
  [
    ...CreateUserValidations,
  ],
  createUser
);

userRouter.get("/", );

export default userRouter;
