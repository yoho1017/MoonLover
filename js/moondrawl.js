$(document).ready(function(){
    // 第一步按鈕 求籤
    $('.btn_go1').on('click', function(){
        $('.duelbox').toggleClass('-on');
    });
    // 第二步按鈕 擲筊
    $('.btn_go2').on('click', function(){
        $('.duelbox').removeClass('-on'); // 一二屏消失
        $('.duelboxer').addClass('-on'); // 第三屏出現
        $('.god_talk').toggleClass('-on') // 換月老
    });

    // 第三四屏切換
    $('.dBoxSwitch').on('click', function(){
        $('.dBoxSwitch').toggleClass('-on');
    });
});