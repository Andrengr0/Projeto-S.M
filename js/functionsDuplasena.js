$(()=>{

    $('html').css('overflow-y','auto');

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

    var qtdNumeros = $('#qtd-numeros-duplasena')
 
    for(var i=6; i<=15; i++)(
        qtdNumeros.append('<option value="+ item +">' + i + '</option>')
    )

    //Função para ativar o primeiro radio ao acessar a página
    ativaRadioInicial();
    function ativaRadioInicial(){
        $("input[value=allNumbers]").prop("checked", true);
    }

    //Função para verificar se é número impar
    function verificaImpar(num){
        num += 1;
        var testaNum = num % 2;
        if(testaNum != 0){
            return true;
        }else{
            return false;
        }
    }


    // Gera cartela
    geraCartela();
    function geraCartela(){
        $('.content').append('<div class="cartela-duplasena"></div>');
        for(var i=0; i<50; i++){
            $('.cartela-duplasena').append('<div class="num-single"></div>');
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
        $('.cartela-duplasena').append('<div class="clear"></div>')

        $('.content').append('<div class="numeros-sorteados-ordenados"></div>')
    }


    $('.btn-gerar-result > #gerar-resultado').on('click', function() {

        // Verifica os filtros
     
        $('.num-single-wrapper').css('background-color','#1B9C20')
        

        idInput = $('input[name=option]:checked').val();
        var qtdNumerosParaGerar = parseInt($('select#qtd-numeros-duplasena option:checked').text());
        var numerosSorteados = [];
        
        if(idInput == 'allNumbers'){
            
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 50);
                if(numerosSorteados.includes(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numImpares'){

            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 50);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == true){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numPares'){
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(0, 50);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }
        }

        //estiliza os números sorteados na cartela
        for(var i=0; i<numerosSorteados.length; i++){
            var seletorParaID = numerosSorteados[i];
            $('.num-single-wrapper').eq(seletorParaID).css('background-color','#560BAD')
        }


        // Efeito de rolagem para a cartela
        var scroolCartela = $('.cartela-duplasena').offset().top;
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
        }

    });
    

    function getNumRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    
})