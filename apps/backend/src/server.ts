import express from "express";
import userRouter from "./routes/User";
import {connectDB} from "./db";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const port = 5000 || process.env.PORT;
connectDB();
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 
  
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
