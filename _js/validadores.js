//Carrega a página e desativa o botão de enviar formulário, para evitar o envio do formulário vazio
window.onload = enviaDados;

var form = document.getElementsByTagName('form')[0];

//Pega os elementos do HMTL para usar nos eventos
var nomeForm = document.getElementById('nome');
var medidaForm = document.getElementById('medida');
var quantidadeForm = document.getElementById('quantidade');
var precoForm = document.getElementById('preco');
var perecivelForm = document.getElementById('perecivel');

var btnEnviar = document.getElementById('enviar');
var btnCancelar = document.getElementById('resetar');
var btnLimpar = document.getElementById('limpar');

//Eventos para os campos e botões
nomeForm.addEventListener('keyup', validaNome);
medidaForm.addEventListener('change', validaMedida);
quantidadeForm.addEventListener('keyup', validaQuantidade);
precoForm.addEventListener('keyup', validaPreco);
perecivelForm.addEventListener('click', validaPerecivel);

fabricacaoForm.addEventListener('change', validaFabricacao)
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
    var regex = new RegExp(/\D+/);

    var quantidade = document.getElementById('quantidade').value;
    console.log('DIGITADO: ' + quantidade + ' RESULTADO: ' + regex.test(quantidade));

    if (!regex.test(quantidade) || quantidade == '') {
        document.getElementById('erroQuantidade').innerHTML = '';
        if (aux != '1') {
            document.getElementById('erroQuantidade').innerHTML = '';
            if (aux == 'un') {
                console.log('CONFIGURAR COMO UNIDADE');
            } else {
                console.log('CONFIGURAR COMO LITRO E QUILOGRAMA');
            }
        } else {
            document.getElementById('erroMedida').innerHTML = '* Por Favor, selecione uma opção!';
        }
    } else {
        if (quantidade.trim() == '') {
            document.getElementById('erroQuantidade').innerHTML = '* Campo vazio!';
        } else {
            document.getElementById('erroQuantidade').innerHTML = '* Campo obrigatorio, não aceita letras!';
        }
    }
}

function validaPreco() {
    var preco = document.getElementById('preco').value;
    var regex = new RegExp(/\D+/);

    if (!regex.test(preco) || preco == '') {
        document.getElementById('erroPreco').innerHTML = '';
        //mascara para preço
    } else {
        if (preco.trim() == '') {
            document.getElementById('erroPreco').innerHTML = '* Campo vazio!';
        } else {
            document.getElementById('erroPreco').innerHTML = '* Campo obrigatorio, não aceita letras ou espaço em branco!';
        }
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

//Valida a data de fabricação do produto 
function validaFabricacao () {
    var data = document.getElementById('fabricacao').value;
    console.log('Data adquirida: ' + data);
}

//Como é um botão com reset ele limpa o formulário e desativa o botão de enviar
//Tem que limpar os campos spans de forma mais generalizada
function cancelaEnvio() {
    document.getElementById('erroNome').innerHTML = '';
    document.getElementById('erroMedida').innerHTML = ''
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('erroQuantidade').innerHTML = '';
    document.getElementById('erroPreco').innerHTML = '';
    document.getElementById('enviar').onclick = function () { return false }
}

function limparForm() {
    document.getElementById('nome').value = '';
    document.getElementById('medida').selectedIndex = 0;
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('perecivel').checked = false;
    document.getElementById('label').style.display = 'none';
    document.getElementById('validade').style.display = 'none';
}

//Para colocar no localStorage e mostrar na janela Modal, também desativa o botão enviar formulário
//ao carregar a página via CSS
function enviaDados() {

    //localStorage.setItem('nome', nome);
    //localStorage.setItem('medida', medidaTexto);

    var nome = document.getElementById('nome').value;
    var seleciona = document.getElementById('medida');
    var medidaTexto = seleciona.options[seleciona.selectedIndex].text;
    var quantidade = document.getElementById('quantidade').value;
    var preco = document.getElementById('preco').value;
    var perecivel = validaPerecivel();
    if (nome != '' && preco != '') {
        document.getElementById('enviar').onclick = function () { return true }
        var modal = document.getElementById('escreveModal');
        modal.innerHTML = "<p> Nome do Produto: " + nome + "</p><br>"
            + "<p> Unidade de Medida: " + medidaTexto + "</p><br>"
            + "<p> Quantidade: " + quantidade + "</p><br>"
            + "<p> Preço: R$ " + preco + "</p><br>"
            + "<p> Perecivel: " + perecivel + "</p><br>";
    } else {
        document.getElementById('enviar').onclick = function () { return false }
    }
}