<?php 


    $id = $_POST["id"];

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $sql = "UPDATE myorder SET ORDER_STATUS = 2 where ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();    

?>