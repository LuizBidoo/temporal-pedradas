import express from "express";

const app = express();

app.use(express.json());

const router = express.Router();

router.get("/", (req, res) => {
  res.json({message: "hello world!"})
});

app.use(["/api", "/.netlify/functions"], router);

export default app;
