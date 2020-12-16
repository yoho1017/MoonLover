<?php 

    include("./Lib/MemberClass.php");

    $Member = new MemberClass();

    $id = $Member->getMemberID();

    include("./Lib/UtilClass.php");
    $Util = new UtilClass();

    //建立SQL
    $sql = "update member set PASSWORD = ?, EMAIL = ?, MEMBER_TYPE = ?, NICKNAME = ?, ABOUT = ?, AGE = ?, AGE_RANGE = ?, AREA = ?, JOB = ?, JOB_DETAIL = ?, EDUCATION = ?, SCHOOL = ?, SEX = ?, SO = ?, PAIR_PRIV = ?, PUBLIC_PRIV = ?
    where ID = ?";
    
    //執行
    $statement = $Util->getPDO()->prepare($sql);

    if ($_POST["nickname"] == '') {
        $_POST["nickname"] = null;
    }

    if ($_POST["about"] == '') {
        $_POST["about"] = null;
    }

    if ($_POST["newage"] == 0) {
        $_POST["newage"] = null;
    }

    if ($_POST["ageRange"] == 0) {
        $_POST["ageRange"] = null;
    }

    if ($_POST["area"] == '還沒填寫哦') {
        $_POST["area"] = null;
    }

    if ($_POST["job"] == '還沒填寫哦') {
        $_POST["job"] = null;
    }

    if ($_POST["work"] == '還沒填寫哦') {
        $_POST["work"] = null;
    }

    if ($_POST["education"] == '還沒填寫哦') {
        $_POST["education"] = null;
    }

    if ($_POST["school"] == '還沒填寫哦') {
        $_POST["school"] = null;
    }

    // echo $_POST["password"];
    // echo '<br>';

    // echo $_POST["email"];
    // echo '<br>';

    // echo $_POST["memberType"];
    // echo '<br>';

    // echo $_POST["nickname"];
    // echo '<br>';

    // echo $_POST["about"];
    // echo '<br>';

    // echo $_POST["newage"];
    // echo '<br>';

    // echo $_POST["ageRange"]; 
    // echo '<br>';

    // echo $_POST["area"];
    // echo '<br>';

    // echo $_POST["job"];
    // echo '<br>';

    // echo $_POST["work"];
    // echo '<br>';

    // echo $_POST["education"];
    // echo '<br>';

    // echo $_POST["school"];
    // echo '<br>';

    // echo $_POST["sex"];
    // echo '<br>';

    // echo $_POST["seo"];
    // echo '<br>';

    // echo $_POST["match"];
    // echo '<br>';

    // echo $_POST["pri"];
    // echo '<br>';

    //給值
    $statement->bindValue(1, $_POST["password"]);
    $statement->bindValue(2, $_POST["email"]);
    $statement->bindValue(3, $_POST["memberType"]);
    $statement->bindValue(4, $_POST["nickname"]);
    $statement->bindValue(5, $_POST["about"]);
    $statement->bindValue(6, $_POST["newage"]);
    $statement->bindValue(7, $_POST["ageRange"]);
    $statement->bindValue(8, $_POST["area"]);
    $statement->bindValue(9, $_POST["job"]);
    $statement->bindValue(10, $_POST["work"]);
    $statement->bindValue(11, $_POST["education"]);
    $statement->bindValue(12, $_POST["school"]);
    $statement->bindValue(13, $_POST["sex"]);
    $statement->bindValue(14, $_POST["seo"]);
    $statement->bindValue(15, $_POST["match"]);
    $statement->bindValue(16, $_POST["pri"]);
    $statement->bindValue(17, $id);
    $statement->execute();
    


?>