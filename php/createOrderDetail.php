<?php

  //insert的條件之一(會員ID)
  include("./Lib/MemberClass.php");
  $Member = new MemberClass();
  $myId = $Member->getMemberID();
  $orderNumbers = $_POST['orderNumber'];
  $orderCounts = json_decode($_POST['orderCount']);
  print_r($orderCounts);
  $orderPrices = json_decode($_POST['orderPrice']);
  print_r($orderPrices);
  $productIDs = json_decode($_POST['productID']);
  $Imgarray = json_decode($_POST['Imgarray']);
  print_r ($Imgarray);
  print_r ($productIDs );
  echo count($productIDs );



  include("./Lib/UtilClass.php");
  $Util = new UtilClass();
  
  for($i=0;$i<count($productIDs);$i++){

    $data = base64_decode($Imgarray[$i]);

    $file = '../images/member/orderDetail/'. uniqid().'.png';

    $filepath = substr($file,-17);
    $success = file_put_contents($file, $data);

    $sql="INSERT INTO order_detail(MERCHANDISE_ID,ORDER_ID,ORDER_QUANTITY,ORDER_PRICE,CUSTOM_IMAGE) VALUES (?,?,?,?,?)";
    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //取值
   
    $statement->bindValue(1, $productIDs[$i]);
    $statement->bindValue(2, $orderNumbers);
    $statement->bindValue(3, $orderCounts[$i]);
    $statement->bindValue(4, $orderPrices[$i]);
    $statement->bindValue(5, $filepath);

    $statement->execute();

  }









?>