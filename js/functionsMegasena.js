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

    var qtdNumeros = $('#qtd-numeros-megasena')
 
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
        var testaNum = num % 2;
        if(testaNum != 0){
            return true;
        }else{
            return false;
        }
    }


    $('.btn-gerar-result > #gerar-resultado').on('click', function() {
        for(var i=1; i<=60; i++){
            $('#'+i).css('background-color','#1B9C20')
        }

        idInput = $('input[name=option]:checked').val();
        var qtdNumerosParaGerar = parseInt($('select#qtd-numeros-megasena option:checked').text());
        var numerosSorteados = [];
        
        if(idInput == 'allNumbers'){
            
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(1, 61);
                if(numerosSorteados.includes(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numImpares'){

            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(1, 61);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == true){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }

        }else if(idInput == 'numPares'){
            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getNumRandom(1, 61);
                if(numerosSorteados.includes(numGerado) == false && verificaImpar(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }
        }

        //estiliza os números sorteados na cartela
        for(var i=0; i<numerosSorteados.length; i++){
            var seletorParaID = numerosSorteados[i];
            $('#'+seletorParaID).css('background-color','#560BAD')
        }


        // Efeito de rolagem para a cartela
        var scroolCartela = $('.cartela').offset().top;
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
            var span = $('<span>'+numerosSorteados[i]+'</span>')
            $('.num-single-sorteado').eq(i).append(span);
        }

    });
    

    function getNumRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    
})