# Validação da demonstração Orion

Verificação realizada em 26/09/2026 com Node.js 24.19.0.

## Resultado

- 14 testes automatizados existentes da MIND aprovados.
- Banco SQLite íntegro, sem violação de chave estrangeira.
- Hierarquias de áreas e cargos verificadas sem ciclos.
- 350 publicações com títulos únicos e uma a oito associações de conhecimento.
- Todos os funcionários ativos participam do histórico da empresa.
- Comentários e reconhecimentos respeitam o público acessível ao autor.
- Datas de comentários posteriores às publicações correspondentes.
- Zero sessões de login gravadas no banco entregue.
- A inicialização usa o banco de demonstração incluído no pacote.
- O gerador reproduziu os registros e recusou sobrescrever o banco existente.

## Fluxos exercitados na API

Login administrativo, login de colaborador e de liderança; bloqueio de conta inativa; restrição de conta pendente; aprovação de cadastro; publicação; comentário; reconhecimento; salvamento; edição do guia; leitura de notificações; filtros de dashboard; exportação CSV; rede de conhecimentos; simulação de saída sem alteração de pessoas.

Os ensaios que escrevem dados ocorreram em uma cópia descartável. O banco entregue mantém seus quatro cadastros pendentes e o estado inicial das interações.

## Evidências da base inicial

| Verificação | Resultado |
| --- | --- |
| Publicações no histórico | 350 |
| Publicações nos últimos 30 dias | 173 |
| Autores no histórico | 66 |
| Conhecimentos aplicados | 205 |
| Conhecimentos novos no período de 30 dias | 21 |
| Temas usados por mais de um setor | 42 |
| Conhecimentos órfãos na simulação de Bruno | 4 |
| Publicações visíveis para Natália | 178 |

## Interface e limites da verificação

A composição HTML foi exercitada com os dados completos para dashboard, feed, pessoas, perfis, pesquisa, catálogo, detalhe de conhecimento, rede, guia, notificações, salvos e gestão da equipe. A pesquisa encontrou projetos em publicações e comentários e encontrou pessoas pelos conhecimentos declarados.

Não houve validação visual em um navegador real neste ambiente: o navegador de testes não estava disponível. A interface da versão recebida foi preservada. Não foi realizado teste no Windows, embora o iniciador fornecido seja um arquivo de lote para esse sistema. O motor SQLite e o servidor foram exercitados neste ambiente.

O radar mantém as regras da versão 1.1.0. Alertas incluem conceitos do catálogo ainda sem evidência na empresa; cobertura e risco combinado são medidas distintas. A rede mantém o limite de 36 conhecimentos por seleção. Estes limites estão explicados no roteiro.

## Arquivos adicionados e ajustes

- Banco fictício `data/orion-demo.sqlite` e resumo de contagens.
- Conteúdo e gerador reproduzível em `scripts/orion-content.mjs` e `scripts/seed-orion.mjs`.
- Inicializador local `scripts/start-orion.mjs`, comando `npm start` e `INICIAR_ORION.bat`.
- Roteiro de apresentação, lista de equipe e instruções iniciais.
- `.env.example` com regras de senha: 10 a 128 caracteres, sem exigência de maiúscula, número ou símbolo, com aceitação de espaços e caracteres especiais.
- O iniciador usa a base Orion explicitamente; nenhum banco nem credencial da instalação recebida foi incluído nesta cópia.
