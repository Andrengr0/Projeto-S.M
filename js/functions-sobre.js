$(()=>{

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
    
})