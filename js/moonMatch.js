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

            moonGod.reverse();
            this.msgBoxClose();
        },
        defaultQuery(){
        },
        msgBoxClose(){
            $('.queryBox').removeClass('-on');
            $('.msgBox').removeClass('-on');
        },

    },
});


var moonGod = new TimelineMax();
var moonGodBack = new TimelineMax();
var memberCard = new TimelineMax();

memberCard.to('.card1', .5, {
    y: 20,
}).to('.card3', .5, {
    y: 20,
}).to('.card2', .5, {
    y: 20,
});
memberCard.stop();

moonGod.to('.loveGod', .1,{
    scale: .85,
}).to('.moonMatch-body', .01,{
    backgroundColor: '#EEBBB4',
// }).to('.exclamation', .5,{
//     opacity: 1,
// }).to('.exclamation', .05,{
//     opacity: 0,
}).to('.loveGod', 1.8,{
    scale: 3,
    y: 150,
}).call(
    msgBoxOpen,
);
moonGod.stop();


$(document).ready(function(){

    // 點擊，切換 flipped 樣式
    $("div.card").on('click', function(){
        $(this).toggleClass('flipped');
    });

    // 月老首次動畫
    setTimeout(() => {
        TweenMax.fromTo('.exclamation', 2, {
            opacity: 1,
        }, {
            opacity: 0,
        });

        moonGod.restart();
    }, 1500);

    // setTimeout(() => {
    //     TweenMax.fromTo('.exclamation', 1, {
    //         opacity: 1,
    //     }, {
    //         opacity: 0,
    //     });
    // }, 1500) ;

    setTimeout(() => {
        TweenMax.to('.memberCards', 1, {
            y: -240,
            // scale: .5
        });
    }, 2300);

});

function msgBoxOpen(){
    $('.msgBox-container').toggleClass('-on');
    $('.queryBox').toggleClass('-on');
};



