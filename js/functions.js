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


    $('.btn-gerar-result > #gerar-resultado').on('click', function() {
        idInput = $('input[name=option]:checked').val();
        
        if(idInput == 'allNumbers'){
            console.log(getRandomArbitrary(10, 21));
        }else if(idInput == 'numImpares'){
            console.log('impares')
        }else if(idInput == 'numPares'){
            console.log('pares')
        }
    });
    

    function getRandomArbitrary(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
      }

    
})