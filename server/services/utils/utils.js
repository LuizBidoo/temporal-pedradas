export const toMessage = (m) => ({
  author: m.author,
  kind: m.kind,
  content: m.content,
  mediaUrl: m.media_key ? `${process.env.MEDIA_BASE_URL}/${m.media_key}` : null,
  mediaType: m.media_type,
});

export const toPost = (row) => ({
  id: row.id,
  author: row.author,
  upvotes: row.upvotes,
  createdAt: row.created_at,
  messages: row.messages.map(toMessage),
});
