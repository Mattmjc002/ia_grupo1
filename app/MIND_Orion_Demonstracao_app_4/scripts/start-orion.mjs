import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const root=fileURLToPath(new URL('../',import.meta.url));
process.chdir(root);
const database=resolve(root,process.env.ORION_DATABASE||'data/orion-demo.sqlite');
if(!existsSync(database))throw Error('Banco Orion não encontrado. Extraia o ZIP completo, incluindo a pasta data. Para gerar uma nova cópia, use npm run demo:gerar.');
process.env.DB_PROVIDER='sqlite';
process.env.SQLITE_PATH=database;
process.env.HOST='127.0.0.1';
process.env.PORT=process.env.PORT||'3000';
process.env.APP_ORIGIN=`http://localhost:${process.env.PORT}`;
process.env.COOKIE_SECURE='false';
console.log('ORION · Ambiente local de demonstração com dados inteiramente fictícios.');
console.log(`Administração: http://localhost:${process.env.PORT}/admin`);
console.log(`Colaboradores: http://localhost:${process.env.PORT}`);
await import('../server/index.mjs');
