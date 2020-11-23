var moonGod = new TimelineMax();
var memberCard = new TimelineMax();

memberCard.to('.card1', .5, {
    y: 20,
}).to('.card3', .5, {
    y: 20,
}).to('.card2', .5, {
    y: 20,
});
memberCard.stop();

moonGod.to('.loveGod', .01,{
    scale: .85,
}).to('.exclamation', .5,{
    opacity: 1,
}).to('.exclamation', .05,{
    opacity: 0,
}).to('.loveGod', 1.8,{
    scale: 3.8,
    y: 180,
});
moonGod.stop();

$(document).ready(function(){

    // 點擊，切換 flipped 樣式
    $("div.card").on('click', function(){
        $(this).toggleClass('flipped');
    });

    setTimeout(() => {
        $('.introLightbox').addClass('-on');

    }, 1000);

    setTimeout(() => {
        moonGod.restart();
        setTimeout(() => {
            $('.msgBox').addClass('-on');
            $('.queryBox').addClass('-on');
        }, 1000);
    }, 1500);

    setTimeout(() => {
        TweenMax.to('.memberCards', 1, {
            y: -100,
            scale: .5
        });
    }, 2300);

    document.querySelector('.loveGod').onclick = function () {  
        moonGod.restart();
        setTimeout(() => {
            $('.msgBox').addClass('-on');
            $('.queryBox').addClass('-on');
        }, 1000);
        
    }

    // setTimeout(() => {
    //     moonGod.to('.loveGod', 1,{
    //         scale: 1,
    //         y: 0,
    //     }).to('.loveGod', 1,{
    //         scale: 3.8,
    //         y: 100,
    //     });
    // }, 1000);

});


