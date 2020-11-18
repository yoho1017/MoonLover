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
                            <h4>帳號</h4>
                            <h4>XXXXXX</h4>
                            <input type="text" class="member_input">
                        </div>
                        <div class="inputRow">
                            <h4>密碼</h4>
                            <h4>••••••</h4>
                            <input type="text" class="member_input">
                        </div>
                        <div class="inputRow">
                            <h4>信箱</h4>
                            <h4>be91926@gmail.com</h4>
                            <input type="text" class="member_input">
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

                        <button id="crop_img" class="crop_btn" style="display:none"><i class="fa fa-scissors"></i> 裁剪圖片</button>

                    </div>
                </form>

            </div>
        </div>
    </main>
    
</div>

<script src="./js/upload.js"></script>
<!-- <script src="./js/member.js"></script> -->
