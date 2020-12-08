var bAccount =  new Vue ({
    el: '#pop',
    data: {

        // 燈箱常開狀態
        pop_block: true,

        // 登入畫面
        log_flex: true,

        // 密碼檢查
        pwd_check : /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/,

        // 登入帳號
        login_username : '',

        // 登入密碼
        login_pwd : '',

        // 登入帳號錯誤
        lgUser : 0,
        
        // 登入密碼錯誤
        lgPwd : 0,

        // 登入結果錯誤
        login_error : false,

        // 登入帳號placeholder
        lgUsp : "請輸入帳號",

        // 登入密碼plcaceholder
        lgPsp : "請輸入至少8個字元，包含大小寫",

    },
    
    methods: {
        clearChinese(key){ //帳號禁止中文和符號
            this[key] = this[key].replace(/[^\a-\z\A-\Z0-9]/g, '');
        },

        clearChineseLogin(key){ //帳號登入禁止中文可使用email
            this[key] = this[key].replace(/[^\a-\z\A-\Z0-9\@._-]/g, '');
        },
        login (event,username,pwd,type) { //提交登入表單
            event.preventDefault()
            if (this.login_check (username,pwd,type)) { //檢查登入資料
                cryptpwd = this.encrypt(pwd); //密碼加密
                let stage = 'backend';
                
                // 傳遞資料
                var params = new URLSearchParams();
                params.append('username', username);
                params.append('password', cryptpwd);
                params.append('stage', stage);
                
                axios.post('./php/LoginR.php', params).then(function (response) {
                    message = response.data;
                    console.log(message);
                    if (message == false) {
                        bAccount.$data.login_error = true;
                    }else{
                        alert(`管理員${message}登入`);
                        // let pageName = window.location.pathname.split('/');
                        // pageName.splice(-1,1,'backstage_publicMsg.html');
                        // pageName = pageName.join("/"); 
                        // // 導向後台頁面                       
                        // window.location.pathname = pageName;

                        window.location.href="./backstage_publicMsg.html";
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
            }

            if (pwd == '' || pwd != pwd.match(this.pwd_check)) {
                if(type == "login") {
                    this.lgPwd = 1;
                    this.login_pwd = '';
                }
            }
        },

        // input錯誤紅框和提示刪除

        input_log_user () {
            this.lgUser = 0;
            this.lgUsp = "請輸入帳號";
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

