<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <script src="node_modules\jquery\dist\jquery.min.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script> -->
    <script src="node_modules\crypto-js\crypto-js.js"></script>
    <script src="https://smtpjs.com/v3/smtp.js"></script>
    <script src="./js/smtp.js"></script>
    <script src="./js/vue.js"></script>
    <title>登入</title>
</head>
<body>
    <header>
        <nav id="nav">
            <div class="member" @click="login">登</div>
        </nav>
    </header>
    <!-- 登入燈箱 -->
    <div class="login_pop" v-bind:class="{block:pop_block}" id="pop">
        <div class="login_pop_in">
            <!-- 登入 -->
            <div class="account_login" v-bind:class="{flex:log_flex}">
                <i class="fas fa-times-circle fa-2x" @click="close"><i class="in_btn"></i></i>
                <div class="account_inbox">
                    <h1 class="account_text_login">會員登入</h1>
                    <form method="post" action="loginR.php" @submit="login($event,login_username,login_pwd,'login')">
                    <span class="inputbox">
                        <h3 class="input_text">帳號</h3>
                        <input class="input_login" type="text" name="username"  :placeholder = "lgUsp" id="input_log_username" :change="clearChinese('login_username')" v-model="login_username" :class="{error : lgUser == 1}" @click="input_log_user">
                    </span>
                    <span class="inputbox">
                        <h3 class="input_text">密碼</h3>
                        <input class="input_login" type="password" name="password"  :placeholder="lgPsp" id="input_log_pwd" v-model="login_pwd" :class="{error : lgPwd == 1}" @click="input_log_pwd">
                    </span>
                    <span class="submit_login">
                        <button class="btn_signup btnBlue_signup" @click="btn_signup">註冊</button>
                        <button class="btn_signup btnRed_signup">登入</button>
                    </span>
                    </form>
                </div>
            </div>
                    <!-- 註冊 -->
            <div class="account_signup" id="signup" v-bind:class="{flex:sign_flex}">
                <i class="fas fa-times-circle fa-2x" @click="close"><i class="in_btn"></i></i>
                <div class="account_inbox">
                    <h1 class="account_text_signup">註冊</h1>
                    <form method="post" action="signupR.php" @submit="signup($event,signup_username,signup_pwd,signup_repwd,signup_email,'signup')">
                        <span class="inputbox inputbox_signup">
                            <h3 class="input_text">帳號</h3>
                            <input class="input_signup" type="text" name="username"  :placeholder="siUsp" id="input_sign_username" :change="clearChinese('signup_username')" v-model="signup_username" :class="{error : siUser == 1}" @click="input_sign_user"><span class="right_space"></span>
                        </span>
                        <span class="inputbox inputbox_signup">
                            <h3 class="input_text">密碼</h3>
                            <input class="input_signup" type="password" name="password"  :placeholder="siPsp" id="input_sign_pwd" v-model="signup_pwd" :class="{error : siPwd == 1}" @click="input_sign_pwd">
                            <input type="hidden" name="hide" id="hide" />
                            <span class="right_space"></span>
                        </span>
                        <span class="inputbox inputbox_signup">
                            <h3 class="input_text">確認密碼</h3>
                            <input class="input_signup" type="password" id="input_repwd" :placeholder="siRePsp" v-model="signup_repwd" :class="{error : siRePwd == 1}" @click="input_sign_repwd">
                            <span class="right_space"></span>
                        </span>
                        <span class="inputbox inputbox_signup">
                            <h3 class="input_text">信箱</h3>
                            <input class="input_signup" type="email" name="email"  id="email" v-model="signup_email" :placeholder="email" :class="{error : siEmail == 1}" @click="input_sign_email">
                            <button class="btnBlue_Ver" @click.prevent="submit_ver(signup_email)">{{send_email}}</button>
                        </span>
                        <span class="inputbox inputbox_signup">
                            <h3 class="input_text">驗證碼</h3>
                            <input class="input_signup" type="number" name="number"    :placeholder="ver" v-model="check_ver" :class="{error : siVer == 1}" @click="siVer = 0">
                            <button class="btnBlue_Ver" @click.prevent="ver_check">確認驗證碼</button>
                        </span>
                        <span class="submit_signup">
                            <button type='submit' class="btn_signup btnRed_signup">送出</button>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- 燈箱結束 -->
    <script src="./js/style.js"></script>
</body>
</html>