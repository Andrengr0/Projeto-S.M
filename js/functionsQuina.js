$(()=>{

    $('html').css('overflow-y','auto');

    // função do botão de voltar a pagina home
    var href = $('#back-home a').attr('href');
    $('#back-home').click(function(){
        $.ajax({
            'url':href,
            'success':function(data){
                $('body').html(data);
            }
        })
        return false;
    })

    // inserir a quantidade de numeros a sortear da loteria escolhida
    var qtdNumeros = $('#qtd-numeros-quina')
 
    for(var i=5; i<=15; i++)(
        qtdNumeros.append('<option value="+ item +">' + i + '</option>')
    )

    //Função para ativar o primeiro radio ao acessar a página
    ativaRadioInicial();
    function ativaRadioInicial(){
        $("input[value=allNumbers]").prop("checked", true);
    }

    //Função para verificar se é número impar
    function verificaImpar(num){
        var testaNum = num % 2;
        if(testaNum == 0){
            return true;
        }else{
            return false;
        }
    }


    // Gera cartela
    geraCartela();
    function geraCartela(){
        $('.content').append('<div class="cartela-quina"></div>');
        for(var i=0; i<80; i++){
            $('.cartela-quina').append('<div class="num-single"></div>');
        }

        var quantNumSingle = $('.num-single').length;
        for(var j=0; j<quantNumSingle; j++){
            $('.num-single').eq(j).append('<div class="num-single-wrapper"></div>')
        }

        for(var i=0; i<quantNumSingle; i++){
            var numConvert = (i + 1);
            if(numConvert.toString().length < 2){
                numConvert = '0' + numConvert;
            }
            $('.num-single-wrapper').eq(i).append('<span>'+numConvert+'</span>')
        }
        $('.cartela-quina').append('<div class="clear"></div>')

        $('.content').append('<div class="numeros-sorteados-ordenados"></div>')
    }

    // função do botão de gerar resultado (números)
    $('.btn-gerar-result > #gerar-resultado').on('click', function() {

        $('.num-single-wrapper').css('background-color','#ffffff')

        idInput = $('input[name=option]:checked').val();
        var qtdNumerosParaGerar = parseInt($('select#qtd-numeros-quina option:checked').text());
        var numerosSorteados = [];
        
        // Verifica os filtros
        if(idInput == 'allNumbers'){
            
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 80);
                if(numerosSorteados.includes(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numImpares'){

            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 80);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == true){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numPares'){
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 80);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }
        }

        //estiliza os números sorteados na cartela
        for(var i=0; i<numerosSorteados.length; i++){
            var seletorParaID = numerosSorteados[i];
            $('.num-single-wrapper').eq(seletorParaID).css('background-color','#fffb00')
        }


        // Efeito de rolagem para a cartela
        var scroolCartela = $('.cartela-quina').offset().top;
        $('html,body').animate({'scrollTop':scroolCartela},800);


        //Gerar sequencia de numeros sorteados

        numerosSorteados.sort(function(a,b){
            if(a < b){
                return -1
            }
        })

        $('.numeros-sorteados-ordenados').html('')
        
        for(var i=0; i<numerosSorteados.length; i++){
            var contentNumSorteados = $('<div class="num-single-sorteado"></div>')
            $('.numeros-sorteados-ordenados').append(contentNumSorteados)
        }


        for(var i=0; i<numerosSorteados.length; i++){
            var numero = (numerosSorteados[i] + 1);
            numeroConvertido = numero.toString();
            if(numeroConvertido.length < 2){
                numeroConvertido = '0' + numeroConvertido;
            }
            var span = $('<span>'+numeroConvertido+'</span>')
            $('.num-single-sorteado').eq(i).append(span);
            $('.num-single-sorteado span').css('font-weight','bold')
        }

    });
    
    // função para gerar número randomico
    function getNumRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }
})