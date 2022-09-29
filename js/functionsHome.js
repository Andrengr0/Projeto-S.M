(()=>{

    
    
    $('.btn-single').click(function(){
        var href = $(this).attr('href');

        $.ajax({
            'url':href,
            'success':function(data){
                $('body').html(data);
            }
        })
        return false;
    })
})