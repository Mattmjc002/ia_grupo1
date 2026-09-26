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
  // Upgrade projects created before organizational levels and role-specific feeds.
  await pool.query("ALTER TABLE mind.positions ADD COLUMN IF NOT EXISTS level TEXT NOT NULL DEFAULT 'consultoria'");
  await pool.query("ALTER TABLE mind.posts ADD COLUMN IF NOT EXISTS audience_level TEXT");
  await pool.query("ALTER TABLE mind.user_knowledge ADD COLUMN IF NOT EXISTS proficiency INTEGER NOT NULL DEFAULT 3");
  await pool.query("ALTER TABLE mind.user_knowledge ADD COLUMN IF NOT EXISTS updated_at TEXT");
  const wrap=c=>({all:async(sql,args=[])=>{let i=0;return(await c.query(sql.replace(/\?/g,()=>`$${++i}`),args)).rows;}});
  return {transaction:async fn=>{const c=await pool.connect();try{await c.query('BEGIN');await c.query('SET LOCAL search_path TO mind');await c.query("SELECT pg_advisory_xact_lock(481921)");const r=await fn(wrap(c));await c.query('COMMIT');return r;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}},close:()=>pool.end()};
 }
 const path=resolve(process.env.SQLITE_PATH||'data/mind.sqlite');mkdirSync(dirname(path),{recursive:true});
 const sql=new DatabaseSync(path);sql.exec('PRAGMA foreign_keys=ON; PRAGMA journal_mode=WAL;');sql.exec(schema);
 const positionColumns=sql.prepare('PRAGMA table_info(positions)').all().map(c=>c.name);
 if(!positionColumns.includes('level'))sql.exec("ALTER TABLE positions ADD COLUMN level TEXT NOT NULL DEFAULT 'consultoria' CHECK(level IN ('lideranca','gestao','consultoria'))");
 const postColumns=sql.prepare('PRAGMA table_info(posts)').all().map(c=>c.name);
 if(!postColumns.includes('audience_level'))sql.exec("ALTER TABLE posts ADD COLUMN audience_level TEXT CHECK(audience_level IS NULL OR audience_level IN ('lideranca','gestao','consultoria'))");
 const userKnowledgeColumns=sql.prepare('PRAGMA table_info(user_knowledge)').all().map(c=>c.name);
 if(!userKnowledgeColumns.includes('proficiency'))sql.exec("ALTER TABLE user_knowledge ADD COLUMN proficiency INTEGER NOT NULL DEFAULT 3 CHECK(proficiency BETWEEN 1 AND 5)");
 if(!userKnowledgeColumns.includes('updated_at'))sql.exec("ALTER TABLE user_knowledge ADD COLUMN updated_at TEXT");
 const wrap={all:async(q,args=[])=>sql.prepare(q).all(...args)};
 let queue=Promise.resolve();
 return {transaction(fn){const task=queue.then(async()=>{sql.exec('BEGIN IMMEDIATE');try{const r=await fn(wrap);sql.exec('COMMIT');return r;}catch(e){sql.exec('ROLLBACK');throw e;}});queue=task.catch(()=>{});return task;},close(){sql.close();}};
}
