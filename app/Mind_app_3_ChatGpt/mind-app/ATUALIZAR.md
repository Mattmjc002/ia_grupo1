# Atualizar a MIND preservando seus dados

## Se você já usa a versão anterior

1. No terminal em que o servidor antigo está rodando, pressione **Ctrl + C**. Aguarde o terminal voltar a aceitar comandos.
2. Faça uma cópia da pasta antiga `mind-app` como backup.
3. Extraia o novo ZIP em outra pasta. Dentro dele, abra **mind-app**, onde está o arquivo **package.json**.
4. Copie da instalação antiga para essa nova pasta:
   - o arquivo **.env**, que contém a configuração;
   - a pasta **data** inteira, que contém o banco local e seus posts, contas e organograma.
5. Se seu `.env` usa um caminho personalizado em `SQLITE_PATH`, preserve esse caminho ou copie a base indicada nele. O padrão é `./data/mind.sqlite`.
6. Abra o terminal dentro da nova pasta `mind-app`. Confira:

```powershell
Test-Path .\package.json
```

O resultado deve ser `True`. Se aparecer `False`, use `Get-ChildItem` para ver as pastas. Entre na pasta `mind-app` com `cd .\mind-app`. Para voltar uma pasta, use `cd ..`.

7. Execute, uma linha por vez:

```powershell
npm.cmd install
npm.cmd start
```

8. Abra **http://localhost:3000/admin**. Entre com sua conta administrativa atual. O Dashboard abre automaticamente. Colaboradores continuam entrando em **http://localhost:3000**.
9. Se a interface antiga permanecer no navegador, use **Ctrl + F5**.

As novas estruturas locais são criadas automaticamente na inicialização. Não é necessário executar um script de migração externa. Copiar somente o código, sem a base antiga, inicia outra instalação sem os seus registros.

## Se esta for sua primeira instalação

Use Node.js 24 ou superior. Dentro de `mind-app`, execute:

```powershell
Copy-Item .env.example .env
```

Abra `.env`, defina `ADMIN_EMAIL` e `ADMIN_PASSWORD` (mínimo de 10 caracteres), salve e execute `npm.cmd start`. O exemplo de senha é recusado até ser substituído.

## Onde encontrar as novidades

- **Administração → Dashboard:** filtros, gráfico, indicadores, oportunidades, tabelas e exportação CSV.
- **Conhecimentos:** abaixo de Notificações. Abra um tema para consultar descrição, exemplo, pessoas e publicações.
- **Meu perfil → Editar perfil:** escolha os conhecimentos que deseja apresentar. Os utilizados em posts aparecem em outra seção.
- **Pessoas → Ver perfil:** consulte as publicações e os conhecimentos de outra pessoa.
- **Guia da MIND:** instruções de uso e orientações da empresa. A administração pode editar estas últimas.

O banco da sua instalação não acompanha este ZIP. As credenciais de teste e os dados usados para validar a interface também não acompanham a entrega.
