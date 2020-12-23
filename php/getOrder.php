<?php
    include("./Lib/UtilClass.php");
	$Util = new UtilClass();	

    //建立SQL
    $sql = "SELECT m.ID as ID, member.USERNAME as USERNAME , m.PRICE as PRICE, m.ORDER_TIME as ORDER_TIME, m.ORDER_STATUS as ORDER_STATUS, m.CANCEL_DATE as CANCEL_DATE FROM myorder as m
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