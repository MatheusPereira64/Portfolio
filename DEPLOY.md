# 📦 Guia de Deploy

## Deploy no GitHub Pages

O build de produção vai para a pasta **`docs/`** (não `dist/`). O GitHub Pages publica a partir de **`docs/`** via branch ou GitHub Actions.

### Passo a passo

1. **Instale as dependências** (se ainda não fez):

```bash
npm install
```

2. **Configure variáveis de ambiente** (copie `.env.example` → `.env` na raiz do repo).

3. **Faça o build**:

```bash
npm run build
```

Isso gera/atualiza **`docs/`** com os ficheiros estáticos do site.

4. **Commit e push** da pasta `docs/` (e do código-fonte) para o branch configurado nas Pages (`development`, `main`, etc.).

### Opção A — GitHub Actions (recomendado)

O workflow `.github/workflows/deploy-pages.yml` executa `npm ci`, `npm run build` e publica **`docs/`** automaticamente.

### Opção B — Branch + pasta `/docs`

1. **Settings → Pages** → Branch à sua escolha, **Folder: `/docs`**.

### Opção C — Branch `gh-pages`

```bash
npm run deploy
```

Envia o conteúdo de **`docs/`** para a branch `gh-pages`.

**Site:** `https://matheuspereira64.github.io/Portfolio/`

## Desenvolvimento local

```bash
npm run dev
```

Disponível em `http://localhost:5173`

## Preview do build

```bash
npm run build
npm run preview
```

Abre por exemplo `http://localhost:4173/Portfolio/`
