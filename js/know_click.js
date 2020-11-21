// =================== 宗耘的know.js ======================================

$(document).ready(function(){

    //頁籤

    //按鈕/頁籤切換 做class on的切換
    $('.list_1 > li').click(function(e){
        $(this).closest('ul').find('li').removeClass('on');
        $(this).addClass('on');
      
        
        //box內容切換 做class on的切換
        $('div.inBox_1').removeClass('on');
        $('div.inBox_1.'+$(this).attr('data-target')).addClass('on');
    });

   
    
});

// =================== 宗耘end ======================================