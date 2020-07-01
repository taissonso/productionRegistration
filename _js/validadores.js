var form = document.getElementsByTagName('form')[0];

var nomeForm = document.getElementById('nome');
var medidaForm = document.getElementById('medida');
var quantidadeForm = document.getElementById('quantidade');

var btnEnviar = document.getElementById('enviar');
var btnCancelar = document.getElementById('resetar');

//Carrega o arquivo e desativa o botão de enviar 
form.addEventListener('load', botaoEnviar(0));

//Eventos para os campos e botões
nomeForm.addEventListener('keyup', validaNome);
medidaForm.addEventListener('change', validaMedida);
quantidadeForm.addEventListener('keyup', validaQuantidade);

btnCancelar.addEventListener('click', cancelaEnvio);

btnEnviar.addEventListener('click', enviaDados);

//Funções
function validaNome() {
    //Pega o valor do campo nome
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
//Pode pegar o valor do value(variavel_option.value) ou do texto (variavel_option.text)
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
    var regex1 = new RegExp(/\D+/);

    var quantidade = document.getElementById('quantidade').value;
    console.log('DIGITADO: ' + quantidade + ' RESULTADO: ' + regex1.test(quantidade));
    
    if (!regex1.test(quantidade) || quantidade === '') {
        document.getElementById('erroQuantidade').innerHTML = '';
        if (aux != '1') {
            document.getElementById('erroQuantidade').innerHTML ='';
            if (aux == 'un') {
                console.log('CONFIGURAR COMO UNIDADE');
            } else {
                console.log('CONFIGURAR COMO LITRO E QUILOGRAMA');
            }
        } else {
            document.getElementById('erroMedida').innerHTML = '* Por Favor, selecione uma opção!';
        }
    } else {
        if(quantidade.trim() === ''){
            document.getElementById('erroQuantidade').innerHTML = '* Campo vazio!';
        } else {
            document.getElementById('erroQuantidade').innerHTML = '* Campo obrigatorio, não aceita letras!';
        }
    }
}

//Função que fica controlando o botão enviar só para fins de testes
function botaoEnviar(flag) {
    if (flag == 0) {
        document.getElementById('enviar').onclick = function () { return false }
    } else {
        document.getElementById('enviar').onclick = function () { return true }
    }
}

//Como é um botão com reset ele limpa o formulário e desativa o botão de enviar
//Tem que limpar os campos spans de forma mais generalizada
function cancelaEnvio() {
    document.getElementById('erroNome').innerHTML = '';
    document.getElementById('erroMedida').innerHTML = ''
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('erroQuantidade').innerHTML = '';
    document.getElementById('enviar').onclick = function () { return false }
}

//Para colocar no localStorage e mostrar na janela Modal
function enviaDados() {
    //localStorage.setItem('nome', nome);
    //localStorage.setItem('medida', medidaTexto);
    var nome = document.getElementById('nome').value;
    var seleciona = document.getElementById('medida');
    var medida = seleciona.options[seleciona.selectedIndex].value;
    var medidaTexto = seleciona.options[seleciona.selectedIndex].text;
    var quantidade = document.getElementById('quantidade').value;
    if (nome != '' && medida != '1' && quantidade != '') {
        document.getElementById('enviar').onclick = true;
        var modal = document.getElementById('escreveModal');
        modal.innerHTML = "<p> Nome do Produto: " + nome + "</p><br>"
            + "<p> Unidade de Medida: " + medidaTexto + "</p><br>"
            + "<p> Quantidade: " + quantidade + "</p>";
    } else {
        document.getElementById('enviar').onclick = function () { return false }
    }
}