<?php
    class MemberClass {   
        
        //清除Session
        function clearSession(){
            if(!isset($_SESSION)){
                session_start(); 
            }
            session_unset();
            session_destroy();
        }

        //--------------------------------------以下為前台使用--------------------------------------

        //取得會員ID(前台專用)
        function getMemberID(){
            if(!isset($_SESSION)){
                session_start(); 
            }
            return isset($_SESSION["MemberID"]) ? $_SESSION["MemberID"] : ""; 
        }

        //取得會員帳號(前台專用)
        function getMemberName(){
            if(!isset($_SESSION)){
                session_start(); 
            }
            return isset($_SESSION["MemberUser"]) ? $_SESSION["MemberUser"] : ""; 
        }

        //寫入Session(前台專用)
        function setMemberInfo($MemberID,$memberUSER){
            if(!isset($_SESSION)){
                session_start(); 
            }
            $_SESSION["MemberID"] = $MemberID; //Table 'member'裡的ID欄位值
            $_SESSION["MemberUser"] = $memberUSER; //Table 'member'裡的USERNAME欄位值
        }
        
    }
?>