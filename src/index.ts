import express from "express";

const app = express();
const port = process.env.PORT || "8080";

app.get("/", (req, res) => {
  res.send("Alive");
});

app.listen(port, () => {
  console.log(`[Relayer]: Running at http://localhost:${port}`);
});
