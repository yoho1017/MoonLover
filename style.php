<?php
	include("./Lib/MemberClass.php");
	$Member = new MemberClass();
	
?>

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
    <script src="./node_modules/axios/dist/axios.min.js"></script>
</head>
<body>
    <header>
        <nav id="nav">
        <?php              
            //顯示會員資訊
            $showMemberText = $Member->getMemberName() == "" ? '<div class="member" @click="login">登</div>'
            : "Hello~".$Member->getMemberName()."&nbsp;&nbsp;&nbsp;<a href='Logout.php'>登出</a>";
            echo $showMemberText
        ?>
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
                    <div class="inputbox">
                        <h3 class="input_text">帳號</h3>
                        <input class="input_login" type="text" name="username"  :placeholder = "lgUsp" id="input_log_username" :change="clearChinese('login_username')" v-model="login_username" :class="{inp_error : lgUser == 1}" @click="input_log_user">
                    </div>
                    <div class="inputbox">
                        <h3 class="input_text">密碼</h3>
                        <input class="input_login" type="password" name="password"  :placeholder="lgPsp" id="input_log_pwd" v-model="login_pwd" :class="{inp_error : lgPwd == 1}" @click="input_log_pwd">
                    </div>
                    <div class="inputbox">
                        <span class="input_text"></span>
                        <p class="str_error h0" v-if="login_error">帳號或密碼錯誤<p>
                    </div>
                    <div class="submit_login">
                        <button class="btn_signup btnBlue_signup" @click="btn_signup">註冊</button>
                        <button class="btn_signup btnRed_signup">登入</button>
                    </div>
                    </form>
                </div>
            </div>
                    <!-- 註冊 -->
            <div class="account_signup" id="signup" v-bind:class="{flex:sign_flex}">
                <i class="fas fa-times-circle fa-2x" @click="close"><i class="in_btn"></i></i>
                <div class="account_inbox">
                    <h1 class="account_text_signup">註冊</h1>
                    <form method="post" action="signupR.php" @submit="signup($event,signup_username,signup_pwd,signup_repwd,signup_email,'signup')">
                        <div class="inputbox inputbox_signup">
                            <h3 class="input_text">帳號</h3>
                            <input class="input_signup" type="text" name="username"  :placeholder="siUsp" id="input_sign_username" :change="clearChinese('signup_username')" v-model="signup_username" :class="{inp_error : siUser == 1}" @click="input_sign_user" @keyup="checkUser(signup_username)">
                            <p class="right_space str_error" v-if="user_error == 2">此帳號有人使用</p>
                            <p class="right_space str_clear" v-else-if="user_error == '1'">此帳號可以使用</p>
                            <span class="right_space" v-else="user_error"></span>
                        </div>
                        <div class="inputbox inputbox_signup">
                            <h3 class="input_text">密碼</h3>
                            <input class="input_signup" type="password" name="password"  :placeholder="siPsp" id="input_sign_pwd" v-model="signup_pwd" :class="{inp_error : siPwd == 1}" @click="input_sign_pwd">
                            <input type="hidden" name="hide" id="hide" />
                            <span class="right_space"></span>
                        </div>
                        <div class="inputbox inputbox_signup">
                            <h3 class="input_text">確認密碼</h3>
                            <input class="input_signup" type="password" id="input_repwd" :placeholder="siRePsp" v-model="signup_repwd" :class="{inp_error : siRePwd == 1}" @click="input_sign_repwd">
                            <span class="right_space"></span>
                        </div>
                        <div class="inputbox inputbox_signup">
                            <h3 class="input_text">信箱</h3>
                            <input class="input_signup" type="email" name="email"  id="email" v-model="signup_email" :placeholder="email" :class="{inp_error : siEmail == 1}" @click="input_sign_email">
                            <button class="btnBlue_Ver" @click.prevent="submit_ver(signup_email)">{{send_email}}</button>
                        </div>
                        <div class="inputbox inputbox_signup">
                            <h3 class="input_text">驗證碼</h3>
                            <input class="input_signup" type="number" name="number"    :placeholder="ver" v-model="check_ver" :class="{inp_error : siVer == 1}" @click="siVer = 0">
                            <button class="btnBlue_Ver" @click.prevent="ver_check">確認驗證碼</button>
                        </div>
                        <div class="submit_signup">
                            <button type='submit' class="btn_signup btnRed_signup">送出</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- 燈箱結束 -->
    <script src="./js/style.js"></script>
</body>
</html>