import express from "express";

const app = express();
app.use(express.json());

const port = 5000 || process.env.PORT;

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
