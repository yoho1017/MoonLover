<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();
    
    $id = $_POST['id'];
    $STATUS = $_POST['STATUS'];

    $sql = "UPDATE `moonlover`.`myorder` SET `ORDER_STATUS` = ?,`CANCEL_DATE` = null WHERE (`ID` = ?)";

    //建立SQL

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->bindValue(1, $STATUS);
    $statement->bindValue(2, $id);
    $statement->execute();
    
    if ($STATUS == 2) {
        $sql = "UPDATE `moonlover`.`myorder` SET `CANCEL_DATE` = NOW() WHERE (`ID` = ?)";

            //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $id);
        $statement->execute();    
    }

    //建立SQL
    $sql = "SELECT m.ID as ID, member.USERNAME as USERNAME , m.PRICE as PRICE, m.ORDER_TIME as ORDER_TIME, m.ORDER_STATUS as ORDER_STATUS, m.CANCEL_DATE as CANCEL_DATE FROM moonlover.myorder as m
    join member as member
    on
    member.ID = m.oMEMBER_ID";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->execute();
    $data = $statement->fetchAll();

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->execute();
    $data = $statement->fetchAll();
    
    print_r(json_encode($data));    

    

?>