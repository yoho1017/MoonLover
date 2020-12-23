<?php 
        
    $id = $_POST['id'];

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $sql = "SELECT p.NAME as itemName, o.CUSTOM_IMAGE as image, o.ORDER_PRICE as price, o.ORDER_QUANTITY as count FROM order_detail as o 
    join merchandise as p
    on
    o.MERCHANDISE_ID = p.ID where o.ORDER_ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();    

    print_r(json_encode($data));


?>