var member = new Vue ({
    el : '#member',
    data : {
        // 信箱檢查
        email_check: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        // 送出驗證信按鈕文字
        send_email : '送出驗證信',
        // 會員中心頁籤
        lists : [
            {list: '個人資料', href : "./MyInfo.html"},
            {list: '我的吉祥物', href : "./MyMascot.html"},
            {list : '留言板', href : "./MyMsg.html"},
            {list : '我的訂單', href : "./MyOrder.html"}
        ],
        // 會員頭像
        profile : "./images/MyInfo/profile.png",
        // 吉祥物
        mascot : '',
        // 有無吉祥物(預設關閉)
        hasMascot : false,
        // 會員名稱
        username : '',
        // 會員信箱
        email : '',
        // 送出信箱
        checked_mail : '',
        // 驗證碼
        check_ver : '',
        // 驗證結果(true是信箱已驗證)
        result : true,
        // 密碼placeholder
        mcusp : '8個字元，包含大小寫',
        // 密碼
        pwd : '',
        // 重新輸入密碼
        repwd : '',
        // 密碼修改狀態(true為正常)
        oldpwd : true,
        // 密碼檢查
        pwd_check : /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,
        // 密碼錯誤
        pwd_error : false,
        // 會員等級
        memberType : '',
        // 暱稱
        nickname : '',
        // 關於我
        about : '',
        // 我的興趣
        interest : '',
        // 興趣清單
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
        // 年齡區間
        ageRange: '',
        // 年齡清單
        ages : [],
        // 我的居住地
        city : '新竹縣',
        // 居住地清單
        area : [
            '臺北市','新北市','桃園市','臺中市','臺南市','高雄市','新竹縣','苗栗縣','彰化縣','南投縣','雲林縣','嘉義縣','屏東縣','宜蘭縣','花蓮縣','臺東縣','澎湖縣','金門縣','連江縣','基隆市','新竹市','嘉義市'
        ],
        // 職業
        job : '',
        // 職業清單
        jobs : ['軍警','公務人員','教育人員','工商服務','農業','其他'],
        // 職稱
        work : '',
        // 學歷
        education : '',
        // 學歷清單
        educations : ['博士','碩士','大學','高中職','國中以下'],
        // 學校
        school : '',
        // 性別
        sex : '',
        // 性別清單
        sexs : [
            {sex : '男性', checked : false},
            {sex : '女性', checked : false}
        ],
        // 性向
        seo : '',
        // 性向清單
        seos : [
            {seo : '男性', checked : false},
            {seo : '女性', checked : false}
        ],
        // 接受月老配對
        match : '',
        // 月老配對清單
        matchs : [
            {title : '是', checked : false},
            {title : '否', checked : false},
        ],
        // 公開資訊
        pri : '',
        // 公開資訊清單
        pris : [
            {title : '是', checked : false},
            {title : '否', checked : false},
        ],
        // 修改資料(true為修改中狀態)
        modify : false,
        // 修改信箱
        changeEmail : false,
        // 註冊驗證碼錯誤
        siVer : 0,
        // 驗證碼placeholder
        ver: '',
    },

    methods: {
 
        changeInfo () { //修改資料
            this.modify = true;
            this.checkinputnull();
            this.IntToCheckbox();
            this.DataToCheckbox();
        },

        checkinputnull () { //如果資料為未填寫
            if (this.nickname == '還沒填寫哦') {
                this.nickname = '';
            }
            if (this.about == '還沒填寫哦') {
                this.about = '';
            }
            if (this.work == '還沒填寫哦') {
                this.work = '';
            }
            if (this.school == '還沒填寫哦') {
                this.school = '';
            }
        },

        IntToCheckbox () { //我的興趣到checkbox
            IntArr = this.interest.split("|").map((item)=>item.trim());
            for (i = 0; i <= this.interests.length -1; i++) {
                for(j = 0; j <= IntArr.length -1 ; j++) {
                    if (this.interests[i].interest == IntArr[j]) {
                        this.interests[i].checked = true;
                    }
                }
            }           
        },

        DataToCheckbox() { //資料到checkbox(興趣以外)
            for (i = 0 ; i <= 1 ; i++) {
                if (this.sex == this.sexs[i].sex) {
                    this.sexs[i].checked = true
                }
                if (this.seo == this.seos[i].seo) {
                    this.seos[i].checked = true
                }
                if (this.match == this.matchs[i].title) {
                    this.matchs[i].checked = true
                }
                if (this.pri == this.pris[i].title) {
                    this.pris[i].checked = true
                }
            }
        },

        submitInfo () { //修改完成
            if (this.result == false) {
                alert("信箱驗證作業還沒完成哦 !")
            }else if (this.pwd_checking()) {
                this.getMemberType (); //取得會員等級
                this.modifyR (); //提交axios個人資料表單
                this.modifyInt (); //提交興趣表單
                this.modify = false; //關閉修改頁面
                this.changeEmail = false; //關閉email修改介面
            }else{
                alert("密碼錯誤 !")
            }
        },

        pwd_checking () {
            if (this.oldpwd == true) {
                return true
            }else if (this.pwd == this.pwd.match(this.pwd_check) && this.pwd == this.repwd){
                this.encrypt(this.pwd);
                return true
            }else{
                if (this.pwd != this.pwd.match(this.pwd_check)){
                    this.pwd_error = true;
                    this.pwd = '';
                    this.repwd = '';
                }
                if (this.pwd != this.repwd) {
                    this.pwd_error = true;
                    this.mcusp = '請填寫相同密碼 !';
                    this.pwd = '';
                    this.repwd = '';
                }
            }
        },

        encrypt (pwd) {  //密碼加密
            // alert("進入");
            this.oldpwd = pwd;
            hash = CryptoJS.MD5(pwd);
            this.pwd = hash;
            // alert(this.pwd); //測試加密
        },

        modifyR () {
            let data = new FormData(); //建立資料表單
            data.append('password', this.password);
            data.append('email', this.email);
            data.append('password', this.pwd);
            data.append('memberType', this.memberType);
            data.append('nickname', this.nickname);
            data.append('about', this.about);
            data.append('newage', this.ageToInt ());
            data.append('ageRange', this.getAgeRange ());
            data.append('area', this.city);
            data.append('job', this.job);
            data.append('work', this.work);
            data.append('education', this.education);
            data.append('school', this.school);
            data.append('sex', this.sex);
            data.append('seo', this.seo);
            data.append('match', this.truefalse(this.match));
            data.append('pri', this.truefalse(this.pri));


            let config = {
                header : {
                 'Content-Type' : 'multipart/form-data'
               }
            }
            
            

            axios.post('./php/modifyR.php', data, config).then(function (response) {
                data = response.data;
                // console.log(response);
                // console.log(data);
            }).finally(() => {  
                member.$options.methods.getdata (); //重新讀取資料
             });
        },

        modifyInt () {
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
            
            

            axios.post('./php/createInterstR.php', data, config).then(function (response) {
                data = response.data;
                // console.log(response);
                // console.log(data);
            }).finally(() => {  
                member.$options.methods.getIntdata (); //重新讀取資料
             });
        },

        truefalse (data) {
            if (data == "是") {
                return 1
            }else{
                return 0
            }
        },

        ageToInt () { //將年齡轉換成數字
            newage = this.myage.replace(/\D/g, "");
            return parseInt(newage)
        },

        getAgeRange () { //設定年齡區間
            age = this.myage.replace(/\D/g, "");
            age = parseInt(age);
            if (age < 20) {
                return 0
            }else if (age <= 25) {
                return 1
            }else if (age <= 30) {
                return 2;
            }else if (age <= 35) {
                return 3;
            }else if (age <= 40) {
                return 4;
            }else if (age <= 55) {
                return 5;
            }else if (age < 59) {
                return 6;
            }else if (age >= 60) {
                return 7;
            }
        },

        getMemberType () {
            if (this.nickname != '' && this.about != '' && this.interest != '' && this.myage != '' && this.city != '' && this.job != '' && this.work != '' && this.education != '' && this.sex != '' && this.seo != '') {
                this.memberType = 1;
            }else{
                this.memberType = 0;
            }
        },

        checkInt(name) { //勾選興趣checkbox
            for (i = 0 ; i <= this.interests.length -1; i++) {
                if (this.interests[i].interest == name && document.getElementById(name).checked == true) {
                    this.interests[i].checked = true
                }else if (this.interests[i].interest == name && document.getElementById(name).checked == false) {
                    this.interests[i].checked = false
                }
            }
        },

        checktrue(name,type) { //勾選checkbox設定 (除了興趣以外的)
            for (i = 0 ; i <= 1; i++) {
                if (name != this.sexs[i].sex && type == 'sex') {
                    this.sexs[i].checked = false;
                    this.sex = name;
                    document.account.sex[i].checked = false;
                }else if (name != this.seos[i].seo && type == 'seo') {
                    this.seos[i].checked = false;
                    this.seo = name;
                    document.account.seo[i].checked = false;
                }else if(name != this.matchs[i].title && type == 'match') {
                    this.matchs[i].checked = false;
                    this.match = name;
                    document.account.match[i].checked = false;
                }else if(name != this.pris[i].title && type == 'pri') {
                    this.pris[i].checked = false;
                    this.pri = name;
                    document.account.pri[i].checked = false;
                }
            } 
        },

        changepwd () { //修改密碼
            this.oldpwd = false;
        },

        modifyPwd () {
            this.oldpwd = false;
        },

        modifyEmail () { //修改email
            this.changeEmail = true;
        },

        SetVerNum () { //產生驗證碼
            VerNum = Math.floor((Math.random() * 9999) + 1000)
            return VerNum        
        },

        submit_ver (email) { //發送驗證碼

            verNum = this.SetVerNum (); //產生驗證碼
            username = this.username;

            if (username == '') {
                username = '會員'
            }
            
            this.result = false; //驗證狀態為未完成

            if (email == email.match(this.email_check)) {

                this.send_email = '寄信中...', //Btn文字改變
                sending = Email.send({
                    SecureToken: "6cfb2e6b-0043-4a24-bda1-f2394625002e",
                    To : email,
                    From : "緣弧<tibamemoonlover@gmail.com>",
                    Subject : "緣弧 MoonLover驗證信",
                    Body : 
                    `
                    <article style="display: flex; justify-content: center;margin: auto; background-color: #FF7A7A; width: 50%; height: 400px">
                        <div style="margin: auto; background-color:#fff8ce; border: 8px solid #ac5454; width: 95%; height: 95%">
                            <img src="https://i.imgur.com/EdXGYsW.png">
                            <h2 style="text-align: center;">親愛的${username}您好</h2>
                            <br>
                            <h3 style="text-align: center;">您正在更新緣弧Moon Lover會員，您的驗證碼是：${verNum}。</h3>
                            <br>
                            <h5 style="text-align: center; color: #805E3E; margin-top: 50px">© 2020 緣弧 Moon Lover</h5>
                        </div>
                    </article>
                    `
                })
                .then(
                    message => 
                    alert("驗證信已寄出 \n 請確認信箱哦 !"), //傳送成功
                    this.checked_mail = email
                );

                sending.then(function() {
                    member.$data.send_email = '送出驗證信'; //Btn文字改變
                });

            }else{
                alert("請填寫信箱有效的信箱 !")
            }

        },

        ver_check () { // 驗證碼比對

            if (this.checked_mail == '') {
                alert("信箱還沒驗證哦 !")
            }else{
    
                if (this.check_ver == verNum) {
                    this.result = true,
                    alert("驗證成功 !")
                  }else{
                    this.result = false,
                    alert("驗證碼錯誤 !")
                }
            }
    
        },

        getdata () { //取得會員資料
            axios.post('./php/membercenterR.php').then(function (response) {
                data = response.data;
                // console.log(data[0].SCHOOL);
                member.$data.username = data[0].USERNAME;
                member.$data.email = data[0].EMAIL;
                member.$data.pwd = data[0].PASSWORD;
                member.$data.nickname = checknull (data[0].NICKNAME);
                member.$data.about = checknull (data[0].ABOUT);
                member.$data.myage = checkage (data[0].AGE);
                member.$data.city = checknull (data[0].AREA);
                member.$data.job = checknull (data[0].JOB);
                member.$data.work = checknull (data[0].JOB_DETAIL);
                member.$data.education = checknull (data[0].EDUCATION);
                member.$data.school = checknull (data[0].SCHOOL);
                member.$data.sex = checknull (data[0].SEX);
                member.$data.seo = checknull (data[0].SO);
                member.$data.match = checkpriv (data[0].PAIR_PRIV);
                member.$data.pri = checkpriv (data[0].PUBLIC_PRIV);

                function checknull (data) { //如果資料為空
                    if (data == null || data == '') {
                        return '還沒填寫哦'
                    }else{
                        return data
                    }
                }

                function checkage (data) {
                    if (data == null || data == '') {
                        return '還沒填寫哦'
                    }else{
                        return data + '歲'
                    }
                }
                
                function checkpriv (data) { //判斷是或否
                    if (data == 0) {
                        return '否'
                    }else{
                        return '是'
                    }
                }

            })                
        },

        getIntdata () { //取得會員興趣
            axios.post('./php/selectInterestR.php').then(function (response) {
                interests = response.data;
                // console.log(interests);
                interest = [];
                for (i = 0; i <= interests.length -1; i++) {
                    choose = interests[i].name
                    interest.push(` ${choose} `)
                }
                member.$data.interest = interest.join("|")
                if (member.$data.interest == '') {
                    member.$data.interest = '還沒填寫哦'
                }
            })                
        },

        getImage (){ //取得會員頭像
            axios.post('./php/selectImageR.php').then( response => {
                data = response.data;
                // console.log(response);
                // console.log(data);
                if (data != '') {
                    this.profile = data;
                    // console.log(this.profile);
                }
            });
        },

        getMascot () { //取得吉祥物
            axios.post('./php/selectMascotR.php').then( response => {
                data = response.data;
                console.log(response);
                console.log(data);
                if (data != '') {
                    this.mascot = `./images/member/macot/${data}`;
                    this.hasMascot = true;
                    // console.log(this.mascot);
                }
            });
        }


    },
    
    computed: {
    },

    components : {
        // 興趣組件 
        interests : {
            props : ['the-text','checked'],
            template : 
            `
            <span class="check_list">
                <label class="checkbox">
                    <input type="checkbox" class="checkbox" :id="theText" :value="theText" :checked="checked">
                        <span class="checkbox__control">
                        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                            <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                        </span>
                    <h4 class="interest int_title">{{theText}}</h4>
                </label>
            </span>
            `,
        },
        // 性別組件
        sexs : {
            props : ['the-text','checked'],
            template : 
            `
            <span class="check_list">                                
                <label class="checkbox">
                    <input type="checkbox" class="checkbox" :id="theText" :value="theText" :checked="checked" name="sex">
                    <span class="checkbox__control">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                    </span>
                    <h4 class="int_title">{{theText}}</h4>
                </label>
            </span>
            `,
        },
        // 性向組件
        seo : {
            props : ['the-text','checked'],
            template : 
            `
            <span class="check_list">                              
                <label class="checkbox">
                    <input type="checkbox" class="checkbox" :id="theText" :value="theText" :checked="checked" name="seo">
                    <span class="checkbox__control">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                    </span>
                    <h4 class="int_title">{{theText}}</h4>
                </label>
            </span>
            `,
        },
        // 配對組件
        match : {
            props : ['the-text','checked'],
            template : 
            `
            <span class="check_list">                
                <label class="checkbox">
                    <input type="checkbox" class="checkbox" :id="theText" :value="theText" :checked="checked" name="match">
                    <span class="checkbox__control">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                    </span>
                    <h4 class="int_title">{{theText}}</h4>
                </label>
            </span>
            `,
        },
        // 公開資訊組件
        pri : {
            props : ['the-text','checked'],
            template : 
            `
            <span class="check_list">    
                <label class="checkbox">
                    <input type="checkbox" class="checkbox" :id="theText" :value="theText" :checked="checked" name="pri">
                    <span class="checkbox__control">
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' aria-hidden="true" focusable="false">
                        <path fill='none' stroke='currentColor' stroke-width='3' d='M1.73 12.91l6.37 6.37L22.79 4.59' /></svg>
                    </span>
                    <h4 class="int_title">{{theText}}</h4>
                </label>
            </span>
            `,
        }
    },
    
    mounted() {

        this.getdata();

        this.getIntdata ();

        this.getImage ();

        this.getMascot ();

        for (j = 0 ; j <= 100; j++) { //製造年齡option
            this.ages.push(j + "歲");
        }

        for (i = 0 ; i <= this.lists.length -1; i++) {
            //取得頁面title名字來綁定會員頁籤class
            if (this.lists[i].list == document.title) {
                $('.listName').eq(i).addClass( "bold" );
            }
        }

        // 以下是裁減圖片
        (function($) {
            var width_crop = 150, // 圖片裁切寬度 px 值
            height_crop = 150, // 圖片裁切高度 px 值
            type_crop = "circle", // 裁切形狀: square 為方形, circle 為圓形
            width_preview = 150, // 預覽區塊寬度 px 值
            height_preview = 150, // 預覽區塊高度 px 值
            compress_ratio = 0.85, // 圖片壓縮比例 0~1
            type_img = "png", // 圖檔格式 jpeg png webp
            oldImg = new Image(),
            myCrop, file, oldImgDataUrl;
            
        
            
            function readFile(input) {
            if (input.files && input.files[0]){
            file = input.files[0];
            } else {
            alert("瀏覽器不支援此功能！建議使用最新版本 Chrome");
            return;
            }
            
            if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
        
            $('#newImg').addClass("imgNone") //原始圖片消失
            $('.upload_btn').css("display", "none"); //上傳按鈕不見
            $('#crop_img').css("display", "inline-block"); //裁減圖片按鈕出現
            $(".img").attr('id', 'oldImg');  //給大頭貼裁減圖片的id
            $('.img').addClass('crop'); //新增crop畫面
        
            // 裁切初始參數設定
            myCrop = $("#oldImg").croppie({
                viewport: { // 裁切區塊
                width: width_crop,
                height: height_crop,
                type: type_crop
                },
                boundary: { // 預覽區塊
                width: width_preview,
                height: height_preview
                },
                });
        
            reader.onload = function(e) {
            oldImgDataUrl = e.target.result;
            oldImg.src = oldImgDataUrl; // 載入 oldImg 取得圖片資訊
            myCrop.croppie("bind", {
            url: oldImgDataUrl
            });
            };
            
            reader.readAsDataURL(file);
            } else {
            alert("您上傳的不是圖檔！");
            }
            }
            
            function displayCropImg(src) {
            var html = `<img src= " ${src} " id="newImg" " />`;
            $(".img").html(html);
            }
            
            $("#upload_img").on("change", function() {
            $("#oldImg").show();
            readFile(this);
            });
            
            oldImg.onload = function() {
            var width = 300,
            height = 300,
            fileSize = Math.round(file.size / 1000)
            };
            
            function displayNewImgInfo(src) {
            filesize = src.length * 0.75;
            }
            
            $("#crop_img").on("click", function(event) {
                event.preventDefault();
                myCrop.croppie("result", {
                type: "canvas",
                format: type_img,
                quality: compress_ratio
                }).then(function(src) {
                displayCropImg(src);
                displayNewImgInfo(src);
                axiosImg (src);
            });

            function axiosImg (src) { //axios上傳圖片
                // console.log(src);
                let data = new FormData(); //建立資料表單
                data.append('img', src);

                let config = {
                    header : {
                     'Content-Type' : 'multipart/form-data'
                   }
                }

                axios.post('./php/createImageR.php', data, config).then(function (response) {
                    data = response.data;
                    // console.log(response);
                    // console.log(data);
                });

            };
        
            $('.img').removeClass('crop'); //移除crop畫面
            $('#crop_img').css("display", "none"); //裁減圖片按鈕消失
            $('.upload_btn').css("display", "flex"); //上傳按鈕回來囉
            $('#oldImg').croppie('destroy');
            $(".img").removeAttr('id', 'oldImg');  //刪除圖片id
            $('#newImg').removeClass("imgNone") //原始圖片回復
            });
            })(jQuery);
            
    },
})