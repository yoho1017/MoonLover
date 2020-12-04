<?php 

    include("./Lib/MemberClass.php");

    $Member = new MemberClass();

    $id = $Member->getMemberID();

    $img = $_POST["img"];

    $img = base64_encode($img);

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $sql = "UPDATE member SET IMAGE = ? where ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $img);
    $statement->bindValue(2, $id);
    $statement->execute();
    $data = $statement->fetchAll();    

?>