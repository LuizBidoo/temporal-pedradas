import { neon } from "@neondatabase/serverless";

console.log("Does the DB exist?", !!process.env.DATABASE_CONNECTION_STRING);

const sql = neon(process.env.DATABASE_CONNECTION_STRING);

export default sql
