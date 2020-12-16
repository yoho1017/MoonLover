<?php
    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    //建立SQL
    $sql = "INSERT INTO member
    (USERNAME,PASSWORD,EMAIL)
    VALUES 
    (?,?,?)";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $_POST["username"]);
    $statement->bindValue(2, $_POST["password"]);
    $statement->bindValue(3, $_POST["email"]);
    $statement->execute();

    // 直接登入

    //建立SQL
    $sql = "SELECT * FROM member WHERE USERNAME = ? and PASSWORD = ? and MEMBER_TYPE != 3 and MEMBER_TYPE != 4";

    //執行
    $statement = $Util->getPDO()->prepare($sql);

    //給值
    $statement->bindValue(1, $_POST["username"]);
    $statement->bindValue(2, $_POST["password"]);
    $statement->execute();
    $data = $statement->fetchAll();

    $memberID = "";
    $memberName = "";
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

        //導回首頁        
        echo "<script>alert('歡迎來到全台第一間線上月老廟。'); location.href = '../main.html';</script>"; 
    }else{
        //跳出提示停留在登入頁
        echo "<script>alert('帳號或密碼錯誤!'); location.href = '../main.html';</script>"; 
    }

?>