import { fetchPedradas, fetchMemberPedradas } from "../services/messagesService.js";
import { MEMBERS } from "../config/members.js"; 

export const fetchPedradasController = async (req, res) => {
  const result = await fetchPedradas();

  if(result && result.error) {
    const statusCode = typeof result.status == "number" ? result.status : "500";
    res.status(statusCode).json({ message: "Houve um problema na requisição", error: result.error});
  }

  return res.status(200).json(result.data);
  
}

export const fetchByMemberController = async (req, res) => {
  const { member } = req.query;

  if(member && !MEMBERS.includes(member)) {
    res.status(400).json({error: "Membro não encontrado"})
  }

  const result = await fetchMemberPedradas();

  if(result && result.error) {
    const statusCode = typeof result.status == "number" ? result.status : "500";
    res.status(statusCode).json({ message: "Houve um problema na requisição", error: result.error});
  }

  return res.status(200).json(result.data);
  
}
