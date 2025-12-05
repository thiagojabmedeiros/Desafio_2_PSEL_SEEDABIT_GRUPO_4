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


const cpf_entrada = document.getElementById('cpf');
const cardCalendario = document.getElementById('cardCalendario');
            
    cpf_entrada.addEventListener('input', function(e) {
    let valor = e.target.value;
    
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, "");
    
    // Coloca os pontos e traço
    if (valor.length > 9) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (valor.length > 6) {
        valor = valor.replace(/(\d{3})(\d{3})(\d{3})/, "$1.$2.$3");
    } else if (valor.length > 3) {
        valor = valor.replace(/(\d{3})(\d{3})/, "$1.$2");
    }
    
    e.target.value = valor;
});

    // formatação do telefone
const inputTelefone = document.getElementById('telefone');
inputTelefone.addEventListener('input', function(e) {
    let valor = e.target.value;
    
    // Remove tudo que não é número
    valor = valor.replace(/\D/g, "");
    
    // Coloca a formatação (XX) XXXXX-XXXX
    if (valor.length > 10) {
        valor = valor.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (valor.length > 5) {
        valor = valor.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (valor.length > 2) {
        valor = valor.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
        valor = valor.replace(/(\d{0,2})/, "($1");
    }
    
    e.target.value = valor;
});

// Seleção de calendário
const dias = document.querySelectorAll('.day-number');
const msgData = document.getElementById('msg-data');

const anoFixo = 2025;
const mesFixo = 11; // Dezembro

    dias.forEach(dia => {
    dia.addEventListener('click', function() {
        // limpa o erro ao clicar
        cardCalendario.style.border = "2px solid transparent";

        const diaSelecionado = parseInt(this.innerText);

        const dataClique = new Date(anoFixo, mesFixo, diaSelecionado);

        const hoje = new Date();
        hoje.setHours(0,0,0,0); // Zera horas para comparação apenas de datas

        if(dataClique < hoje){
            alert("Não é possível selecionar uma data passada.");
            return;
        }

        // Remove seleção anterior
        dias.forEach(d => d.classList.remove('day-selected'));
        // Adiciona na atual
        this.classList.add('day-selected');
        msgData.innerText = "Dia selecionado: " + this.innerText + "/12/2025";
        msgData.style.color = "#00FA3";
        msgData.style.fontWeight = "bold";
    });
});
// Popup de sucesso
const popup = document.getElementById('popup-sucesso');
const btnFechar = document.getElementById('btn-ok-fechar');
const btnX = document.getElementById('btn-x-fechar');

function abrirPopup() {
    popup.style.display = 'flex';
}

function fecharPopup() {
    popup.style.display = 'none';
}

//envio do formulário somente com cpf válido

const formulario = document.getElementById('formAgendamento');

formulario.addEventListener('submit', function(e) {
    e.preventDefault();
    const cpf = cpf_entrada.value;

    // xxx.xxx.xxx-xx
    if(cpf.length !== 14) {
        alert('Por favor, insira um CPF válido.');
        cpf_entrada.style.borderColor = '2px solid red';
        return;
    }else{
        cpf_entrada.style.borderColor = "none";
    }

    // (xx) xxxxx-xxxx
    if(inputTelefone.value.length < 14){
        alert('Por favor, insira um telefone válido.');
        inputTelefone.style.borderColor = '2px solid red';
        return;
    }
    // verifica se uma data foi selecionada
    if(!document.querySelector('.day-selected')){
        alert('Por favor, selecione uma data no calendário.');
        cardCalendario.style.borderColor = "red";
        cardCalendario.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' });
        return;
    }
    // se sobreviveu até aqui, abre o calendário

    abrirPopup();

});

// lógica de fechar popup
btnFechar.addEventListener('click', fecharPopup);
btnX.addEventListener('click', fecharPopup);

popup.addEventListener('click', function(e) {
    if (e.target === popup) {
        fecharPopup();
    }
});


$(document).ready(function(){

    $('#mobile_btn').on('click', function(){
         $('#mobile_menu').toggleClass('active')
     })

    ScrollReveal().reveal('#img_objetivos',{
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.container-cards', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });
    ScrollReveal().reveal('.testmonials-grid', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });
    ScrollReveal().reveal('.blog-posts-container', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });
    ScrollReveal().reveal('.col-form', {
        origin: 'right',
        duration: 2000,
        distance: '20%'
    });
    
 })



