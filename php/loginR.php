<?php
    include("./Lib/UtilClass.php");
	$Util = new UtilClass();	

    //建立SQL
    $sql = "SELECT * FROM member WHERE (USERNAME = ? or EMAIL = ?) and PASSWORD = ? and MEMBER_TYPE != 3 and MEMBER_TYPE != 4";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $_POST["username"]);
    $statement->bindValue(2, $_POST["username"]);
    $statement->bindValue(3, $_POST["password"]);
    $statement->execute();
    $data = $statement->fetchAll();

    $memberID = "";
    $memberUSER = "";
    foreach($data as $index => $row){
        $memberID = $row["ID"];
        $memberUSER = $row["USERNAME"];
    }

    //判斷是否有會員資料?
    if($memberID != "" && $memberUSER != ""){
        include("./Lib/MemberClass.php");
        $Member = new MemberClass();
    
        //將會員資訊寫入session
        $Member->setMemberInfo($memberID,$memberUSER);

        //導回首頁頁        
        echo $memberUSER; 
    }else{
        //跳出提示停留在登入頁
        echo "false"; 
    }
?>