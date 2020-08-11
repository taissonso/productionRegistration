# productionRegistration
Cadastro de Produtos utilizando HTML5, CSS3 e JavaScript. 

    - É feito o cadastro de um produto em uma única página e mostrando o resultado em uma janela modal. Foi testado somente no Google Chrome e também não foi feito nada sobre ser responsivo.   

    --- Campos ---

        1. Campo nome do produto. (Somente letras), entrada de texto.

        2. Unidade de Medida. (Litro, Quilograma, Unidade), via select. 

        3. Quantidade (Com virgula para Litro e Quilograma e número inteiro para Unidade). Caso uma unidade de medida não seja selecionada o campo de quantidade fica bloqueado e mostra uma mensagem até que o usuário selecione o tipo de unidade.

        4. Preço (Monetário), em reais, o campo só aceita números, foi criado uma mascara que preenche o valor da direita para a esquerda, repeitando duas casas depois da virgula e colocando ponto depois de milhar e milhões. 

        5. Data de fabricação. Não pode ser superior a data de validade e nem superior ao dia atual que for feita o cadastro do produto. 

        6. Produto Perecível (Valor booleano), mostra mensagem de Sim ou Não na Janela Modal, ao selecionar "Sim", mostra o campo de Validade.

        7. Data de Validade (Só se o produto for perecível) e não pode ser menor que a data de fabricação, por padrão esse campo aparece oculto no formulário.

        OBS: Os campos Não aceitam autocomplete.
        
    --- Botões --- 

        - Cadastrar, cadastra o produto e abre uma janela Modal com a descrição do produto, só será enviado caso todos os campos estejam corretos.

        - Cancelar, limpa todos os campos e mensagens de erros do formulário.

        - Concluir, botão da janela Modal, fecha a janela modal e limpa os campos do formulário.  

        - X (da janela Modal), fecha a janela mas não limpa o formulário, deixa como está caso queira modificar alguma coisa. 

    --- ERROS --- 

        - Problemas inicias com o botão de cadastrar, que ao clicar duas vezes cadastrava o produto mesmo com erros no formulário, o mesmo foi tratado e não está acontecendo mais. 

        - Problemas com o botão de Cancelar, não estava limpando as mensagens de forma mais genérica. O CSS foi ajustado para ficar com o mesmo tamanho do botão cadastrar.
    
    --- DIFICULDADES --- 

        - Data: encontrei dificuldade ao tratar o padrão de datas. 
        - Unidade de medida, Preço: dificuldade com a função "replace" que faz a troca de strings.