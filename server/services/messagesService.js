import sql from "../db/connection.js";
import { toPost } from "./utils/utils.js";

export async function fetchPedradas() {
  try {
    const pedradas = await sql`
    select p.id, p.author, p.upvotes, p.created_at,
      json_agg(
        json_build_object(
          'author', m.author, 'kind', m.kind, 'content', m.content,
          'media_key', m.media_key, 'media_type', m.media_type
        ) order by m.position
      ) as messages
    from posts p
    join messages m on m.post_id = p.id
    group by p.id
    order by p.upvotes desc, p.created_at desc
  `;
    
    if(pedradas.length === 0) {
      return { error: "Nenhuma pedrada encontrada", status: 404}
    }
    
    return { data: pedradas.map(toPost), error: null};
  
  } catch(e) {
    console.log("erro ao fazer o fetch")
    
    return { error: e.message || e, status: 500 }
  }
}

export async function fetchMemberPedradas(member) {
  try {
    const pedradas = await sql`
    select p.id, p.author, p.upvotes, p.created_at,
      json_agg(
        json_build_object(
          'author', m.author, 'kind', m.kind, 'content', m.content,
          'media_key', m.media_key, 'media_type', m.media_type
        ) order by m.position
      ) as messages
    from posts p
    join messages m on m.post_id = p.id
    where ${member}::text is null or p.author = ${member}
    group by p.id
    order by p.upvotes desc, p.created_at desc
  `;

   
    if(pedradas.length === 0) {
      return { error: "Nenhuma pedrada encontrada", status: 404}
    }

    return { data: pedradas, error: null }
  } catch(e) {
    console.log("erro ao fazer o fetch")

    return { error: e.message || e, status: 500};
  }
}

export async function createPedrada(newPost) { 
  //todo
}

export async function makeUpvote(id) {
  //todo
}

export async function createUploadUrl(kind, mediaType) {
  //todo
}
