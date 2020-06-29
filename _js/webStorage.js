var form = document.getElementsByTagName('form')[0];

//Definição das variáveis do localStorage
var lsNome; 

//testa se tem suporte a localstorage 
if(typeof(Storage) != "undefine"){

} else {
    document.write("Sem suporte a Web Storage!")
}

form.addEventListener('submit', gravar);

function gravar (nome) {
    var campoNome = nome;
       
    localStorage.setItem('nome',nome);
    
    var modal = document.getElementById('escreveModal');
    modal.innerHTML = "<p> Nome do Produto: " + nome;
}