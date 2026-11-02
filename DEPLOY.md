# 📦 Guia de Deploy

## Como o site é publicado

Há um único caminho: **cada push na `main` publica o site** no GitHub Pages, pelo workflow `.github/workflows/deploy-pages.yml`. Ele executa `npm ci` e `npm run build` e envia o resultado direto ao Pages.

**Site:** `https://matheuspereira64.github.io/Portfolio/`

| Branch | No push |
|---|---|
| `main` | Verifica o build e publica o site |
| `development` | Só verifica o build (`ci.yml`), sem publicar |

Pushes que alteram apenas `docs/` ou arquivos `.md` não disparam esses workflows.

## Configuração no GitHub

1. **Settings → Pages → Build and deployment → Source:** escolha **GitHub Actions**.
2. **Settings → Secrets and variables → Actions:** cadastre as variáveis usadas no build, como as do EmailJS (veja `.env.example`).

## Fluxo de trabalho

1. Teste localmente com `npm run dev` ou com o build abaixo.
2. Envie para a `development` e confira o resultado do `ci.yml`.
3. Leve as mudanças para a `main` para publicar.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Disponível em `http://localhost:5173/Portfolio/`

## Preview do build

```bash
npm run build
npm run preview
```

Abre por exemplo `http://localhost:4173/Portfolio/`

O build é gravado em `docs/`, mas essa pasta não é o que vai para o ar: não é preciso commitá-la.
