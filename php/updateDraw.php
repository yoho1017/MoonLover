<?php

        //建立SQL
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $id = $_POST['id'];
        $NUM = $_POST['NUM'];
        $DRAW_LUCKY = $_POST['DRAW_LUCKY'];
        $DRAW_CONTENT = $_POST['DRAW_CONTENT'];
        $DRAW_DETAIL = $_POST['DRAW_DETAIL'];
        $DRAW_ANSWER = $_POST['DRAW_ANSWER'];
        $STATUS = $_POST['STATUS'];

        // 加br
        if ($DRAW_LUCKY == '籤王') {
            $DRAW_LUCKY = '籤<br>王';
        }elseif($DRAW_LUCKY == '上上大吉') {
            $DRAW_LUCKY = '上上<br>大吉';
        }elseif ($DRAW_LUCKY == '上') {
            $DRAW_LUCKY = '上<br>';
        }elseif ($DRAW_LUCKY == '上上') {
            $DRAW_LUCKY = '上<br>上';
        }elseif ($DRAW_LUCKY == '上吉') {
            $DRAW_LUCKY == '上<br>吉';
        }elseif ($DRAW_LUCKY == '上平') {
            $DRAW_LUCKY = '上<br>平';
        }elseif ($DRAW_LUCKY == '中') {
            $DRAW_LUCKY = '中<br>';
        }elseif ($DRAW_LUCKY == '中平') {
            $DRAW_LUCKY = '中<br>平';
        }elseif ($DRAW_LUCKY == '中上') {
            $DRAW_LUCKY = '中<br>上';
        }elseif ($DRAW_LUCKY == '下') {
            $DRAW_LUCKY = '下<br>';
        }

        // echo $NUM;
        // echo '<br>';
        // echo $DRAW_LUCKY;
        // echo '<br>';
        // echo $DRAW_CONTENT;
        // echo '<br>';
        // echo $DRAW_DETAIL;
        // echo '<br>';
        // echo $DRAW_ANSWER;
        // echo '<br>';
        // echo $DRAW_ANSWER;
        // echo '<br>';
        // echo $STATUS;
        // echo '<br>';

        if ($id == 'new') {
            $sql = "INSERT INTO `draw` (`NUM`, `DRAW_LUCKY`, `DRAW_CONTENT`, `DRAW_DETAIL`, `DRAW_ANSWER`, `STATUS`) VALUES (?, ?, ?, ?, ?, ?)";
        }else {
            $sql = "UPDATE `draw` SET `NUM` = ?, `DRAW_LUCKY` = ?, `DRAW_CONTENT` = ?, `DRAW_DETAIL` = ?, `DRAW_ANSWER` = ?, `STATUS` = ? where id = $id";
        }

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $NUM);
        $statement->bindValue(2, $DRAW_LUCKY);
        $statement->bindValue(3, $DRAW_CONTENT);
        $statement->bindValue(4, $DRAW_DETAIL);
        $statement->bindValue(5, $DRAW_ANSWER);
        $statement->bindValue(6, $STATUS);
        $statement->execute();
        $data = $statement->fetchAll();

?>