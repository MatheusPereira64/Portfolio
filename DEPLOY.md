# 📦 Guia de Deploy

## Deploy no GitHub Pages

### Passo a passo:

1. **Instale as dependências** (se ainda não fez):
```bash
npm install
```

2. **Faça o build do projeto**:
```bash
npm run build
```

3. **Faça o deploy**:
```bash
npm run deploy
```

Isso irá:
- Criar um build otimizado na pasta `dist/`
- Fazer commit e push para a branch `gh-pages`
- O site estará disponível em: `https://matheuspereira64.github.io/Portfolio/`

### Configuração do GitHub Pages

No repositório do GitHub:
1. Vá em **Settings** > **Pages**
2. Certifique-se de que a branch `gh-pages` está selecionada
3. O site será publicado automaticamente

### Atualizações

Sempre que fizer alterações:
1. Commit suas mudanças
2. Execute `npm run deploy`
3. Aguarde alguns minutos para o GitHub Pages atualizar

## Desenvolvimento Local

Para rodar localmente:

```bash
npm run dev
```

O site estará disponível em `http://localhost:5173`

## Build Local

Para testar o build localmente:

```bash
npm run build
npm run preview
```

