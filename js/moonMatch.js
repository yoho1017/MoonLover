let matchCond = new Vue({
    el: '#qBox',
    data: {
        // 會員名稱
        username : '',
        ages: [
            {range: '20歲以下', value: 0},
            {range: '21 - 25歲', value: 1},
            {range: '26 - 30歲', value: 2},
            {range: '31 - 35歲', value: 3},
            {range: '36 - 40歲', value: 4},
            {range: '41 - 45歲', value: 5},
            {range: '46 - 50歲', value: 6},
            {range: '51 - 55歲', value: 7},
            {range: '56 - 60歲', value: 8},
            {range: '61歲以上', value: 9},
        ],
        // 我的興趣
        interest : '',
        interests : [
            {interest: '運動', checked : false},
            {interest: '看書', checked : false},
            {interest: '看電影', checked : false},
            {interest: '旅遊', checked : false},
            {interest: '寫程式', checked : false},
            {interest: '玩桌遊', checked : false},
        ],
        // 我的年齡
        myage: '',
        // 我的年齡區間
        ageRange: '',
        // 區間值
        ageRangeVal: 0,
        // 我的居住地
        city : '',
        // 居住地清單
        area : [
            '臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'
        ],
        // 職業
        job : '',
        // 職業清單
        jobs : ['軍警','公務人員','教育人員','工商服務','農業','其他'],
        // 學歷
        education : '',
        // 學歷清單
        educations : ['博士','碩士','大學','高中職','國中以下'],
        // 性別
        sex : '',
        // 性向
        seo : '',
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


            matchCard.$data.city = this.city;
            matchCard.$data.job = this.job;
            matchCard.$data.ageRange = this.ageRange;
            matchCard.$data.education = this.education;
            matchCard.$data.interests = this.interests;
            matchCard.$data.sex = this.sex;
            matchCard.$data.seo = this.seo;

            matchCard.getMatchMemberData();
        },
        checkInterest(name) { //勾選興趣checkbox
            for (i = 0 ; i <= this.interests.length -1; i++) {
                if (this.interests[i].interest == name && document.getElementById(name).checked == true) {
                    this.interests[i].checked = true
                }else if (this.interests[i].interest == name && document.getElementById(name).checked == false) {
                    this.interests[i].checked = false
                }
            }
        },
        getdata () { //取得會員資料
            axios.post('./php/membercenterR.php').then((res) => {
                data = res.data;
                // console.log(data);
                this.username = data[0].USERNAME;
                this.city = data[0].AREA;
                this.job = data[0].JOB;
                this.education = data[0].EDUCATION;
                this.myage = data[0].AGE;
                this.ageRange = data[0].AGE_RANGE;
                this.sex = data[0].SEX;
                this.seo = data[0].SO;
                // matchCond.$data.match = checkpriv (data[0].PAIR_PRIV);
                // matchCond.$data.pri = checkpriv (data[0].PUBLIC_PRIV);
                
                // function checkpriv (data) { //判斷是或否
                //     if (data == 0) {
                //         return '否'
                //     }else{
                //         return '是'
                //     }
                // }

            })                
        },
        getIntdata () { //取得會員興趣
            axios.post('./php/selectInterestR.php')
            .then((res) => {
                interests = res.data;
                // console.log(interests);
                interest = [];
                for (i = 0; i <= interests.length -1; i++) {
                    choose = interests[i].name;
                    interest.push(` ${choose} `);
                }
                this.interest = interest.join("|")
                if (this.interest == '') {
                    this.interest = '還沒填寫哦';
                }
            })
            .finally(() => { this.interestCheckbox() });
        },
        interestCheckbox () { //我的興趣到checkbox
            // console.log(this.interest);
            interestArr = this.interest.split('|').map((item)=>item.trim());
            // console.log(interestArr);
            for (i = 0; i <= this.interests.length -1; i++) {
                for(j = 0; j <= interestArr.length -1 ; j++) {
                    if (this.interests[i].interest == interestArr[j]) {
                        this.interests[i].checked = true;
                    }
                }
            } 
        },
    },
    mounted() {
        this.getdata();
        this.getIntdata(); 
    },
});

let matchCard = new Vue({
    el: '#memCard',
    data: {
        // 會員頭像
        profile : '',
        nickname: '',
        about: '',
        age: '',
        ageRange: '',
        interest: '',
        interests : [
            {interest: '運動', checked : false},
            {interest: '看書', checked : false},
            {interest: '看電影', checked : false},
            {interest: '旅遊', checked : false},
            {interest: '寫程式', checked : false},
            {interest: '玩桌遊', checked : false},
        ],
        city : '',
        job : '',
        education : '',
        sex : '',
        seo: '',
    },
    methods: {
        getMatchMemberData () { //取得配對會員資料
            // 興趣處理
            let intCond = [];
            for (i = 0 ; i <= this.interests.length -1; i++) {
                if(this.interests[i].checked == true){
                    intCond.push(`(myInt.mINTEREST_ID = ${i+1} and myInt.mINTEREST_STATUS = 1)`);
                }
            }
            let intCondToSql = intCond.join(' or ');
            console.log(intCondToSql);


            // 傳遞資料
            var params = new URLSearchParams();
            params.append('ageRange', this.ageRange);
            params.append('city', this.city);
            params.append('job', this.job);
            params.append('education', this.education);
            params.append('intCondToSql', intCondToSql);
            params.append('sex', this.sex);
            params.append('seo', this.seo);

            // debug用，印出params
            // for (let p of params) {
            //     console.log(p);
            // }

            axios.post('./php/matchMemberR.php', params).then((res) => {
                data = res.data;
                console.log(data);
                this.profile = atob(data[0].IMAGE);
                this.nickname = data[0].NICKNAME;
                this.about = data[0].ABOUT;
                this.city = data[0].AREA;
                this.job = data[0].JOB;
                this.age = data[0].AGE;
            })                
        },
    },
    components:{
        card: {
            props: ['nickname', 'city', 'job', 'profile','about', 'age'],
            template: 
            `
            <div class="scene">
                <div class="card card2">
                    <div class="card_front"><img src="./images/moonMatch/人物卡.png"></div>
                    <div class="card_back">
                        <div class="memberPic-container">
                            <img class="person_img" :src=profile>
                        </div>
                        <div class="memberProfile">
                            <div class="mRow username">
                                <h2>{{nickname}}</h2>
                            </div>
                            <div class="mRow introduction">
                                <h4>{{about}}</h4>
                            </div>
                            <div class="mRow">
                                <h3>年齡</h3>
                                <h4>{{age}}</h4>
                            </div>
                            <div class="mRow">
                                <h3>興趣</h3>
                                <h4>寫程式 ｜ 玩桌遊</h4>
                            </div>
                            <div class="mRow">
                                <h3>地區</h3>
                                <h4>{{city}}</h4>
                            </div>
                            <div class="mRow">
                                <h3>職業</h3>
                                <h4>{{job}}</h4>
                            </div>
                            <div class="btnGroup">
                                <button class="btnBlue_choose"><h3>重選</h3></button>
                                <a href="./MyMsg.html" class="btnRed_choose"><h3>私訊</h3></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            `,
        },
    },
    mounted() {
        
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

        $('.card_front').css({pointerEvents: 'none',});

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

        // console.log($(this));
        // $(this).parent('.card').css({
        //     transform: 'scale(1) rotateY(0) translateY(0)',
        // });
        $(this).parents('.card').toggleClass('flipped');

        $('.card_front').css({
            pointerEvents: 'auto',
        });

        $('.msgBox-container').toggleClass('-on');

        

        //重新到後端資料
        setTimeout(() => {
            matchCard.getMatchMemberData();
        }, 500);
    });


});

function msgBoxOpen(){
    $('.msgBox-container').addClass('-on');
    // $('.queryBox').toggleClass('-on');
};

function memberCardMove(direction){
    if(direction == 'up'){
        // console.log($(window).width());
        // if($(window).width() >= 1366)
        // console.log('up');
        TweenMax.to('.memberCards', 1, {
            // y: '-30%',
            y: -130,
            scale: .7
        });
    }else if (direction == 'down'){
        // console.log('down');
        TweenMax.to('.memberCards', 1, {
            y: '0',
            scale: 1
        });
    }
    
}



