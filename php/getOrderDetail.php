<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();
    
    $id = $_POST['id'];

    //建立SQL
    $sql = "SELECT m.NAME as NAME, o.ORDER_QUANTITY as ORDER_QUANTITY, m.PRICE as PRICE FROM moonlover.order_detail as o
	join myorder as my
    on
    my.ID = o.ORDER_ID
    join merchandise as m 
    on o.MERCHANDISE_ID = m.ID
    where my.ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();
    
    print_r(json_encode($data));

?>