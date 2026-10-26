# 🤖 Configuração do Chatbot

## Modos de funcionamento

### Respostas instantâneas (sempre activas)
- Contacto, CV, LinkedIn, GitHub, WhatsApp, projetos, experiência, formação, idiomas, disponibilidade
- Navegação dentro do site (scroll para secções)
- Formulário de contacto com assunto pré-preenchido

### Modo IA (Google Gemini)
- Perguntas abertas (ex.: “What React projects have you built?”)
- Limite: **10 mensagens IA por sessão** (sessionStorage)
- Fallback automático se a IA falhar ou não estiver configurada

## Configuração

O cliente só fala com o proxy. A chave não entra no bundle.

1. Copie `.env.example` → `.env`
2. Faça deploy de `api/gemini-proxy.example.mjs` (Cloudflare Worker, Vercel Function, etc.)
3. Defina o secret `GEMINI_API_KEY` **no servidor** (por exemplo `wrangler secret put GEMINI_API_KEY`)
4. No `.env`: `VITE_GEMINI_PROXY_URL=https://seu-proxy...`
5. `npm run dev`

Não coloque a chave em `VITE_*`, em GitHub Actions nem em qualquer ficheiro que vá para o browser.

## Base de conhecimento

Edite `src/data/assistantKnowledge.js` — experiência, formação, projetos e skills usados pelo assistente e pela IA.
