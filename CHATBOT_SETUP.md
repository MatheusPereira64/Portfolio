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

## Configuração local

1. Copie `.env.example` → `.env`
2. Adicione `VITE_GEMINI_API_KEY` ([Google AI Studio](https://aistudio.google.com/app/apikey))
3. `npm run dev`

## Produção — proxy recomendado

A chave no frontend (`VITE_*`) fica visível no bundle. Para produção:

1. Deploy do exemplo em `api/gemini-proxy.example.mjs` (Cloudflare Worker, Vercel Function, etc.)
2. Defina o secret `GEMINI_API_KEY` no servidor
3. No `.env` / GitHub Secrets: `VITE_GEMINI_PROXY_URL=https://seu-proxy...`
4. Remova ou deixe vazio `VITE_GEMINI_API_KEY` no build de produção

## Base de conhecimento

Edite `src/data/assistantKnowledge.js` — experiência, formação, projetos e skills usados pelo assistente e pela IA.
