import express from "express";
import { fetchPedradasController, fetchByMemberController } from "../controllers/messagesController.js";
// mensagem terá: mensagem, usuário que mandou, data no grupo, upvotes

const messagesRouter = express.Router();

if(!fetchPedradasController) {
  console.log("n exportou o controller");
}


// Get Messages pra montar o leaderboard
messagesRouter.get("/messages", fetchPedradasController);
// Post Messages pra submissao
//messagesRouter.post("/messages");
// Get por membro do temporal
messagesRouter.get("/messages/:member", fetchByMemberController);
// upvotes
//messagesRouter.post("/messages/:id/upvote");

export default messagesRouter;
