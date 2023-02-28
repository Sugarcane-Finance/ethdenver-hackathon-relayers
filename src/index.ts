import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const port = process.env.PORT || "8080";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "5mb" }));

app.get("/", (req, res) => {
  res.send("Alive");
});

app.post("/", (req, res) => {
  res.send(req.body.blah);
});

app.listen(port, () => {
  console.log(`[Relayer]: Running at http://localhost:${port}`);
});
