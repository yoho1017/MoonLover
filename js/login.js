var nav = new Vue ({
    el: '#nav',
    methods: {

        login () {
            // 點擊跳出登入燈箱
            account.$data.pop_block = true,
            account.$data.log_flex = true    
        }

    }
});

var account =  new Vue ({
    el: '#pop',
    data: {

        // 初始化燈箱關閉
        pop_block: false,

        // 登入畫面
        log_flex: false,

        // 密碼檢查
        pwd_check : /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,

        // 信箱檢查
        email_check: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,

        // 登入帳號
        login_username : '',

        // 登入密碼
        login_pwd : '',

        // 註冊畫面
        sign_flex: false,

        // 註冊帳號
        signup_username : '',

        // 註冊帳號檢查(是否有人使用)
        user_error : 0, //預設關閉顯示

        // 註冊密碼
        signup_pwd: '',

        // 確認密碼
        signup_repwd : '',
        
        // 註冊信箱
        signup_email : '',

        // 送出驗證信按鈕文字
        send_email : '送出驗證信',

        // 驗證信箱
        check_ver : '',

        // 驗證完成信箱
        checked_mail : '',

        // 驗證結果
        result : false,

        // 登入帳號錯誤
        lgUser : 0,
        
        // 登入密碼錯誤
        lgPwd : 0,

        // 登入結果錯誤
        login_error : false,

        // 註冊帳號錯誤
        siUser : 0,

        // 註冊密碼錯誤
        siPwd : 0,

        // 註冊確認密碼錯誤
        siRePwd : 0,

        // 註冊信箱錯誤
        siEmail : 0,

        // 註冊驗證碼錯誤
        siVer : 0,

        // 登入帳號placeholder
        lgUsp : "請輸入英文或數字",

        // 登入密碼plcaceholder
        lgPsp : "請輸入至少8個字元，包含大小寫",

        // 註冊帳號placeholder
        siUsp : "請輸入英文或數字",

        // 註冊密碼plcaceholder
        siPsp : "請輸入至少8個字元，包含大小寫",

        // 確認密碼plcaceholder
        siRePsp : '',

        // 信箱placeholder
        email : '',

        // 驗證碼placeholder
        ver: '',

    },
    
    methods: {

        clearChinese(key){ //帳號禁止中文
            this[key] = this[key].replace(/[^\a-\z\A-\Z0-9]/g, '');
        }, 

        checkUser (username){ //確認是否存在會員
            if(username != ''){
              axios.get('checkUser.php', {
                 params: {
                    username: username
                 }
              })
              .then(function (response) {
                 message = response.data;
                 if (message == username) {
                    account.$data.user_error = 2
                 }else if(message == '') {
                    account.$data.user_error = 1
                 }
              })
            }else{
                this.user_error = 0
            }
        },

        close () {  // 關閉登入註冊燈箱
            // 燈箱關閉    
            this.pop_block = false,
            // 登入關閉
            this.log_flex = false,
            // 註冊關閉
            this.sign_flex = false
        },

        btn_signup (event) {  // 點擊註冊
            event.preventDefault(),
            // 登入消失
            this.log_flex = false,
            // 註冊
            this.sign_flex = true
        },
        
        submit_ver (email) { //發送驗證碼

            verNum = this.SetVerNum (); //產生驗證碼
            username = this.signup_username;

            if (username == '') {
                username = '新會員'
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
                            <h3 style="text-align: center;">您正在註冊緣弧Moon Lover會員，您的驗證碼是：${verNum}。</h3>
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
                    account.$data.send_email = '送出驗證信'; //Btn文字改變
                });

            }else{
                alert("請填寫信箱有效的信箱 !")
            }

        },

        SetVerNum () { //產生驗證碼
            VerNum = Math.floor((Math.random() * 9999) + 1000)
            return VerNum        
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

        signup (event,username,pwd,repwd,email,type) { //提交註冊表單
            if (this.signup_check(username,pwd,repwd,email,type)) { //檢查註冊資料
                // alert("沒錯") //測試用
                this.signup_pwd = this.encrypt(pwd); //密碼加密
                // event.preventDefault() //測試用
                // 正確
            }else {
                event.preventDefault()
                // 錯誤
            }
        },

        signup_check (username,pwd,repwd,email, type) {  // 檢查註冊資料

            // 帳號密碼檢查
            account_check = this.username_pwd_checking_sucsess (username, pwd)

            if (
                account_check == true
                &&
                this.user_error != 2
                &&
                pwd == repwd
                &&
                email != ''
                &&
                email == this.checked_mail //驗證完成信箱
                &&
                this.result == true
                ){
                return true
                // 填寫資訊正確
            }else{

                //呼叫帳號密碼檢查函式
                this.username_pwd_checking_error (username, pwd, type);

                if (repwd == '') {
                    this.siRePwd = 1;
                    this.signup_pwd = '';
                    this.siRePsp = "確認密碼不可為空白 !";
                }
                if (pwd != repwd) {
                    this.siRePwd = 1;
                    this.signup_repwd = '';
                    this.siRePsp = "請填寫相同密碼 !";
                }
                if (email == '') {
                    this.siEmail = 1;
                    this.email = "信箱未填寫 !";
                }
                if (this.result == false) {
                    alert("信箱還沒驗證哦 !")
                }
                if (this.result == true && email != this.checked_mail) {
                    alert("驗證信箱與輸入信箱不符 !")
                }

                 return false 
                // 填寫資訊錯誤
            }    
        },

        login (event,username,pwd,type) { //提交登入表單
            event.preventDefault()
            if (this.login_check (username,pwd,type)) { //檢查登入資料
                // alert("沒錯") //測試用
                cryptpwd = this.encrypt(pwd); //密碼加密
                
                // 傳遞資料
                var params = new URLSearchParams();params.append('username', username);params.append('password', cryptpwd);
                
                axios.post('LoginR.php', params).then(function (response) {
                    message = response.data;
                    if (message == false) {
                        account.$data.login_error = true;
                    }else{
                        window.location.reload()
                    }
                })                
            }
        },

        login_check (username,pwd,type) {  // 檢查登入資料
            // 確認登入資料是否完全正確
            account_check = this.username_pwd_checking_sucsess (username, pwd)     
            if (account_check == 1) { // 正確
                return true
            }else{ //錯誤
                //呼叫帳號密碼報錯函式
                this.username_pwd_checking_error (username, pwd,type);
                return false
            }
        },

        username_pwd_checking_sucsess (username,pwd) { //帳號密碼檢查是否正確
            if(username != '' && pwd == pwd.match(this.pwd_check) && pwd != '' ) {
                return true
            }else{
                return false
            }
        },
        
        username_pwd_checking_error (username,pwd,type) { //帳號密碼檢查錯誤回報
            if (username == '') {
                if(type == "login") {
                    this.lgUser = 1;
                    this.lgUsp = "帳號未填寫";
                    }
                if(type == "signup") {
                    this.siUser = 1;
                    this.siUsp = "帳號未填寫";
                }                
            }

            if (pwd == '' || pwd != pwd.match(this.pwd_check)) {
                if(type == "login") {
                    this.lgPwd = 1;
                    this.login_pwd = '';
                }
                if(type == "signup") {
                    this.siPwd = 1;
                    this.signup_pwd = '';
                }
            }
        },

        // input錯誤紅框和提示刪除

        input_sign_user () { 
            this.siUser = 0;
            this.siUsp = "請輸入英文或數字";
        },

        input_sign_pwd () {
            this.siPwd = 0;
            this.siPsp = "請輸入至少8個字元，包含大小寫";
        },

        input_sign_repwd () {
            this.siRePwd = 0;
            this.siRePsp = "";
        },

        input_sign_email () {
            this.siEmail = 0;
            this.email = "";
        },

        input_log_user () {
            this.lgUser = 0;
            this.lgUsp = "請輸入英文或數字";
        },

        input_log_pwd () {
            this.lgPwd = 0;
        },

        encrypt (pwd) {  //密碼加密
            // alert("進入");
            hide = $('#hide').val();
            hide = pwd;
            hash = CryptoJS.MD5(pwd);
            pwd = hash;
            // alert(pwd); //測試加密
            return pwd
        },

    },

})

