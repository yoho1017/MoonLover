<?php

  //insert的條件之一(會員ID)
  include("./Lib/MemberClass.php");
  $Member = new MemberClass();
  $myId = $Member->getMemberID();
  $itemPrices = intval($_POST['PRICE']);



  include("./Lib/UtilClass.php");
  $Util = new UtilClass();
  
  
  $sql="INSERT INTO myorder(oMEMBER_ID,ORDER_TIME,PRICE) VALUES (?,NOW(),?)";
    //執行
  $statement = $Util->getPDO()->prepare($sql);

    //取值
  $statement->bindValue(1,  $myId);
  $statement->bindValue(2,  $itemPrices);

  $statement->execute();


  

  $sql="SELECT ID FROM myorder where oMEMBER_ID = $myId order by ID desc limit 1";

  $statement = $Util->getPDO()->prepare($sql);

  $statement->execute();

  $data = $statement->fetchColumn();

  echo $data;

// // echo $itemPrices;
// // $sql="SELECT * FROM myorder";
// $sql="INSERT INTO myorder(oMEMBER_ID,ORDER_TIME,PRICE) VALUES (?,NOW(),?)";
// //執行
// $statement = $Util->getPDO()->prepare($sql);

// //取值
// $statement->bindValue(1,  $myId);
// $statement->bindValue(2,  $itemPrices);

// $statement->execute();

// //更新資訊


// //給值
// // $statement->execute();
// $data = $statement->fetchAll();

// print_r(json_encode($data));











?>