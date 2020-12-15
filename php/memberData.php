<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();	
    
    $id = $_POST['id'];

    //建立SQL
    $sql = "SELECT ID, USERNAME, EMAIL, NICKNAME, ABOUT, AGE, AREA, JOB, JOB_DETAIL, EDUCATION, SCHOOL, SEX, SO, PAIR_PRIV, PUBLIC_PRIV FROM moonlover.member where ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();
    
    print_r(json_encode($data));

?>