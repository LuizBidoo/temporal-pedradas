import express from "express";
import serverless from "serverless-http";

const app = express();
const router = express.Router();

router.get("/hello", (_req, res) => {
  res.json({ message: "hello, world" });
});

app.use(["/api", "/.netlify/functions/app"], router);

export const handler = serverless(app);
