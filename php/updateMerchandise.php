<?php

        //建立SQL
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

        $data = json_decode($_POST['data']);
        // print_r($data);
        // echo base64_decode($data[8]);
        if ($data[7] == 'newImg') {
            $img = str_replace('data:image/png;base64,','', $data[8]);// 需注意 data url 格式 與來源是否相符 ex:image/jpeg
            $file = '../images/moonShop/'. uniqid() . '.png';//檔名 包含資料夾路徑 請記得此資料夾需 777 權限 方可寫入圖檔
            $imgdata = base64_decode($img);
            $success = file_put_contents($file, $imgdata);
            $data[3] = substr($file,-17);
            // echo gettype($data[3]);
        }

        // echo base64_decode($data[3]);
        // echo '<br>';

        $sql = "UPDATE `merchandise` SET `NAME` = ?, `PRICE` = ?, `IMAGE` = ?, `INTRODUCTION` = ?, `CUSTOMIZED` = ?, STATUS = ? where `id` = ?";

        // // //執行
        $statement = $Util->getPDO()->prepare($sql);
        $statement->bindValue(1, $data[1]);
        $statement->bindValue(2, $data[2]);
        $statement->bindValue(3, $data[3]);
        $statement->bindValue(4, $data[4]);
        $statement->bindValue(5, $data[5]);
        $statement->bindValue(6, $data[6]);
        $statement->bindValue(7, $data[0]);
        $statement->execute();

?>