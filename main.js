const API_URL = CONFIG.API_URL;
const API_KEY = CONFIG.API_KEY;

async function getPosts() {
   
    try {
        
        
      
        const response = await fetch(API_URL, {
            method: 'GET',  
            headers: {

                'x-api-key': API_KEY,  
                'Accept': 'application/json'  
            }
        });

      
        if (!response.ok) {
         
            throw new Error(`Erro HTTP: ${response.status}`);
        }

       
        const data = await response.json();
        
        
        console.log('Dados recebidos:', data);

    
        const posts = Array.isArray(data) ? data : (data.posts || data.data || []);
        
        console.log('Posts processados:', posts);

        displayPosts(posts);

        return posts;

    } catch (error) {

        console.error('Erro ao buscar posts:', error);
        
        const container = document.getElementById('blog-posts');
        container.innerHTML = '<p class="error">Erro ao carregar posts. Tente novamente mais tarde.</p>';
    }
}

async function createPost(title, content, author) {
    
    try {
        const response = await fetch(API_URL, {
            method: 'POST',  
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',  
                'Accept': 'application/json'  
            },
           
            body: JSON.stringify({
                title: title,      
                content: content,  
                author: author    
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta do POST:', response.status, errorText);
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }

        // Converte a resposta para objeto
        const data = await response.json();
        
        console.log('Resposta do POST:', data);
        
        
        const newPost = data.post || data.data || data;
        
    
        alert('Post criado com sucesso!');

        
        getPosts();

        return newPost;

    } catch (error) {
        console.error('Erro ao criar post:', error);
        alert('Erro ao criar post. Verifique os dados e tente novamente.');
    }
}

async function deletePost(postId) {
    
    
   
    const confirmar = confirm('Tem certeza que deseja deletar este post?');
    
    if (!confirmar) {
       
        return;
    }
    
    try {
        
        const response = await fetch(`${API_URL}/${postId}`, {
            method: 'DELETE',  
            headers: {
                'x-api-key': API_KEY,
                'Content-Type': 'application/json',  
                'Accept': 'application/json'  
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Erro na resposta do DELETE:', response.status, errorText);
            throw new Error(`Erro HTTP: ${response.status} - ${errorText}`);
        }

        console.log('Post deletado com sucesso!');
        alert('Post deletado com sucesso!');


        getPosts();

    } catch (error) {
        console.error('Erro ao deletar post:', error);
        alert('Erro ao deletar post. Tente novamente.');
    }
}

function displayPosts(posts) {

    const container = document.getElementById('blog-posts');

  
    if (!posts || posts.length === 0) {
        container.innerHTML = '<p class="loading">Nenhum post encontrado. Seja o primeiro a publicar!</p>';
        return;  
    }

    
    container.innerHTML = '';

    posts.forEach(post => {
        
        
        const postElement = document.createElement('div');
        
       
        postElement.className = 'post-card';
        
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p class="meta">Por: ${post.author}</p>
            <p class="content">${post.content}</p>
            <p class="date">${formatDate(post.createdAt)}</p>
            <button class="btn btn-delete" onclick="deletePost('${post.id}')">
                🗑️ Deletar
            </button>
        `;
        
        container.appendChild(postElement);
    });
}

function formatDate(dateString) {

    if (!dateString) return 'Data não disponível';
    
    const date = new Date(dateString);
    

    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',    
        month: '2-digit',  
        year: 'numeric'    
    });
}

document.addEventListener('DOMContentLoaded', function() {
  
    const form = document.getElementById('post-form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        
        
        const title = document.getElementById('title').value.trim();
        const author = document.getElementById('author').value.trim();
        const content = document.getElementById('post-content').value.trim();

        
        if (!title || !author || !content) {
            alert('Por favor, preencha todos os campos!');
            return;  
        }
        
        await createPost(title, content, author);
        
        form.reset();
    });
    
   
    getPosts();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();  
        
      
        const targetId = this.getAttribute('href');
        
       
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
        
            targetElement.scrollIntoView({
                behavior: 'smooth',  
                block: 'start'       
            });
            
            nav.classList.remove('active');
        }
    });
});



console.log('🏥 Recife Saudável - JavaScript carregado com sucesso!');
console.log('📡 API URL:', API_URL);
console.log('🔑 Grupo: 4');



$(document).ready(function(){
    $('#mobile_btn').on('click', function(){
        $('#mobile_menu').toggleClass('active')
    })
 })


