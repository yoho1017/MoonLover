let matchCond = new Vue({
    el: '#qBox',
    data: {
        memType: '',
        username : '',
        nickname: '',
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
        interest : '',
        interests : [
            {interest: '運動', checked : false},
            {interest: '看書', checked : false},
            {interest: '看電影', checked : false},
            {interest: '旅遊', checked : false},
            {interest: '寫程式', checked : false},
            {interest: '玩桌遊', checked : false},
        ],
        myage: '',
        ageRange: '',
        // ageRangeVal: 0,
        city : '',
        area : [
            '臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'
        ],
        job : '',
        jobs : ['軍警','公務人員','教育人員','工商服務','農業','其他'],
        education : '',
        educations : ['博士','碩士','大學','高中職','國中以下'],
        sex : '',
        seo : '',
        pair: '',
        qmmcID: '',
        qCity: '',
        qJob: '',
        qAgeRange: '',
        qEducation: '',
        qInterest: '',
        qInterests : [
            {interest: '運動', checked : false},
            {interest: '看書', checked : false},
            {interest: '看電影', checked : false},
            {interest: '旅遊', checked : false},
            {interest: '寫程式', checked : false},
            {interest: '玩桌遊', checked : false},
        ],
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
        checkInterest(name) { //勾選興趣checkbox
            for (i = 0 ; i <= this.interests.length -1; i++) {
                if (this.interests[i].interest == name && document.getElementById(name).checked == true) {
                    this.interests[i].checked = true
                }else if (this.interests[i].interest == name && document.getElementById(name).checked == false) {
                    this.interests[i].checked = false
                }
            }

            for (i = 0 ; i <= this.qInterests.length -1; i++) {
                if (this.qInterests[i].interest == name && document.getElementById(name).checked == true) {
                    this.qInterests[i].checked = true
                }else if (this.qInterests[i].interest == name && document.getElementById(name).checked == false) {
                    this.qInterests[i].checked = false
                }
            }
        },
        conditionQuery(){
            memberCardMove('down');
            // moonGodBack.play();
            $('.msgBoxContent').toggleClass('-on');
            $('.msgBox').addClass('-on');
            $('.queryBox').removeClass('-on');


            // 從html綁定到的值寫到篩選器
            this.qCity = this.city;
            this.qJob = this.job;
            this.qAgeRange = this.ageRange;
            this.qEducation = this.education;
            this.qInterests = this.interests;

            
            matchCard.$data.city = this.qCity;
            matchCard.$data.job = this.qJob;
            matchCard.$data.ageRange = this.qAgeRange;
            matchCard.$data.education = this.qEducation;
            matchCard.$data.interests = this.qInterests;

            matchCard.$data.sex = this.sex;
            matchCard.$data.seo = this.seo;

            this.setMatchMemberCondition(); // 更新篩選條件進資料庫
            this.setMatchMemberInterestCondition(); // 更新篩選條件進資料庫
            
            matchCard.getMatchMemberData(); // 呼叫後端篩選配對會員函數
        },
        getMatchMemberIntCondition(){
            let params = new URLSearchParams();
            params.append('qmmcMEMBER_ID', this.qmmcID);
            axios.post('./php/selectMatchIntCondition.php', params).then((res) => {
                let interests = res.data;
                // console.log(interests);
                interest = [];
                for (i = 0; i <= interests.length -1; i++) {
                    choose = interests[i].name;
                    interest.push(` ${choose} `);
                }
                this.qInterest = interest.join("|");

                let interestArr = this.qInterest.split('|').map((item)=>item.trim());

                for (i = 0; i <= this.qInterests.length -1; i++) {
                    for(j = 0; j <= interestArr.length -1 ; j++) {
                        if (this.qInterests[i].interest == interestArr[j]) {
                            this.qInterests[i].checked = true;
                        }
                    }
                } 
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        getMatchMemberCondition(){ 
            // 檢查是否建立過會員配對條件
            axios.post('./php/selectMatchCondition.php').then((res) => {
                let data = res.data;
                // console.log(data);
                if(data == ''){
                    alert('沒資料! 開始創建會員配對條件資料');
                    // 將自身條件寫入篩選條件與興趣資料庫
                    this.createMatchMemberCondition(); 
                    this.createMatchMemberInterestCondition();

                    // 將自身條件寫入篩選條件參數(vue data)
                    this.qCity = this.city;
                    this.qJob = this.job;
                    this.qAgeRange = this.ageRange;
                    this.qEducation = this.education;
                    this.qInterests = this.interests;
                }else{
                    // alert('有資料');
                    // 將資料帶入篩選條件參數
                    this.qCity = data[0].AREA_CONDITION;
                    this.qJob = data[0].JOB_CONDITION;
                    this.qAgeRange = data[0].AGE_RANGE;
                    this.qEducation = data[0].EDUCATION_CONDITION;
                    this.qmmcID = data[0].ID;
                    this.getMatchMemberIntCondition();

                    // 將資料寫進篩選器(頁面)的data
                    this.city = this.qCity;
                    this.job = this.qJob;
                    this.ageRange = this.qAgeRange;
                    this.education = this.qEducation;
                    this.interests = this.qInterests;
                }
                // alert('檢查完畢');
                // 將篩選條件參數帶入下一個matchCard，作爲php的select條件參數
                matchCard.$data.interest = this.qInterest;
                matchCard.$data.interests = this.qInterests;
                matchCard.$data.city = this.qCity;
                matchCard.$data.job = this.qJob;
                matchCard.$data.ageRange = this.qAgeRange;
                matchCard.$data.education = this.qEducation;

                matchCard.$data.sex = this.sex;
                matchCard.$data.seo = this.seo;
                
            }).catch(() => { 
                console.log("錯誤 !") 
            }).finally(() => {
                matchCard.getMatchMemberData(); // 呼叫後端篩選配對會員函數
            });

        },
        setMatchMemberCondition(){
            let params = new URLSearchParams();
            params.append('ageRange', this.ageRange);
            params.append('city', this.city);
            params.append('job', this.job);
            params.append('education', this.education);

            axios.post('./php/updateMatchCondition.php', params).then((res) => {
                let data = res.data;
                // console.log(data);
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        setMatchMemberInterestCondition(){
            let data = new FormData(); //建立資料表單
            data.append('sport', this.interests[0].checked);
            data.append('book', this.interests[1].checked);
            data.append('movie', this.interests[2].checked);
            data.append('travel', this.interests[3].checked);
            data.append('codeing', this.interests[4].checked);
            data.append('boardgame', this.interests[5].checked);

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }
            axios.post('./php/updateMatchMemInterstR.php', data, config).then(function (response) {
                data = response.data;
                // console.log(data);
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        createMatchMemberCondition(){
            let params = new URLSearchParams();
            params.append('ageRange', this.ageRange);
            params.append('city', this.city);
            params.append('job', this.job);
            params.append('education', this.education);

            axios.post('./php/insertMatchCondition.php', params).then((res) => {
                let data = res.data;
                // console.log(data);
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        createMatchMemberInterestCondition(){
            let data = new FormData(); //建立資料表單
            data.append('sport', this.interests[0].checked);
            data.append('book', this.interests[1].checked);
            data.append('movie', this.interests[2].checked);
            data.append('travel', this.interests[3].checked);
            data.append('codeing', this.interests[4].checked);
            data.append('boardgame', this.interests[5].checked);

            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }
            axios.post('./php/insertMatchMemInterstR.php', data, config).then(function (response) {
                data = response.data;
                // console.log(data);
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        getdata () { //取得會員資料
            axios.post('./php/membercenterR.php').then((res) => {
                let data = res.data;
                // console.log(data);

                if(data == ''){
                    alert('未登入');
                    window.location.href = './main.html';
                    

                }else{
                    this.memType = data[0].MEMBER_TYPE;
                    this.pair = data[0].PAIR_PRIV;
                    // 判斷會員等級是否為進階會員，
                    // 若非進階會員則直接跳轉到會員中心的個人資料頁面
                    if(this.memType != 1){
                        alert(`親愛的會員，請填寫完整的會員資料，月老才能幫您牽線喔！`);
                        window.location.href="./MyInfo.html";
                    }else if(this.pair != 1){
                        alert(`親愛的會員，請同意接受月老配對，月老才能幫您牽線喔！`);
                        window.location.href="./MyInfo.html";
                    }
                    this.nickname = data[0].NICKNAME;
                    this.username = data[0].USERNAME;
                    this.city = data[0].AREA;
                    this.job = data[0].JOB;
                    this.education = data[0].EDUCATION;
                    this.myage = data[0].AGE;
                    this.ageRange = data[0].AGE_RANGE;
                    this.sex = data[0].SEX;
                    this.seo = data[0].SO;

                    this.getIntdata();
                }
                
            }).catch(() => { 
                console.log("錯誤 !") 
            })                
        },
        getIntdata () { //取得會員興趣
            axios.post('./php/selectInterestR.php')
            .then((res) => {
                let interests = res.data;
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
            }).catch(() => { 
                console.log("錯誤 !") 
            }).finally(() => { 

                this.interestCheckbox();
                // 2. 檢查是否有建立過配對條件
                this.getMatchMemberCondition(); 
            });
        },
        interestCheckbox () { //我的興趣到checkbox
            // console.log(this.interest);
            let interestArr = this.interest.split('|').map((item)=>item.trim());
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
        // 1. 先取得該會員資料與興趣
        this.getdata();
        // this.getIntdata();
         
    },
});

let matchCard = new Vue({
    el: '#memCard',
    data: {
        mId: '',
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
        mCounter: 0,

    },
    methods: {
        getMatchMemberData () { //取得配對會員資料
            let params = new URLSearchParams();
            params.append('ageRange', this.ageRange);
            params.append('city', this.city);
            params.append('job', this.job);
            params.append('education', this.education);
            params.append('sex', this.sex);
            params.append('seo', this.seo);

            setTimeout(() => {
                // 興趣處理
                // 待修改，會有SQL injection的疑慮
                let intCond = [];
                for (let i = 0 ; i <= this.interests.length -1; i++) {
                    if(this.interests[i].checked == true){
                        intCond.push(`(myInt.mINTEREST_ID = ${i+1} and myInt.mINTEREST_STATUS = 1)`);
                    }
                    // console.log(this.interests[i].checked);
                }
                // console.log(intCond);
                let intCondToSql = intCond.join(' or ');
                params.append('intCondToSql', intCondToSql);
                
                // debug用，印出params
                // for (let p of params) {
                //     console.log(p);
                // }       
                axios.post('./php/matchMemberR.php', params).then((res) => {
                    let data = res.data;
                    // console.log(res);
                    // console.log(data);
                    if(data != ''){
                        // alert('有篩到');
                        this.mId = data[0].mMEMBER_ID;
                        if(data[0].IMAGE != null){
                            this.profile = './images/member/profile/' + data[0].IMAGE;
                        }else{
                            this.profile = './images/MyInfo/profile.png'; // 會員沒有頭像
                        }
                        this.nickname = data[0].NICKNAME;
                        this.about = data[0].ABOUT;
                        this.city = data[0].AREA;
                        this.job = data[0].JOB;
                        this.age = data[0].AGE;

                        // 呼叫處理興趣的函數
                        this.getMatchMemberInterest();

                    }else{
                        // console.log('沒篩到');
                        this.profile = './images/MyMsg/person_special.jpg';
                        this.nickname = '賓哥';
                        this.about = '沒篩到！再觀察看看！';
                        this.city = '提拔市';
                        this.job = '前端講師';
                        this.age = '不要問';
                        this.interest ='觀察HTML';
                    }
                }).catch(() => { 
                    console.log("錯誤 !") 
                });                
            }, 100);

            
        },
        getMatchMemberInterest(){
            // 清空興趣
            this.interest ='';

            let params = new URLSearchParams();
            params.append('mId', this.mId);

            axios.post('./php/matchMemberInterestR.php', params).then((res) => {
                data = res.data;
                for(let i=0; i<= data.length-1; i++){
                    this.interest += `${data[i].name} `;
                }
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        toMsg(){
            let params = new URLSearchParams();
            params.append('mId', this.mId);
            axios.post('./php/createRelationship.php', params).then((res) => {
                let data = res.data;
                // console.log(data);

                if(data == 'success' && this.nickname != '賓哥'){
                    // 配對完畢，重新導向留言板頁面
                    window.location.href='./MyMsg.html';
                }else{
                    // console.log('重複配對');
                }

                
            }).catch(() => { 
                console.log("錯誤 !") 
            });
        },
        matchCounter(counter){
            // alert();
            let params = new URLSearchParams();
            params.append('counter', counter);

            axios.post('./php/matchCounter.php', params).then((res) => {
                this.mCounter = res.data;
                // console.log(this.mCounter);
            }).catch(() => { 
                console.log("錯誤 !") 
            });
            this.$forceUpdate();
        },
    },
    components:{
        card: {
            props: ['nickname', 'city', 'job', 'profile','about', 'age', 'interest'],
            template: 
            `
            <div class="scene">
                <div class="card card2">
                    <div class="card_front"><img src="./images/moonMatch/memberCard.png"></div>
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
                                <h4>{{interest}}</h4>
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
                                <button class="btnBlue_choose reselect"><h3>重選</h3></button>
                                <a href="#" class="btnRed_choose toMsg" ><h3>私訊</h3></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            `,
        },
    },
    mounted() {
        this.mCounter = this.matchCounter('get');
        if(this.mCounter >= 3){
            alert('已經三次囉！明天再試試吧！');
            window.location.href = './main.html';
        }

        // 翻牌
        $('.card_front').on('click', function(){

            if(matchCard.$data.mCounter >= 3){
                alert('已經三次囉！明天再試試吧！');
                $('.card_front').css({pointerEvents: 'none',});
                window.location.href = './main.html';
                return;
            }else if (matchCard.$data.nickname != '賓哥'){ 
                // 有選到人才增加counter次數
                matchCard.matchCounter('add');
            }



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
        });

        // 重選
        $('.reselect').on('click', function(e){
            e.stopPropagation();
    
            $('.moonMatch-body').css({
                backgroundColor: '#F0DED1',
            });
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

        // 私訊
        $('.toMsg').on('click', function(e){
            e.stopPropagation();
            matchCard.toMsg();
        });
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
});

function msgBoxOpen(){
    $('.msgBox-container').addClass('-on');
    // $('.queryBox').toggleClass('-on');
};

function memberCardMove(direction){
    if(direction == 'up'){
        TweenMax.to('.memberCards', 1, {
            // y: '-30%',
            y: -130,
            scale: .7
        });
    }else if (direction == 'down'){
        TweenMax.to('.memberCards', 1, {
            y: '0',
            scale: 1
        });
    }
    
}



