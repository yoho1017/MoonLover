<?php
    class UtilClass {    

        //取得PDO物件
        function getPDO(){
            $db_host = "localhost";
            $db_user = "moonlover";
            $db_pass = "";
            $db_select = "moonlover";
     
            //建立資料庫連線物件
            $dsn = "mysql:host=".$db_host.";dbname=".$db_select;
     
            //建立PDO物件，並放入指定的相關資料
            $pdo = new PDO($dsn, $db_user, $db_pass);
            return $pdo;
        }

    }
?>