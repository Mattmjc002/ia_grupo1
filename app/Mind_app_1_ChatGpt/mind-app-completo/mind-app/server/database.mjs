import {DatabaseSync} from 'node:sqlite';
import {readFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
const schema=readFileSync(new URL('../database/schema.sql',import.meta.url),'utf8');
export async function openDatabase(){
 if(process.env.DB_PROVIDER==='postgres'){
  if(!process.env.DATABASE_URL) throw Error('Defina DATABASE_URL no .env');
  const {Pool}=await import('pg');
  const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true},max:5});
  await pool.query('CREATE SCHEMA IF NOT EXISTS mind');
  await pool.query('REVOKE ALL ON SCHEMA mind FROM PUBLIC');
  const client=await pool.connect();
  try{await client.query('SET search_path TO mind');await client.query(schema);}finally{client.release();}
  const wrap=c=>({all:async(sql,args=[])=>{let i=0;return(await c.query(sql.replace(/\?/g,()=>`$${++i}`),args)).rows;}});
  return {transaction:async fn=>{const c=await pool.connect();try{await c.query('BEGIN');await c.query('SET LOCAL search_path TO mind');await c.query("SELECT pg_advisory_xact_lock(481921)");const r=await fn(wrap(c));await c.query('COMMIT');return r;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}},close:()=>pool.end()};
 }
 const path=resolve(process.env.SQLITE_PATH||'data/mind.sqlite');mkdirSync(dirname(path),{recursive:true});
 const sql=new DatabaseSync(path);sql.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');sql.exec(schema);
 const wrap={all:async(q,args=[])=>sql.prepare(q).all(...args)};
 let queue=Promise.resolve();
 return {transaction(fn){const task=queue.then(async()=>{sql.exec('BEGIN IMMEDIATE');try{const r=await fn(wrap);sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}});queue=task.catch(()=>{});return task;},close(){sql.close();}};
}
