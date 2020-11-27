let moonMatchVue = new Vue({
    el: '#qBox',
    data: {
        ageRange: ['預設', '20歲以下', '21 - 30歲', '31 - 40歲', '41 - 50歲', '51 - 60歲', '61歲以上'],
        interests : [
            {interest: '運動', checked : false},
            {interest: '看書', checked : false},
            {interest: '看電影', checked : false},
            {interest: '旅遊', checked : false},
            {interest: '寫程式', checked : false},
            {interest: '玩桌遊', checked : false},
        ],
        // 居住地清單
        area : [
            '預設','臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'
        ],
        // 職業清單
        jobs : ['預設','軍警','公務人員','教育人員','工商服務','農業','其他'],
        // 學歷清單
        educations : ['預設','博士','碩士','大學','高中職','國中以下'],
    },
    components: {
        interests: {
            props: ['the-text','checked'],
            template:
            `
            <span class="check_list">
                <input type="checkbox" :id="theText" :checked="checked">
                <h4 class="interest int_title">{{theText}}</h4>
            </span>
            `,
        }
    },
    methods: {
        conditionQuery(){
            memberCardMove('down');
            moonGodBack.play();
            $('.msgBoxContent').toggleClass('-on');
            $('.msgBox').addClass('-on');
            $('.queryBox').removeClass('-on');
            // $('.msgBox-container').css({
            //     alignItem
            // });

        },
        defaultQuery(){
            $('select option:first-child').removeAttr('selected').attr('selected', 'selected');
        },
        msgBoxClose(){
            $('.queryBox').removeClass('-on');
            $('.msgBox').removeClass('-on');
        },

    },
});


var moonGod = new TimelineMax();
var moonGodBack = new TimelineMax();

moonGod.to('.loveGod', .1,{
    scale: .85,
}).to('.moonMatch-body', .01,{
    backgroundColor: '#EEBBB4',
}).to('.exclamation', .5,{
    opacity: 1,
}).to('.exclamation', .05,{
    opacity: 0,
}).call(
    msgBoxOpen,
).to('.loveGod', 1.8,{
    // scale: 3,
    y: 150,
    right: '50%',
    transform: 'translateX(50%) scale(3)',
});
moonGod.stop();

moonGodBack.call(
    msgBoxOpen,
).to('.loveGod', 1,{
    y: 0,
    right: 0,
    transform: 'translateX(0) scale(1)',
}).to('.moonMatch-body', .01,{
    backgroundColor: '#F0DED1',
});
moonGodBack.stop();


$(document).ready(function(){

    // 月老首次動畫
    setTimeout(() => {
        moonGod.restart();
    }, 1000);

    // 牌卡首次動畫
    setTimeout(() => {
        memberCardMove('up');
    }, 1800);

    // 篩選器首次動畫
    setTimeout(() => {
        $('.queryBox').toggleClass('-on');
    }, 2500);


    // 翻牌
    $('.card').on('click', function(){
        $(this).toggleClass('flipped');

        $('.moonMatch-body').css({
            backgroundColor: '#EEBBB4',
        });

        $(this).parent('.scene').css({
            zIndex: '10',
        });

    });

    // 展開篩選條件
    $('.btnRed_query').on('click', function(){
        $('.queryBox').toggleClass('-on').css({

        });
        // $('.msgBoxContent').toggleClass('-on');
    });

    // 重選
    $('.btnBlue_choose').on('click', function(e){
        // console.log(e);
        e.stopPropagation();

        $('.moonMatch-body').css({
            backgroundColor: '#F0DED1',
        });

        console.log($(this));
        // $(this).parent('.card').css({
        //     transform: 'scale(1) rotateY(0) translateY(0)',
        // });
        $(this).parents('.card').toggleClass('flipped');
    });


});

function msgBoxOpen(){
    $('.msgBox-container').addClass('-on');
    // $('.queryBox').toggleClass('-on');
};

function memberCardMove(direction,e){
    if(direction == 'up'){
        // alert($(window).outerWidth());
        TweenMax.to('.memberCards', 1, {
            y: -320,
            scale: .7
        });
    }else if (direction == 'down'){
        TweenMax.to('.memberCards', 1, {
            y: 0,
            scale: 1
        });
    }
    
}



