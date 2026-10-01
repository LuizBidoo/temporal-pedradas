import { z } from "zod";
import { MEMBERS } from "../config/members.js";

const member = z.enum(MEMBERS);

// Chaves geradas pelo createUploadUrl: "images/<uuid>.<ext>" ou "audios/<uuid>.<ext>"
const uuidKey = (folder) =>
  new RegExp(`^${folder}/[0-9a-f-]{36}\\.[a-z0-9]+$`);

const textMessage = z.object({
  author: member,
  kind: z.literal("text"),
  content: z.string().trim().min(1, "a mensagem não pode ser vazia").max(2000),
});

const imageMessage = z.object({
  author: member,
  kind: z.literal("image"),
  content: z.string().trim().max(500).optional(),
  mediaKey: z.string().regex(uuidKey("images"), "chave de imagem inválida"),
  mediaType: z.string().startsWith("image/"),
});

const audioMessage = z.object({
  author: member,
  kind: z.literal("audio"),
  content: z.string().trim().max(500).optional(),
  mediaKey: z.string().regex(uuidKey("audios"), "chave de áudio inválida"),
  mediaType: z.string().startsWith("audio/"),
});

export const newPedradaSchema = z.object({
  author: member,
  messages: z
    .array(z.discriminatedUnion("kind", [textMessage, imageMessage, audioMessage]))
    .min(1, "a pedrada precisa de pelo menos uma mensagem")
    .max(30, "pedrada longa demais"),
});

export const paramsSchema = z.object({
  id: z.coerce.number().int().positive(),
});
