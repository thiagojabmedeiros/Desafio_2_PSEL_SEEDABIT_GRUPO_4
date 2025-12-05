# 🏥 Recife Saudável

> Landing Page institucional desenvolvida para o Desafio 2 do Processo Seletivo da Seed a Bit 2026.1

## 📋 Sobre o Projeto

**Recife Saudável** é uma aplicação que visa ampliar o acesso à saúde pública no Recife através de parcerias público-privadas para otimizar o funcionamento do SUS.

### 🎯 Problema
Dificuldade de acesso a serviços de saúde pública no Recife, com longas filas e falta de cobertura em alguns bairros.

### 💡 Solução
Uma plataforma que conecta cidadãos a serviços de saúde, unindo o setor público e privado para democratizar o acesso à saúde de qualidade.

---

## 🌍 ODS Impactadas

| ODS | Nome | Descrição |
|-----|------|-----------|
| 3 | Saúde e Bem-Estar | Garantir acesso à saúde de qualidade para todos |
| 10 | Redução das Desigualdades | Diminuir a desigualdade no acesso aos serviços de saúde |
| 17 | Parcerias e Meios de Implementação | Fortalecer parcerias público-privadas |

---

## 🔗 Links Importantes

- **🌐 Site Publicado:** [https://thiagojabmedeiros.github.io/Desafio_2_PSEL_SEEDABIT_GRUPO_4/]
- **🎨 Protótipo Figma:** [Ver Protótipo](https://www.figma.com/design/bjLj1w0mgXWER6JrubKD8H/Prototipa%C3%A7%C3%A3o---Concep%C3%A7%C3%A3o--Copy-?node-id=17-872)

---

## 🛠️ Tecnologias Utilizadas

- **HTML5** - Estrutura da página
- **CSS3** - Estilização e responsividade
- **JavaScript (ES6+)** - Interatividade e integração com API
- **Jquery** - Animações na Página
- **Fetch API** - Requisições HTTP

---

## 📡 Integração com o Blog (API)

O site possui uma seção de blog integrada com a API fornecida pelo back-end do onboarding.

### 🔑 Configuração da API

```javascript
// URL base da API
const API_URL = 'https://blog-api.seedabit.org.br/api/posts';

// Chave de API do Grupo 4
const API_KEY = 'group-4-7ciq4ibj';
```

### 📌 Endpoints Utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/posts` | Lista todos os posts do blog |
| `POST` | `/api/posts` | Cria um novo post |
| `DELETE` | `/api/posts/{id}` | Deleta um post específico |

### 📥 GET - Buscar Posts

```javascript
async function getPosts() {
    const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
            'x-api-key': API_KEY,
            'accept': '*/*'
        }
    });
    const posts = await response.json();
    displayPosts(posts);
}
```

### 📤 POST - Criar Post

```javascript
async function createPost(title, content, author) {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'x-api-key': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, content, author })
    });
    const newPost = await response.json();
    getPosts(); // Atualiza a lista
}
```

### 🗑️ DELETE - Deletar Post

```javascript
async function deletePost(postId) {
    const response = await fetch(`${API_URL}/${postId}`, {
        method: 'DELETE',
        headers: {
            'x-api-key': API_KEY
        }
    });
    getPosts(); // Atualiza a lista
}
```

---

## 📁 Estrutura do Projeto

```
Desafio_2_PSEL_SEEDABIT_GRUPO_4/
├── index.html      # Página principal (HTML)
├── styles.css      # Estilos (CSS)
├── main.js         # Lógica e integração com API (JavaScript)
├── README.md       # Documentação do projeto
└── LICENSE         # Licença do projeto
```

---

## 🚀 Como Executar Localmente

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/SEU_USUARIO/Desafio_2_PSEL_SEEDABIT_GRUPO_4.git
   ```

2. **Acesse a pasta do projeto:**
   ```bash
   cd Desafio_2_PSEL_SEEDABIT_GRUPO_4
   ```

3. **Abra o arquivo `index.html` no navegador:**
   - Clique duas vezes no arquivo, ou
   - Use a extensão Live Server do VS Code

---

## 📱 Responsividade

O site é totalmente responsivo e se adapta a diferentes tamanhos de tela:

- **Desktop:** Layout completo com grid de 4 colunas
- **Mobile:** Layout em coluna única com menu hamburguer

---

## 👥 Equipe - Grupo 4

Desenvolvido com 💙 pelo Grupo 4 do Processo Seletivo Seed a Bit 2026.1

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📚 Referências

- [Documentação da API](https://blog-api.seedabit.org.br/api/docs#)
- [Como publicar no GitHub Pages](https://docs.github.com/pt/pages)
- [Padrões de Commits](https://github.com/iuricode/padroes-de-commits)
