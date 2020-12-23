<?php


include("./Lib/UtilClass.php");
$Util = new UtilClass();



  //建立SQL 搜尋配對對象
  $sql = "SELECT * FROM merchandise where STATUS = 1";

  //執行
  $statement = $Util->getPDO()->prepare($sql);
  $statement->execute();
  $data = $statement->fetchAll();
  
  
  print_r(json_encode($data));




?>