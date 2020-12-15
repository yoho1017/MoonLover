<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();	
    
    $username = $_POST['username'] . '%';

    // echo $username;

    //建立SQL
    $sql = "SELECT ID, USERNAME, EMAIL, MEMBER_TYPE FROM moonlover.member where USERNAME LIKE ? order by ID";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $username);
    $statement->execute();
    $data = $statement->fetchAll();

    print_r(json_encode($data));

?>