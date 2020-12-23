<?php 
    
    include("./Lib/MemberClass.php");

    $Member = new MemberClass();
    
    $pid = $_POST["pid"];
    
    // echo $pid;

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    $sql = "SELECT * FROM personal_msg where pRELATIONSHIP_ID = ?";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $pid);
    $statement->execute();
    $data = $statement->fetchAll();    

    print_r(json_encode($data));

    //建立SQL 設定已讀
    $sql = "UPDATE personal_msg SET READING = 1 WHERE pRELATIONSHIP_ID = ?";

        //執行
    $statement = $Util->getPDO()->prepare($sql);
    $statement->bindValue(1, $pid);
    $statement->execute();    


?>