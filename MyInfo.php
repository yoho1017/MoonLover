<?php 
    include("style.php");
?>

<link rel="stylesheet" href="./node_modules/croppie/croppie.css">
<link rel="stylesheet" href="./css/MyInfo.css">
<script src="./node_modules/croppie/croppie.min.js"></script>
<title>個人資料</title>

<div id="member" class="container">
    
    <aside>
        <ul class="option">
            <li class="list" v-for="list in lists"><a href="#" ><h3 class="listName">{{list}}</h3></a></li>
        </ul>
    </aside>

    <main>
        <div class="pinkBox_account">
            <div class="inBox_account ALeft">
                <img src="./images/mascot.svg" class="mascot">
            </div>
            <div class="inBox_account ARight">
                <button class="btnRed_submit submit" ><h4>修改資料</h4></button>
                <!-- <button class="btnBlue_submit submit">修改完成</button> -->

                <form action="modifyR.php" class="form">
                    <div class="mainInfo">
                        <div class="inputRow">
                            <h4 class="name">帳號</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >XXXXXX</h4>
                        </div>
                        <div class="inputRow">
                            <h4 class="name">密碼</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify">••••••</h4>
                        </div>
                        <div class="inputRow">
                            <h4 class="name">信箱</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >be91926@gmail.com</h4>
                        </div>
                    </div>
                    <div class="profile">
                        <div class="inprofile">
                            <div class="img">
                                <img src= "./images/profile.png" id="newImg">
                            </div>
                            <div class="upload_btn">
                                <label>
                                    <input id="upload_img" style="display:none;" type="file" accept="image/*" >
                                    <i class="fas fa-camera"></i>
                                </label>
                            </div>
                        </div>

                        <button id="crop_img" class="btnBlue_crop" style="display:none"><i class="fa fa-scissors"></i> 裁剪圖片</button>

                    </div>

                    <div class="border"></div>

                    <div class="moreInfo">

                        <div class="inputRow">
                            <h4 class="name more">暱稱</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify">帥迪</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">關於會員</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >我是大帥哥</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">年齡</h4>
                            <select name more="age" v-if="modify">
                            　  <option v-for="age in ages">
                                    {{age}}
                                </option>
                            </select>
                               <h4 v-else="modify" >26</h4>
                        </div>

                        <div class="inputRow row_mult">
                            <h4 class="name more">興趣</h4>
                            <div class="interest_box"  v-if="modify">
                                <interests v-for="interest in interests" :the-text="interest"></interests>
                            </div>
                            <h4 v-else="modify" >畫畫 | 旅遊 | 跑步</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">居住地</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >新北市</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">職業</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >軍警 / 上將</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">學歷</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >博士 / 台北科技大學</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">我是</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >男性</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name more">性取向</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >異性戀</h4>
                        </div>

                    </div>

                    <div class="border"></div>


                    <div class="privaty">

                        <div class="inputRow">
                            <h4 class="name">控管您的個人資料</h4>
                            <i class="fas fa-info"></i>
                        </div>

                        <div class="inputRow">
                            <h4 class="name">接受月老配對</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >否</h4>
                        </div>

                        <div class="inputRow">
                            <h4 class="name">對外公開個人資訊</h4>
                            <input type="text" class="member_input" v-if="modify">
                            <h4 v-else="modify" >否</h4>
                        </div>
                    
                    </div>

                </form>

            </div>
        </div>
    </main>
    
</div>

<script src="./js/member.js"></script>
