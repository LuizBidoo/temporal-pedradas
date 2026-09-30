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

export async function createPedrada({ author, messages }) {
  const rows = messages.map((m, i) => ({
    position: i + 1,
    author: m.author,
    kind: m.kind,
    content: m.content ?? null,
    media_key: m.mediaKey ?? null,
    media_type: m.mediaType ?? null,
  }));

  const result = await sql`
    with p as (
      insert into posts (author) values (${author}) returning id
    )
    insert into messages (post_id, position, author, kind, content, media_key, media_type)
    select p.id, m.position, m.author, m.kind, m.content, m.media_key, m.media_type
    from p, jsonb_to_recordset(${JSON.stringify(rows)}::jsonb)
      as m(position int, author text, kind text, content text, media_key text, media_type text)
    returning post_id
  `;

  return result[0].post_id;
}

export async function makeUpvote(id) {
  //todo
}

export async function createUploadUrl(kind, mediaType) {
  //todo
}
