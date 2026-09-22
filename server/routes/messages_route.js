import express from "express";

// mensagem terá: mensagem, usuário que mandou, data no grupo, upvotes

const messagesRouter = express.Router();

// Get Messages pra montar o leaderboard
messagesRouter.get("/", async (req, rest) => {
  res.json("teste");
});

// Post Messages pra submissao
messagesRouter.post();

