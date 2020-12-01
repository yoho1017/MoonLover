let moonMatchVue = new Vue({
    el: '#qBox',
    data: {
        ageRange: ['20歲以下', '21 - 30歲', '31 - 40歲', '41 - 50歲', '51 - 60歲', '61歲以上'],
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
            '臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'
        ],
        // 職業清單
        jobs : ['軍警','公務人員','教育人員','工商服務','農業','其他'],
        // 學歷清單
        educations : ['博士','碩士','大學','高中職','國中以下'],
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
            // moonGodBack.play();
            $('.msgBoxContent').toggleClass('-on');
            $('.msgBox').addClass('-on');
            $('.queryBox').removeClass('-on');

        },
        // 預設篩選
        defaultQuery(){
            $('select option:first-child').removeAttr('selected').attr('selected', 'selected');
        },
    },
});





let zIdx = 10;

var moonGod = new TimelineMax();
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

var moonGodBack = new TimelineMax();
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

var backCloudM1 = new TimelineMax({ repeat : -1, yoyo: true });
backCloudM1.fromTo(['.backCloud1'],3,{
    scale:1.5,
    ease:Power0.easeNone,
    opacity: .4
},{
    scale:1,
    ease:Power0.easeNone,
    opacity: .8
});

var backCloudM2 = new TimelineMax({ repeat : -1, yoyo: true });
backCloudM1.fromTo(['.backCloud2'],2.5,{
    scale:1,
    ease:Power0.easeNone,
    opacity: .6
},{
    scale:1.6,
    ease:Power0.easeNone,
    opacity: .3
});


$(document).ready(function(){

    // 月老首次動畫
    setTimeout(() => {
        // moonGod.restart();
    }, 1000);

    // 牌卡首次動畫
    setTimeout(() => {
        // memberCardMove('up');
    }, 1800);

    // 篩選器首次動畫
    setTimeout(() => {
        // $('.queryBox').toggleClass('-on');
    }, 2500);


    // 翻牌
    $('.card_front').on('click', function(){
        $(this).parent('.card').toggleClass('flipped');

        $('.moonMatch-body').css({
            backgroundColor: '#EEBBB4',
        });
        $(this).parents('.scene').css({
            zIndex: `${zIdx++}`,
        });

        $('.msgBox-container').toggleClass('-on');

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

        $('.msgBox-container').toggleClass('-on');
    });


});

function msgBoxOpen(){
    $('.msgBox-container').addClass('-on');
    // $('.queryBox').toggleClass('-on');
};

function memberCardMove(direction){
    if(direction == 'up'){
        console.log($(window).width());
        // if($(window).width() >= 1366)
        console.log('up');
        TweenMax.to('.memberCards', 1, {
            // y: '-30%',
            y: -130,
            scale: .7
        });
    }else if (direction == 'down'){
        console.log('down');
        TweenMax.to('.memberCards', 1, {
            y: '0',
            scale: 1
        });
    }
    
}



