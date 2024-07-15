import express from "express";
import userRouter from "./routes/User";
import {connectDB} from "./db";

const app = express();
app.use(express.json());

const port = 5000 || process.env.PORT;
connectDB();
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
    res.send("Hello World!");
}); 
  
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
