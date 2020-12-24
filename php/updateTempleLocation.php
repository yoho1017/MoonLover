<?php

        //建立SQL
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $id = $_POST['id'];
        $NAME = $_POST['NAME'];
        $tName = $_POST['tName'];
        $TEMPLE_LOCATION_CATEGORY = $_POST['TEMPLE_LOCATION_CATEGORY'];
        $GUIDE = $_POST['GUIDE'];
        $OPEN_TIME = $_POST['OPEN_TIME'];
        $ADDRESS = $_POST['ADDRESS'];
        $IMAGE = $_POST['IMAGE'];
        $LOCATION_LINK = $_POST['LOCATION_LINK'];
        $LOCATION_STATUS = $_POST['LOCATION_STATUS'];
        $imgtype = $_POST['newImg'];
        $img = $_POST['img'];


        if ($imgtype == 'newImg') {
            $img = str_replace('data:image/png;base64,','', $img);// 需注意 data url 格式 與來源是否相符 ex:image/jpeg
            $file = '../images/moonMap/'. uniqid() . '.png';//檔名 包含資料夾路徑 請記得此資料夾需 777 權限 方可寫入圖檔
            $imgdata = base64_decode($img);
            $success = file_put_contents($file, $imgdata);
            $IMAGE = './images/moonMap/' . substr($file,-17);
            // echo gettype($data[3]);
        }

        
        // echo $id;
        // echo ' ';
        // echo $NAME;
        // echo ' ';
        // echo $tName;
        // echo ' ';
        // echo $TEMPLE_LOCATION_CATEGORY;
        // echo ' ';
        // echo $GUIDE;
        // echo ' ';
        // echo $OPEN_TIME;
        // echo ' ';
        // echo $ADDRESS;
        // echo ' ';
        // echo $IMAGE;
        // echo ' ';
        // echo $LOCATION_LINK;
        // echo ' ';
        // echo $LOCATION_STATUS;
        // echo ' ';

        

        // 用tName 找到 temple的ID
        $sql = "SELECT ID FROM `temple` WHERE NAME = ?";
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $tName);
        $statement->execute();
        $tID = $statement->fetchColumn();
        // echo $tID;

        if ($id == 'new') {
            $sql = "INSERT INTO `temple_location` (`lTEMPLE_ID`, `TEMPLE_LOCATION_CATEGORY`, `IMAGE`, `NAME`, `GUIDE`, `OPEN_TIME`, `ADDRESS`, `LOCATION_LINK`, `LOCATION_STATUS`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
        }else {
            $sql = "UPDATE `temple_location` SET `lTEMPLE_ID` = ?, `TEMPLE_LOCATION_CATEGORY` = ?, `IMAGE` = ?, `NAME` = ?, `GUIDE` = ?, `OPEN_TIME` = ?, `ADDRESS` = ?, `LOCATION_LINK` = ?, `LOCATION_STATUS` = ? where id = $id";
        }

        echo $sql;

        //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $tID);
        $statement->bindValue(2, $TEMPLE_LOCATION_CATEGORY);
        $statement->bindValue(3, $IMAGE);
        $statement->bindValue(4, $NAME);
        $statement->bindValue(5, $GUIDE);
        $statement->bindValue(6, $OPEN_TIME);
        $statement->bindValue(7, $ADDRESS);
        $statement->bindValue(8, $LOCATION_LINK);
        $statement->bindValue(9, $LOCATION_STATUS);
        $statement->execute();
        $data = $statement->fetchAll();

?>