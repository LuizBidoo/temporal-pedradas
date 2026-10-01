import { fetchPedradas, fetchMemberPedradas, createPedrada, makeUpvote } from "../services/messagesService.js";
import { MEMBERS } from "../config/members.js"; 

export const fetchPedradasController = async (req, res) => {
  const result = await fetchPedradas();

  if(result && result.error) {
    const statusCode = typeof result.status == "number" ? result.status : 500;
    return res.status(statusCode).json({ message: "Houve um problema na requisição", error: result.error});
  }

  return res.status(200).json(result.data);
  
}

export const fetchByMemberController = async (req, res) => {
  const { member } = req.params;

  if(member && !MEMBERS.includes(member)) {
    return res.status(400).json({error: "Membro não encontrado"})
  }

  const result = await fetchMemberPedradas(member);

  if(result && result.error) {
    const statusCode = typeof result.status == "number" ? result.status : 500;
    return res.status(statusCode).json({ message: "Houve um problema na requisição", error: result.error});
  }

  return res.status(200).json(result.data);
  
}

export const createPedradaController = async (req, res) => { 
  try {
    const id = await createPedrada(req.body)
    return res.status(201).json({ message: `Pedrada criada com id: ${id}`})
  } catch(e) {
    console.error("erro ao criar a pedrada", e)
    return res.status(500).json({ message: "Erro ao criar a pedrada" })
  }
}

export const makeUpvoteController = async (req, res) => {
  const { id } = req.params;
  
  if(id < 0) {
    return res.status(400).json({error: "ID não existente"})
  }

  const result = await makeUpvote(id);

  if(result && result.error) {
    const statusCode = typeof result.status == "number" ? result.status : 500;
    return res.status(statusCode).json({ message: "Houve um erro na requisição", error: result.error})
  }

  return res.status(201).json({ message: `Upvote feito com sucesso`})
}
