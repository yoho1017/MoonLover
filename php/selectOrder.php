<?php 
    
    include("./Lib/MemberClass.php");

    $Member = new MemberClass();

    $id = $Member->getMemberID();
    

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $sql = "SELECT ID as id , ORDER_TIME as date, PRICE as price , ORDER_STATUS as status FROM myorder where oMEMBER_ID = 6";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $id);
    $statement->execute();
    $data = $statement->fetchAll();    

    print_r(json_encode($data));


?>