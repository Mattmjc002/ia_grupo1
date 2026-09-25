// Migração única: SQLite -> banco PostgreSQL vazio. Preserva IDs e hashes de senha.
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {Pool} from 'pg';
if(!process.env.DATABASE_URL)throw Error('Configure DATABASE_URL no .env.');
const source=new DatabaseSync(process.env.SQLITE_PATH||'data/mind.sqlite',{readOnly:true});
const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:{rejectUnauthorized:true}}),client=await pool.connect();
const tables=['company','areas','positions','users','posts','comments','reactions','notifications','audit'];
try{
 await client.query('BEGIN');await client.query('CREATE SCHEMA IF NOT EXISTS mind');await client.query('REVOKE ALL ON SCHEMA mind FROM PUBLIC');await client.query('SET LOCAL search_path TO mind');
 await client.query(readFileSync(new URL('../database/schema.sql',import.meta.url),'utf8'));
 for(const table of tables){if((await client.query(`SELECT 1 FROM ${table} LIMIT 1`)).rows.length)throw Error('O destino deve estar vazio. Migração cancelada sem alterações.');}
 for(const table of tables){
  let rows=source.prepare(`SELECT * FROM ${table}`).all();
  if(['areas','positions'].includes(table)){
   const ordered=[],done=new Set();while(rows.length){const ready=rows.filter(r=>!r.parent_id||done.has(r.parent_id));if(!ready.length)throw Error('Hierarquia inválida no banco de origem.');for(const row of ready){ordered.push(row);done.add(row.id);}rows=rows.filter(r=>!done.has(r.id));}rows=ordered;
  }
  for(const row of rows){const columns=Object.keys(row);await client.query(`INSERT INTO ${table}(${columns.join(',')}) VALUES(${columns.map((_,i)=>'$'+(i+1)).join(',')})`,Object.values(row));}
  console.log(`${table}: ${rows.length} registros`);
 }
 await client.query('COMMIT');console.log('Migração concluída. Altere DB_PROVIDER para postgres e inicie o servidor. Todos deverão entrar novamente.');
}catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();await pool.end();source.close();}
