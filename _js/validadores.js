var form = document.getElementsByTagName('form')[0];

//Seleciona o campo Nome e aplica o evendo 
var campoNome = document.getElementById('nome');

campoNome.addEventListener('keyup', validaNome);

function validaNome() {
    var nome = campoNome.value;
    
    //testar se o nome está vazio
    if (nome.trim() == ''){
        console.log('Nome Vazio');
    } else {
        //caso contrario envia o nome para gravar
        console.log("VARIAVEL --> " + nome);
        campoNome.addEventListener('submit', gravar(nome));
    }
}
