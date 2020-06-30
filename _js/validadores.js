var form = document.getElementsByTagName('form')[0];

var btnEnviar = document.getElementById('enviar');
var btnCancelar = document.getElementById('resetar');

form.addEventListener('load', botaoEnviar(0));

//Eventos para cada Campo e Botão
form.addEventListener('keyup', validaNome);

btnCancelar.addEventListener('click', cancelaEnvio);

//Funções
function validaNome() {
    
    var nome = document.getElementById('nome').value;
    console.log("NOME CAPTURADO: " + nome);
    //testar se o nome está vazio
    if (nome.trim() == '') {
        document.getElementById('erroNome').innerHTML = '* ERRO: Campo Vazio!';
        botaoEnviar(0);
    } else {
        document.getElementById('erroNome').innerHTML = '';
        recebeDados(nome)
        botaoEnviar(1);
    }
    
}

//Função que fica controlando o botão enviar só para fins de testes
function botaoEnviar (flag){
    if (flag == 0){
        document.getElementById('enviar').onclick = function(){ return false }
    } else {
        document.getElementById('enviar').onclick = function(){ return true }
    }
}

//Como é um botão com reset ele limpa o formulário e desativa o botão de enviar
//Tem que limpar os campos spans de forma mais generalizada
function cancelaEnvio () {
    document.getElementById('erroNome').innerHTML = '';
    document.getElementById('enviar').onclick = function(){ return false }
}

//Para colocar no localStorage e mostrar na janela Modal
function recebeDados(nome){
    localStorage.setItem('nome',nome);
    
    var modal = document.getElementById('escreveModal');
    modal.innerHTML = "<p> Nome do Produto: " + nome;
}