/* - Variáveis para controlar os eventos - */
var form = document.getElementById('formulario');
var nomeForm = document.getElementById('nome');
var medidaForm = document.getElementById('medida');
var quantidadeForm = document.getElementById('quantidade');
var precoForm = document.getElementById('preco');
var perecivelForm = document.getElementById('perecivel');
var fabricacaoForm = document.getElementById('fabricacao');
var perecivelForm = document.getElementById('perecivel');
var validadeForm = document.getElementById('validade');

/* - Botões - */
var btnCadastrar = document.getElementById('cadastrar');
var btnCancelar = document.getElementById('cancelar');
var btnConcluir = document.getElementById('concluir');

/* - Eventos dos Botões */
btnCancelar.addEventListener('click', cancelarEnvio);
btnCadastrar.addEventListener('click', enviaDados);
btnConcluir.addEventListener('click', concluirForm);

/* - Eventos - */
form.addEventListener('submit', enviaDados);
nomeForm.addEventListener('keyup', validaNome);
medidaForm.addEventListener('change', validaMedida);
quantidadeForm.addEventListener('focus', validaQuantidade);
quantidadeForm.addEventListener('keyup', validaQuantidade);
precoForm.addEventListener('keyup', validaPreco);
precoForm.addEventListener('focusout', validaPreco);
fabricacaoForm.addEventListener('change', validaFabricacao);
fabricacaoForm.addEventListener('keyup', validaFabricacao);
perecivelForm.addEventListener('change', validaPerecivel);
validadeForm.addEventListener('click', validaValidade);
validadeForm.addEventListener('keyup', validaValidade);
validadeForm.addEventListener('change', validaValidade);


/* - Funções - */

/* - Verifica se Campos não estão sendo enviados vazios - */
function enviaDados(evt) {
    var nome = document.getElementById('nome');
    var medida = document.getElementById('medida');
    var quantidade = document.getElementById('quantidade');
    var preco = document.getElementById('preco');
    var fabricacao = document.getElementById('fabricacao');
    var perecivel = document.getElementById('perecivel');
    var validade = document.getElementById('validade');
    var contador = 0;

    /*testar se o nome está vazio*/
    var erroNome = document.querySelector('.erro-nome');
    if (nome.value == "") {
        erroNome.style.display = 'inline';
        erroNome.innerHTML = "* Campo obrigatório!";
        contador += 1;
    } else {
        erroNome.style.display = 'none';
    }

    /* Validação do campo Unidade de Medida */
    var erroMedida = document.querySelector('.erro-medida');
    if (medida.value == '1') {
        erroMedida.style.display = 'inline';
        erroMedida.innerHTML = "* Campo obrigatório!";
        contador += 1;
    } else {
        erroMedida.style.display = 'none';
    }

    /* Validação do campo Quantidade */
    var erroQuantidade = document.querySelector('.erro-quantidade');
    if (quantidade.value == '') {
        erroQuantidade.style.display = 'inline';
        erroQuantidade.innerHTML = "* Campo Obrigatório!";
        contador += 1;
    } else {
        erroQuantidade.style.display = 'none';
    }

    /* Validação do campo Preço */
    var erroPreco = document.querySelector('.erro-preco');
    if (preco.value == '') {
        erroPreco.style.display = 'inline';
        erroPreco.innerHTML = "* Campo Obrigatório!";
        contador += 1;
    } else {
        erroPreco.style.display = 'none';
    }

    /* Validação do campo de Data de Fabricação*/
    var erroFabricacao = document.querySelector('.erro-fabricacao');
    var erro = validaFabricacao();
    
    if (fabricacao.value == '' || erro == false) {
        if (erro == false){
            erroFabricacao.display = 'inline';
            erroFabricacao.innerHTML = "* Data superior ao dia de hoje!";
            contador += 1;
        } else {
            erroFabricacao.display = 'inline';
            erroFabricacao.innerHTML = "* Campo Obrigatório!";
            contador += 1;
        }
    } else {
        erroFabricacao.style.display = 'none';
    }

    /* Mostra ou não a data de validade */
    var erroValidade = document.querySelector('.erro-validade');
    if (validade.value == '' && perecivel.checked == true) {
        erroValidade.style.display = 'inline';
        erroValidade.innerHTML = "* Campo Obrigatório!";
        contador += 1;
    } else {
        erroValidade.innerHTML = '';
    }

    if (contador > 0) {
        evt.preventDefault();
    } else {
        imprimeCadastro();
    }
}

/*Valida se o nome contém caracteres especiais ou números. Bloqueia o botão de Cadastrar caso positivo */
function validaNome() {
    var nome = document.getElementById('nome').value;
    var erroNome = document.querySelector('.erro-nome');
    //define uma regex que só aceita letras com espaço.
    var regex = new RegExp(/[^a-zA-Z\s]/);

    //testar se o nome está vazio ou tem caracteres especiais
    if (nome.trim() == '' || regex.test(nome)) {
        if (nome.trim() == '') {
            erroNome.innerHTML = '* Não aceita Campo Vazio!';
            btnCadastrar.disabled = true;
        } else {
            erroNome.innerHTML = '* Campo não aceita caracteres especiais!';
            btnCadastrar.disabled = true;
        }
    } else {
        erroNome.innerHTML = '';
        btnCadastrar.disabled = false;
    }
}

/*  Função que pega o valor da Unidade de Medida
    Primeiro pega o id do select
    Depois pega o valor do option usando a variavel do select com 
    variavel_select.option[variavel_select.selectedIndex]
    Pode pegar o valor do value ou do texto*/
function validaMedida() {
    var seleciona = document.getElementById('medida');
    var medida = seleciona.options[seleciona.selectedIndex].value;
    var erroMedida = document.querySelector('.erro-medida');
    var erroQuantidade = document.querySelector('.erro-quantidade');
    if (medida == '1') {
        erroMedida.innerHTML = '* Por Favor, selecione uma opção!'
        validaQuantidade();
    } else {
        erroMedida.innerHTML = '';
        erroQuantidade.innerHTML = '';
        document.getElementById('medidadeUnidade').innerHTML = medida;
        validaQuantidade();
    }
}

/*Baseado na escolha da Unidade de medida usa inteiros para a unidade e números com virgula para 
kilograma e litros, caso a Unidade de Medida não for selecionado o campo Quantidade é bloqueado até 
que uma Unidade de Medida seja selecionado  */
function validaQuantidade(medida) {
    /*Evento que fica escutando alguma mudança no Campo de Medida */
    medidaForm.addEventListener('change', validaMedida);
    var seleciona = document.getElementById('medida');
    var opcao = seleciona.options[seleciona.selectedIndex].value;
    var quantidade = document.getElementById('quantidade').value;
    var blqQuantidade = document.getElementById('quantidade');
    var erroMedida = document.querySelector('.erro-medida');
    var erroQuantidade = document.querySelector('.erro-quantidade');

    if (opcao == '1') {
        erroMedida.style.display = 'inline';
        erroMedida.innerHTML = '* Por Favor selecione uma Unidade de Medida!';
        blqQuantidade.disabled = true;
        erroQuantidade.style.display = 'inline';
        erroQuantidade.innerHTML = '* Campo Obrigatório!';
    } else {
        /* Desbloqueia o campo e tira a mensagem de erro */
        erroQuantidade.innerHTML = '* Campo Obrigatório!';
        blqQuantidade.disabled = false;
        //erroQuantidade.style.display = 'inline';

        if (opcao == 'un') {
            if (quantidade == '') {
                erroQuantidade.innerHTML = '* Campo Obrigatório!';
            } else {
                document.getElementById('quantidade').placeholder = 'Somente números inteiros';
                quantidade = quantidade.replace(/\D+/, ""); //somente números
                this.value = quantidade;
                erroQuantidade.innerHTML = '';
            }
        } else {
            if (quantidade == '') {
                erroQuantidade.innerHTML = '* Campo Obrigatório!';
            } else {
                erroQuantidade.innerHTML = '';
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
}

function validaPreco() {
    var preco = document.getElementById('preco').value;
    var erroPreco = document.querySelector('.erro-preco');
    preco = preco.replace('R$ ', "");
    preco = preco.replace(' ', "");
    preco = preco.trim();

    if (preco == '') {
        preco = preco.replace(' ', "");
        erroPreco.innerHTML = '* Não aceita campo vazio!';
        btnCadastrar.disabled = true;
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
        erroPreco.innerHTML = '';
        btnCadastrar.disabled = false;
    }
}

/*Testa a data de fabricação, a data não pode ser superior ao dia atual, testa se o ano atual
depois testa se o ano está em um intervalo pre definido, caso esteja correto a data chama a função
de validade para desbloquear a mesma se o produto for perecivel*/
function validaFabricacao() {
    var entrada = document.getElementById('fabricacao').value;
    var erroFabricacao = document.querySelector('.erro-fabricacao');
    var transformaData = entrada.split("-");
    /* Coloca na data digitada no formato Ano,mes,dia*/
    var dataDigitada = new Date(transformaData[0], transformaData[1] - 1, transformaData[2]);
    var dataAtual = new Date();
    /*Pega a data atual */
    dataAtual = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());

    if (dataDigitada > dataAtual) {
        erroFabricacao.style.display = 'inline';
        erroFabricacao.innerHTML = '* Data superior ao dia de hoje!';
        btnCadastrar.disabled = true;
        return false
    } else {
        if (transformaData[0] < 1900 || transformaData[0] > 2999) {
            erroFabricacao.innerHTML = '* Formato inválido!';
            return false;
        } else {
            erroFabricacao.innerHTML = '';
            btnCadastrar.disabled = false;
            validaValidade();
            return true;
        }
    }
}

/* Verifica se o checkbox foi selecionado, se sim mostra o campo de data de validade 
caso contrário oculta, por padrão foi definido no CSS que o label e o input data de validade são ocultos*/
function validaPerecivel() {
    var perecivel = document.getElementById('perecivel');

    if (perecivel.checked == true) {
        document.getElementById('label-validade').style.display = 'inline';
        document.getElementById('validade').style.display = 'inline';
        return perecivel = 'Sim';
    } else {
        //se não for perecivel então esconde a data
        document.getElementById('label-validade').style.display = 'none';
        document.getElementById('validade').style.display = 'none';
        document.querySelector('.erro-validade').innerHTML = '';
        return perecivel = 'Não';
    }
}

/* Testa a data de fabricação está vazia, mostra uma mensagem de erro e foca no campo data de fabricação 
e bloqueia o campo de validade, depois testa se a data de validade  está vazia ou se e menor que a data 
de fabricação e apresenta o erro caso seja*/
function validaValidade() {
    fabricacaoForm.addEventListener('change', validaFabricacao);
    var fabricacao = document.getElementById('fabricacao');
    var validade = document.getElementById('validade');
    var perecivel = document.getElementById('perecivel');
    var erroFabricacao = document.querySelector('.erro-fabricacao');
    var erroValidade = document.querySelector('.erro-validade');

    if (fabricacao.value == '') {
        erroFabricacao.innerHTML = "* Campo Obrigatório!";
        erroValidade.innerHTML = "* Data de Fabricação é obrigatório!";
        validade.disabled = true;
        fabricacao.focus();
    } else {
        validade.disabled = false;
        erroValidade.innerHTML = '';
        if (perecivel.checked == true) {
            if (validade.value == '') {
                erroValidade.innerHTML = '* Preencha a data de validade!'
            } else {
                if (validade.value < fabricacao.value) {
                    erroValidade.innerHTML = '* Data de Validade é MENOR que o de Fabricação!'
                    btnCadastrar.disabled = true;
                } else {
                    btnCadastrar.disabled = false;
                }
            }
        }
    }
}

/*Cancela o envio do formulário e limpa as mensagens de erro, os campos são limpos automaticamente
por causa do type reset do botão, o label e a data de validade tem que ser ocultos */
function cancelarEnvio() {
    erros = document.querySelectorAll('.msg-erro');
    for (var i = 0; i < erros.length; i++) {
        erros[i].innerHTML = '';
    }

    document.getElementById('label-validade').style.display = 'none'
    document.getElementById('validade').style.display = 'none'
    document.getElementById('perecivel').checked = false;
    document.getElementById('quantidade').disabled = false;
}

/* Transforma a data no formato dd/mm/aaaa */
function transformaData(fabricacao) {
    if (fabricacao != '') {
        var transformaData = fabricacao.split("-");
        return transformaData[2] + '/' + transformaData[1] + '/' + transformaData[0];
    } else {
        return false;
    }
}

/*Limpa o formulario depois de clicar no botão Concluir */
function concluirForm() {
    document.getElementById('nome').value = '';
    document.getElementById('medida').value = '1';
    document.getElementById('medidadeUnidade').innerHTML = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('fabricacao').value = '';
    document.getElementById('perecivel').checked = false;
    document.getElementById('label-validade').style.display = 'none';
    document.getElementById('validade').value = '';
    document.getElementById('validade').style.display = 'none';
}

/*Quando chamada imprime os dados cadastrados em um janela modal. Pensar em um modo mais elegante 
de mostrar os dados, ideia inicial somente. */
function imprimeCadastro() {
    var escreve = document.getElementById('escreveModal');
    var nome = document.getElementById('nome').value;
    var seleciona = document.getElementById('medida');
    var medidaTexto = seleciona.options[seleciona.selectedIndex].text;
    var quantidade = document.getElementById('quantidade').value;
    var preco = document.getElementById('preco').value;
    var fabricacao = document.getElementById('fabricacao').value;
    var perecivel = validaPerecivel();
    var validade = document.getElementById('validade').value;

    fabricacao = transformaData(fabricacao);
    validade = transformaData(validade);

    if (perecivel == 'Sim') {
        escreve.innerHTML = "<br><p> Nome: " + nome + "</p><br>"
            + "<br><p> Unidade de Medida: " + medidaTexto + "</p><br>"
            + "<br><p> Quantidade: " + quantidade + "</p><br>"
            + "<br><p> Preço: " + preco + "</p><br>"
            + "<br><p> Data de Fabricação: " + fabricacao + "</p><br>"
            + "<br><p> Produto Perecível: " + perecivel + "</p><br>"
            + "<br><p> Data de Validade: " + validade + "</p><br>";
    } else {
        escreve.innerHTML = "<br><p> Nome: " + nome + "</p><br>"
            + "<br><p> Unidade de Medida: " + medidaTexto + "</p><br>"
            + "<br><p> Quantidade: " + quantidade + "</p><br>"
            + "<br><p> Preço: " + preco + "</p><br>"
            + "<br><p> Data de Fabricação: " + fabricacao + "</p><br>"
    }
}



/*


//Pega os elementos do HMTL para usar nos eventos

var btnEnviar = document.getElementById('enviar');

var btnLimpar = document.getElementById('limpar');

//Eventos para os campos e botões

btnLimpar.addEventListener('click', limparForm);
//Funções

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

*/