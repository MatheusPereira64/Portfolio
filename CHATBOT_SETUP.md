# 🤖 Configuração do Chatbot com IA

O chatbot do portfólio pode funcionar de duas formas:

## 1. Modo Padrão (Sem IA)
- Usa respostas pré-programadas
- Funciona imediatamente sem configuração
- Responde sobre: Contato, LinkedIn, GitHub, Projetos, Habilidades

## 2. Modo com IA (Google Gemini)
- Respostas inteligentes e contextuais
- Gratuito até 60 requisições por minuto
- Requer configuração de API Key

### Como Configurar:

1. **Obter API Key gratuita:**
   - Acesse: https://makersuite.google.com/app/apikey
   - Faça login com sua conta Google
   - Clique em "Create API Key"
   - Copie a chave gerada

2. **Configurar no projeto:**
   - Crie um arquivo `.env` na **raiz do repositório** (ao lado de `package.json`)
   - Adicione a linha:
   ```
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```
   - Substitua `sua_chave_aqui` pela chave que você copiou

3. **Reinicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

### ⚠️ Importante:

- **Para produção**: A API key será exposta no código frontend. Para maior segurança, considere criar um backend proxy.
- **Limites gratuitos**: Google Gemini oferece 60 requisições por minuto no tier gratuito.
- **Fallback automático**: Se a API falhar ou não estiver configurada, o chatbot usa respostas pré-programadas.

### Alternativas Gratuitas:

Se preferir outras opções de IA gratuita:
- **Hugging Face Inference API**: Modelos gratuitos
- **Cohere**: Tier gratuito disponível
- **OpenAI API**: Créditos gratuitos limitados

