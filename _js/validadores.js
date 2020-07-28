//Carrega a página e desativa o botão de enviar formulário, para evitar o envio do formulário vazio
window.onload = enviaDados;

var form = document.getElementsByTagName('form')[0];

//Pega os elementos do HMTL para usar nos eventos
var nomeForm = document.getElementById('nome');
var medidaForm = document.getElementById('medida');
var quantidadeForm = document.getElementById('quantidade');
var precoForm = document.getElementById('preco');
var perecivelForm = document.getElementById('perecivel');
var fabricacaoForm = document.getElementById('fabricacao');
var btnEnviar = document.getElementById('enviar');
var btnCancelar = document.getElementById('resetar');
var btnLimpar = document.getElementById('limpar');

//Eventos para os campos e botões
nomeForm.addEventListener('keyup', validaNome);

medidaForm.addEventListener('change', validaMedida);

quantidadeForm.addEventListener('focus', validaQuantidade);
quantidadeForm.addEventListener('keyup', validaQuantidade);

precoForm.addEventListener('keyup', validaPreco);

//fabricacaoForm.addEventListener('click', validaFabricacao);
fabricacaoForm.addEventListener('focusout', validaFabricacao);
fabricacaoForm.addEventListener('keyup', validaFabricacao);

perecivelForm.addEventListener('click', validaPerecivel);

btnCancelar.addEventListener('click', cancelaEnvio);
btnEnviar.addEventListener('click', enviaDados);
btnLimpar.addEventListener('click', limparForm);
//Funções
function validaNome() {
    var nome = document.getElementById('nome').value;
    //define uma regex
    var regex = new RegExp(/[^a-zA-Z\s+]/);

    //testar se o nome está vazio ou tem caracteres especiais
    if (nome.trim() == '' || regex.test(nome)) {
        if (nome.trim() == '') {
            document.getElementById('erroNome').innerHTML = '* Não aceita Campo Vazio!';
        } else {
            document.getElementById('erroNome').innerHTML = '* Campo não aceita caracteres especiais!';
        }
    } else {
        document.getElementById('erroNome').innerHTML = '';
    }
}

//Função que pega o valor da Unidade de Medida
//Primeiro pega o id do select
//Depois pega o valor do option usando a variavel do select com .selectedIndex 
//Pode pegar o valor do value ou do texto
function validaMedida() {
    var seleciona = document.getElementById('medida');
    var medida = seleciona.options[seleciona.selectedIndex].value;
    var medidaTexto = seleciona.options[seleciona.selectedIndex].text;

    if (medida == '1') {
        //erro para que se selecione uma opção
        document.getElementById('erroMedida').innerHTML = '* Por Favor, selecione uma opção!'
        document.getElementById('medidadeUnidade').innerHTML = ''
        validaQuantidade();
    } else {
        document.getElementById('erroMedida').innerHTML = '';
        document.getElementById('medidadeUnidade').innerHTML = medida;
        validaQuantidade();
    }
}

function validaQuantidade(medida) {
    medidaForm.addEventListener('change', validaMedida);
    var seleciona = document.getElementById('medida');
    var aux = seleciona.options[seleciona.selectedIndex].value;

    // var quantidade = document.getElementById('quantidade').value;
    var quantidade = document.getElementById('quantidade').value;
    if (aux == '1') {
        //Mostra o erro e bloqueia o campo
        document.getElementById('erroMedida').innerHTML = '* Por Favor selecione uma Unidade de Medida!';
        document.getElementById('quantidade').disabled = true;
    } else {
        //Desbloqueia o campo e tira a mensagem de erro
        document.getElementById('quantidade').disabled = false;
        document.getElementById('erroQuantidade').innerHTML = '';
        if (aux == 'un') {
            document.getElementById('quantidade').placeholder = 'Somente números inteiros';
            quantidade = quantidade.replace(/\D+/, ""); //somente números
            this.value = quantidade;
        } else {
            document.getElementById('quantidade').placeholder = '0,000';
            quantidade = quantidade.replace(/\D/, "");//somente números
            quantidade = quantidade.replace(/^[0]+/, "");//remove os zeros a esquerda
            quantidade = quantidade.replace(/^(\d{1,})(\d{3})$/, "$1,$2");
            quantidade = quantidade.replace(/^(\d{1})$/, "0,00$1");
            quantidade = quantidade.replace(/^(\d{2})$/, "0,0$1");
            quantidade = quantidade.replace(/^(\d{3})$/, "0,$1");
            this.value = quantidade;
        }
    }

}

function validaPreco() {
    var preco = document.getElementById('preco').value;
    console.log(preco);
    preco = preco.replace('R$ ', ""); //Tira o cifrão da frente
    if (preco == ' ') {
        document.getElementById('erroPreco').innerHTML = '* Não aceita campo vazio!';
    } else {
        preco = preco.replace(',', ""); //Remove a virgula do valor
        preco = preco.replace('.', ""); //Remove o ponto do valor
        preco = preco.replace(/\D/, "");//somente números
        preco = preco.replace(/^[0]+/, "");//remove os zeros a esquerda

        preco = preco.replace(/^(\d{1,})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3,$4");
        preco = preco.replace(/^(\d{1,})(\d{3})(\d{2})$/, "$1.$2,$3");
        preco = preco.replace(/^(\d{1,})(\d{2})$/, "$1,$2");
        preco = preco.replace(/^(\d{1})$/, "0,0$1");
        preco = preco.replace(/^(\d{2})$/, "0,$1");
        this.value = 'R$ ' + preco;
    }
}

//Testa se a data e válida.
//Data de fabricação não pode ser superior a data atual.

function validaFabricacao() {
    //pega a data
    var entrada = document.getElementById('fabricacao').value;
    console.log("ENTRADA: " + entrada);
    var transformaData = entrada.split("-");
    var dataDigitada = new Date(transformaData[0], transformaData[1] - 1, transformaData[2]);
    var dataAtual = new Date();
    dataAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    if (dataDigitada > dataAtual) {
        document.getElementById('erroFabricacao').innerHTML = '* Data superior ao dia de hoje!';
        return false;
    }else {
        if (entrada == '' || (transformaData[0] < 1900 || transformaData[0] > 2999)){
            document.getElementById('erroFabricacao').innerHTML = '* Formato inválido!';
            return false;
        } else {
            document.getElementById('erroFabricacao').innerHTML = '';
            return true;
        }
    }
}

function transformaData(fabricacao){
   // var entrada = document.getElementById('fabricacao').value;
   console.log("ANTES DE TRANSFORMAR = " + fabricacao);
    if (fabricacao != ''){
        var transformaData = fabricacao.split("-");
        return transformaData[2]+'/'+transformaData[1]+'/'+transformaData[0]; 
    } else {
        return false;
    }

 
}

//Verifica se o checkbox foi selecionado, se sim mostra o campo de data de validade 
function validaPerecivel() {
    var perecivel = document.getElementById('perecivel');

    if (perecivel.checked == true) {
        document.getElementById('label').style.display = 'inline';
        document.getElementById('validade').style.display = 'inline';
        return perecivel = 'Sim';
    } else {
        //se não for perecivel então esconde a data 
        document.getElementById('label').style.display = 'none';
        document.getElementById('validade').style.display = 'none';
        return perecivel = 'Não';
    }
}

//Como é um botão com reset ele limpa o formulário e desativa o botão de enviar
//Tem que limpar os campos spans de forma mais generalizada
function cancelaEnvio() {
    document.getElementById('erroNome').innerHTML = '';
    document.getElementById('erroMedida').innerHTML = ''
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('erroQuantidade').innerHTML = '';
    document.getElementById('erroPreco').innerHTML = '';
    document.getElementById('erroFabricacao').innerHTML = '';
    document.getElementById('enviar').onclick = function () { return false }
}

function limparForm() {
    document.getElementById('nome').value = '';
    document.getElementById('medida').selectedIndex = 0;
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('fabricacao').value = '';
    document.getElementById('perecivel').checked = false;
    document.getElementById('label').style.display = 'none';
    document.getElementById('validade').style.display = 'none';
}

//Para colocar no localStorage e mostrar na janela Modal, também desativa o botão enviar formulário
//ao carregar a página via CSS
function enviaDados() {

    var nome = document.getElementById('nome').value;
    var seleciona = document.getElementById('medida');
    var medidaTexto = seleciona.options[seleciona.selectedIndex].text;
    var quantidade = document.getElementById('quantidade').value;
    var preco = document.getElementById('preco').value;
    var fabricacao = document.getElementById('fabricacao').value;
    fabricacao = transformaData(fabricacao);
    console.log("TRANFORMOU: " + fabricacao);
    var perecivel = validaPerecivel();
    
    if (nome != '' && fabricacao != false) {
        document.getElementById('enviar').onclick = function () { return true }
        var modal = document.getElementById('escreveModal');
        modal.innerHTML = "<p> Nome do Produto: " + nome + "</p><br>"
            + "<p> Unidade de Medida: " + medidaTexto + "</p><br>"
            + "<p> Quantidade: " + quantidade + "</p><br>"
            + "<p> Preço: " + preco + "</p><br>"
            + "<p> Data de Fabricação: " + fabricacao + "</p><br>"
            + "<p> Perecivel: " + perecivel + "</p><br>";
    } else {
        document.getElementById('enviar').onclick = function () { return false }
    }
}