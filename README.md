# 🚀 Portfólio de Matheus Pereira - React

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Acesse_Agora-dc143c?style=for-the-badge&logo=github)](https://matheuspereira64.github.io/Portfolio/)
[![GitHub](https://img.shields.io/badge/📂_Código_Fonte-GitHub-181717?style=for-the-badge&logo=github)](https://github.com/MatheusPereira64/Portfolio)
[![React](https://img.shields.io/badge/⚛️_React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/⚡_Vite-5.0.8-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

> ⚠️ **ATENÇÃO**: Este é o repositório da **versão React** do portfólio. Para testar localmente e garantir que está vendo a versão mais atualizada, execute `npm run dev` após instalar as dependências.

## 🌐 **PRÉVIA INTERATIVA - VERSÃO REACT**

### 🚀 **Acesse a Versão React Online:**
🔗 **[>>> CLIQUE AQUI PARA VER O PORTFÓLIO REACT FUNCIONANDO <<<](https://matheuspereira64.github.io/Portfolio/)**

> 💡 **Nota**: O portfólio React está hospedado no GitHub Pages com todas as animações e funcionalidades funcionando perfeitamente! Se você ver a versão HTML antiga, limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R).

### 🧪 **Teste Localmente (Recomendado):**

Para garantir que está vendo a versão React mais atualizada, execute localmente:

```bash
# 1. Clone o repositório
git clone https://github.com/MatheusPereira64/Portfolio.git
cd Portfolio

# 2. Instale as dependências
npm install

# 3. Execute em modo desenvolvimento
npm run dev
```

O site estará disponível em: **`http://localhost:5173`** 🎉

### 🎯 **Navegação Rápida:**
- 🏠 **[Início](https://matheuspereira64.github.io/Portfolio/#home)** - Apresentação com animação Typed.js
- 👨‍💻 **[Sobre Mim](https://matheuspereira64.github.io/Portfolio/#about)** - CV completo e formação
- 🛠️ **[Serviços](https://matheuspereira64.github.io/Portfolio/#services)** - Cards interativos com animações
- 📊 **[Habilidades](https://matheuspereira64.github.io/Portfolio/#skills)** - Barras animadas de progresso
- 🚀 **[Projetos](https://matheuspereira64.github.io/Portfolio/#teams)** - Carousel de projetos responsivo
- 📞 **[Contato](https://matheuspereira64.github.io/Portfolio/#contact)** - Formulário funcional com validação

### 🌍 **Funcionalidades da Versão React:**
- **🇧🇷/🇺🇸/🇪🇸 Troca de Idioma**: Português ↔ Inglês ↔ Espanhol
- **📱 Totalmente Responsivo**: Adaptável a todos os dispositivos
- **✨ Animações Suaves**: Transições e efeitos hover elegantes
- **🎨 Design Moderno**: Interface limpa com glassmorphism e gradientes
- **🌙 Modo Escuro/Claro**: Toggle de tema com persistência
- **🤖 Chatbot com IA**: Integração com Google Gemini API (gratuita)
- **📧 Formulário de Contato**: Sistema funcional via EmailJS
- **📊 Estatísticas Animadas**: Contadores e achievements
- **📝 Seção de Blog**: Artigos e conteúdo
- **💼 Timeline de Experiência**: Histórico profissional
- **📥 Download de CV**: Botão para baixar currículo em PDF
- **⚡ Performance Otimizada**: Build rápido com Vite

---

## 🛠️ **Tecnologias Utilizadas**

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool moderna e rápida
- **CSS3** - Estilização com animações e gradientes
- **Typed.js** - Animação de texto digitando
- **Font Awesome** - Ícones
- **React Hooks** - Gerenciamento de estado e efeitos

## 📦 **Instalação e Execução**

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Passos para instalação

1. **Clone o repositório**
```bash
git clone https://github.com/MatheusPereira64/Portfolio.git
cd Portfolio
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure a API Key do Google Gemini (Opcional - para chatbot com IA)**
```bash
# Copie o arquivo de exemplo
cp WebDesignPortfolio/.env.example WebDesignPortfolio/.env

# Edite o arquivo .env e adicione sua API Key
# Obtenha uma chave gratuita em: https://makersuite.google.com/app/apikey
```

4. **Execute o projeto em modo desenvolvimento**
```bash
npm run dev
```

5. **Build para produção** (gera `docs/` para o GitHub Pages)
```bash
npm run build
```

6. **Preview do build**
```bash
npm run preview
```

7. **Deploy para GitHub Pages**
```bash
npm run deploy
```

## 📁 **Estrutura do Projeto**

```
Portfolio/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.jsx
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Footer.jsx
│   │   └── ScrollToTop.jsx
│   ├── context/             # Context API
│   │   └── LanguageContext.jsx
│   ├── App.jsx              # Componente principal
│   ├── App.css
│   ├── main.jsx             # Entry point
│   └── index.css            # Estilos globais
├── public/                  # Arquivos estáticos
├── index.html               # HTML principal
├── vite.config.js           # Configuração do Vite
├── package.json             # Dependências
└── README.md
```

## 🌟 **Características**

- **🎨 Design Moderno**: Interface limpa com efeitos glassmorphism e gradientes
- **📱 Responsivo**: Adaptável a todos os dispositivos (desktop, tablet, mobile)
- **🌐 Multilíngue**: Suporte para Português, Inglês e Espanhol com Context API
- **✨ Animações Suaves**: Transições e efeitos hover elegantes
- **📧 Formulário de Contato**: Sistema de contato via mailto
- **⚡ Performance**: Build otimizado com Vite
- **🔧 Componentização**: Código organizado em componentes reutilizáveis

## 📱 **Seções**

1. **Home**: Apresentação inicial com animação de texto (Typed.js)
2. **Sobre Mim**: Informações pessoais e formação acadêmica
3. **Meus Serviços**: Cards com os serviços oferecidos
4. **Habilidades**: Barras de progresso animadas das tecnologias
5. **Experiência**: Timeline interativa com histórico profissional
6. **Projetos**: Carousel com projetos desenvolvidos
7. **Estatísticas**: Contadores animados de achievements
8. **Blog**: Seção de artigos e conteúdo
9. **Contato**: Formulário funcional e informações de contato
10. **Chatbot**: Assistente virtual com IA (Google Gemini) ou respostas pré-programadas

## 🚀 **Deploy no GitHub Pages**

### Opção A — GitHub Actions (recomendado)

O workflow `.github/workflows/deploy-pages.yml` faz **`npm ci`**, **`npm run build`** e publica o conteúdo de **`docs/`** automaticamente nos pushes para **`main`**, **`development`** ou **`feat/react-refactor`**.

1. No GitHub: **Settings → Pages → Build and deployment → Source**, escolhe **GitHub Actions** (não uses “Deploy from a branch” ao mesmo tempo para evitar confusão).
2. Faz push deste repositório; na aba **Actions** verifica que o workflow **Deploy GitHub Pages** concluiu com sucesso.
3. Abre **`https://matheuspereira64.github.io/Portfolio/`** (sem subpath `WebDesignPortfolio`).

### Opção B — Branch + pasta `/docs`

No GitHub, ao publicar a partir de um branch, só existem **`/` (root)** ou **`/docs`** — não há **`/dist`**.

1. Localmente: **`npm run build`** gera **`docs/`**.
2. Commit e push da pasta **`docs/`**.
3. **Settings → Pages**: Branch à tua escolha e **Folder: `/docs`**.

### Opção C — Branch `gh-pages`

**`npm run deploy`** envia o build para **`gh-pages`**; nas Pages escolhe esse branch e pasta **`/ (root)`**.

### ⚠️ **IMPORTANTE**

1. **Não abras** `WebDesignPortfolio/index.html` com **Live Server**, duplo clique nem **`file://`**. Esse HTML referencia **`main.jsx`**; só o Vite converte JSX. Para local: **`npm run dev`** ou, após build, **`npm run preview`** (abre por exemplo `http://localhost:4173/Portfolio/`).
2. **URL do site**: **`https://matheuspereira64.github.io/Portfolio/`**. Caminhos para pastas fonte no repo podem devolver `.jsx` e o erro de MIME.

### Erro `MIME type "text/jsx"`

- **Desenvolvimento**: usa sempre **`npm run dev`** ou **`npm run preview`**, não Live Server na pasta `WebDesignPortfolio`.
- **Produção**: garante Pages com **GitHub Actions** ou pasta **`/docs`** com build atualizado; faz **hard refresh** (Ctrl+Shift+R).

### Configuração do Vite

O arquivo `vite.config.js` está configurado com:
- `base: '/Portfolio/'` - Caminho base para GitHub Pages
- `root: './WebDesignPortfolio'` - Diretório raiz do projeto React
- `build.outDir: '../docs'` - Saída do build para a pasta **`docs/`** (compatível com GitHub Pages)
- Build otimizado para produção

## 📧 **Contato**

- **Email**: matheuspereira6464@gmail.com
- **LinkedIn**: [Matheus Pereira](https://www.linkedin.com/in/matheus-pereira-836033243/)
- **Telefone**: +55 (92) 99213-8870

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

⭐ **Desenvolvido por Matheus Pereira de Souza**
