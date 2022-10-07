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

    var qtdNumeros = $('#qtd-numeros-timemania')
 
    for(var i=10; i<=10; i++)(
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
        $('.content').append('<div class="cartela-timemania"></div>');
        for(var i=0; i<80; i++){
            $('.cartela-timemania').append('<div class="num-single"></div>');
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
        $('.cartela-timemania').append('<div class="clear"></div>')

        $('.content').append('<div class="numeros-sorteados-ordenados"></div>')

        $('.content').append('<div class="clube"></div>');

    }


    $('.btn-gerar-result > #gerar-resultado').on('click', function() {

        // Verifica os filtros
     
        $('.num-single-wrapper').css('background-color','#1B9C20')
        

        idInput = $('input[name=option]:checked').val();
        var qtdNumerosParaGerar = parseInt($('select#qtd-numeros-timemania option:checked').text());
        var numerosSorteados = [];
        
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
            $('.num-single-wrapper').eq(seletorParaID).css('background-color','#560BAD')
        }


        // Efeito de rolagem para a cartela
        var scroolCartela = $('.cartela-timemania').offset().top;
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

        var listaTimes = ["ABC - RN", "Altos - PI", "América - MG", "América - RN", "Aparecidense - GO",
                        "Athlético - PR", "Atlético - AC", "Atlético - CE", "Atlético - GO", "Atlético-MG - MG",
                        "Avaí - SC", "Bahia - BA", "Boa Esporte - MG", "Boa Vista - RJ", "Botafogo - PB", "Botafogo - RJ",
                        "Botafogo - SP", "Bragantino - SP", "Brasil - RS", "Brasiliense - DF", "Brusque	- SC", "Campinense - PB",
                        "Caxias	- RS", "Ceará - CE", "Chapecoense - SC", "Cianorte - PR", "Confiança - SE", "Corinthians - SP",
                        "Coritiba - PR", "CRB - AL", "Criciúma - SC", "Cruzeiro	- MG", "CSA - AL", "Cuiabá - MT", "Ferroviária - SP",
                        "Ferroviário - CE", "Figueirense - SC", "Flamengo - RJ", "Floresta - CE", "Fluminense - RJ", "Fortaleza - CE",
                        "Goiás - GO", "Grêmio - RS", "Guarani - SP", "Imperatriz - MA", "Internacional - RS", "Ituano - SP", "Jacuipense - BA",
                        "Joinville - SC", "Juazeirense - BA", "Juventude - RS", "Londrina - PR", "Luverdense - MT", "Manaus - AM",
                        "Mirasol - SP", "Moto Club - MA", "Náutico - PE", "Novorizontino - SP", "Oeste - SP", "Operário	- PR",
                        "Palmeiras - SP", "Paraná - PR", "Paysandu - PA", "Ponte Preta - SP", "Remo - PA", "Sampaio Corrêa - MA",
                        "Santa Cruz - PE", "Santos - SP", "São Bento - SP", "São José - RS", "São Paulo	- SP", "São Raimundo - RR",
                        "Sport Recife - PE", "Tombense - MG", "Treze - PB", "Vasco da Gama - RJ", "Vila Nova - GO", "Viória	- BA",
                        "Volta Redonda - RJ", "Ypiranga	- RS"];
        var numTimes = listaTimes.length;
        var geraTime = getNumRandom(0, numTimes);
        $('.clube').html("")
        $('.clube').append(listaTimes[geraTime]);

    });
    

    function getNumRandom(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    
})