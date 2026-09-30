import express from "express";
import { fetchPedradasController, fetchByMemberController, createPedradaController } from "../controllers/messagesController.js";
import { validate } from "../middlewares/validate.js";
import { newPedradaSchema } from "../validators/pedrada.validator.js";
// mensagem terá: mensagem, usuário que mandou, data no grupo, upvotes

const messagesRouter = express.Router();

if(!fetchPedradasController) {
  console.log("n exportou o controller");
}


// Get Messages pra montar o leaderboard
messagesRouter.get("/pedradas", fetchPedradasController);
messagesRouter.post("/pedradas", validate(newPedradaSchema), createPedradaController);
// Get por membro do temporal
messagesRouter.get("/pedradas/member/:member", fetchByMemberController);
// makeUpvote
//messagesRouter.post("/messages/:id/upvote");
// makeUpload
//messagesRouter.post("/uploads");

export default messagesRouter;
