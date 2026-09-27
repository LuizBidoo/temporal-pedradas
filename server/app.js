import express from "express";
import cors from "cors";
import helmet from "helmet";
import messagesRouter from "./routes/messages_route.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(["/api", "/.netlify/functions"], messagesRouter);

export default app;
