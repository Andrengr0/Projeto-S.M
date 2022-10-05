$(()=>{

    $('html').css('overflow','hidden');
    
    $('.btn-single').click(function(){
        var href = $(this).find('a').attr('href');

        $.ajax({
            'url':href,
            'success':function(data){
                $('body').html(data);
            }
        })
        return false;
    })

    
    
    // $('.btn-single').click(function(){
    //     var href = $(this).attr('href');

    //     $.ajax({
    //         'url':href,
    //         'success':function(data){
    //             $('body').html(data);
    //         }
    //     })
    //     return false;
    // })
})