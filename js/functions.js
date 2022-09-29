$(()=>{

    var qtdNumeros = $('#qtd-numeros-megasena')
    var allNumbers = $('#allNumbers')
    var numImpares = $('#numImpares')
    var numPares = $('#numPares')
    

    for(var i=6; i<=15; i++)(
        qtdNumeros.append('<option value="+ item +">' + i + '</option>')
    )

    ativaRadioInicial();
    function ativaRadioInicial(){
        $("input[value=allNumbers]").prop("checked", true);
    }


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
        
        if(idInput == 'allNumbers'){
            
            var numerosSorteados = [];

            var i=0;
            while( i<qtdNumerosParaGerar){
                var numGerado = getRandomArbitrary(1, 61);
                if(numerosSorteados.includes(numGerado) == false){
                    numerosSorteados.push(numGerado)
                    i++;
                }
            }
  
            for(var i=0; i<numerosSorteados.length; i++){
                var seletorParaID = numerosSorteados[i];
                $('#'+seletorParaID).css('background-color','#560BAD')
            }


        }else if(idInput == 'numImpares'){


            if(verificaImpar(qtdNumerosParaGerar) == true){
                console.log('num impar');
            }

        }else if(idInput == 'numPares'){
            console.log('pares')
        }
    });
    

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    
})