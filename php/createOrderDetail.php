<?php

  //insert的條件之一(會員ID)
  include("./Lib/MemberClass.php");
  $Member = new MemberClass();
  $myId = $Member->getMemberID();
  $orderNumbers = json_decode($_POST['orderNumber']);
  $orderCounts = json_decode($_POST['orderCount']);
  $orderPrices = json_decode($_POST['orderPrice']);
  $productIDs = json_decode($_POST['productID']);

  print_r ($productIDs );
  echo count($productIDs );



  include("./Lib/UtilClass.php");
  $Util = new UtilClass();
  
  for($i=0;$i<count($productIDs);$i++){
    $sql="INSERT INTO order_detail(MERCHANDISE_ID,ORDER_ID,ORDER_QUANTITY,ORDER_PRICE,) VALUES (?,?,?,?)";
    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //取值
    $statement->bindValue(1,   $orderNumbers[$i]);
    $statement->bindValue(2,   $orderCounts[$i]);
    $statement->bindValue(3,   $orderPrices[$i]);
    $statement->bindValue(4,   $productIDs[$i]);

    $statement->execute();

  }









?>