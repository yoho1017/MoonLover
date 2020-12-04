<?php
        include("./Lib/MemberClass.php");

        $Member = new MemberClass();
    
        $id = $Member->getMemberID();

        // 接收資料

        $sport = $_POST["sport"];

        $book = $_POST["book"];

        $movie = $_POST["movie"];

        $travel = $_POST["travel"];

        $codeing = $_POST["codeing"];

        $boardgame = $_POST["boardgame"];

        // echo $sport;

        // echo '<br>';

        // echo $book;

        // echo '<br>';

        // echo $movie;

        // echo '<br>';

        // echo $travel;

        // echo '<br>';

        // echo $codeing;

        // echo '<br>';

        // echo $boardgame;

        // echo '<br>';
        
        // // 興趣勾選結果到陣列(true=勾選)
        $myinterest = array($sport,$book,$movie,$travel,$codeing,$boardgame);

        // 因資料為字串，轉數值

        $myinterestInt = [];
        foreach ($myinterest as $value) {
            if ($value == 'false') {
                $myinterestInt[] = 0;
            }else{
                $myinterestInt[] = 1;
            }
        };  
        
        // print_r($myinterestInt);


        // 興趣清單(共六個)
        $interestlist = array(1,2,3,4,5,6);
    
        include("./Lib/UtilClass.php");
        $Util = new UtilClass();

            //建立SQL
            $sql = "SELECT mMEMBER_ID FROM my_interest WHERE mMEMBER_ID = ? GROUP BY mMEMBER_ID";

            //執行
            $statement = $Util->getPDO()->prepare($sql);
            
            //給值
            $statement->bindValue(1, $id);
            $statement->execute();
            
            $data = $statement->fetchAll();

            $sql_id = "";
            // 確認是否有存在資料
            foreach($data as $index => $row){
                $sql_id = $row["mMEMBER_ID"];
            }
            // 確認是否有資料

            if ($sql_id == null) {

                // echo 'nodata';

                for ($i = 1 ; $i <= count($interestlist) ; $i++ ) {
                    //建立SQL
                    $sql = "INSERT INTO my_interest
                    (mINTEREST_ID,mMEMBER_ID)
                    VALUES 
                    (?,?)";

                    //執行
                    $statement = $Util->getPDO()->prepare($sql);
                    
                    //給值
                    $statement->bindValue(1, $i);
                    $statement->bindValue(2, $id);
                    $statement->execute();
                    $data = $statement->fetchAll();

                    $int_status = "";
                    // 取得興趣是否有勾選資料
                    foreach($data as $index => $row){
                        $int_status = $row["mINTEREST_STATUS"];
                    }

                    $myIntStatus = $myinterestInt [$i - 1 ];

                    // 如果傳進來的資料和原始資料不符合

                    if ($int_status != $myIntStatus) {

                        // 更新資料

                        //建立SQL
                        $sql = "update my_interest set mINTEREST_STATUS = ? where mMEMBER_ID = ? and mINTEREST_ID = ?";

                        //執行
                        $statement = $Util->getPDO()->prepare($sql);
                        
                        //給值
                        $statement->bindValue(1, $myIntStatus);
                        $statement->bindValue(2, $id);
                        $statement->bindValue(3, $i);
                        $statement->execute();
                        $data = $statement->fetchAll();
                    }
                }

                // foreach($interestlist as $interest) {
                //     // 建立SQL
                //     $sql = "INSERT INTO my_interest
                //     (mINTEREST_ID,mMEMBER_ID)
                //     VALUES 
                //     (?,?)";
                    
                //     //執行
                //     $statement = $Util->getPDO()->prepare($sql);
                    
                //             //給值
                //     $statement->bindValue(1, $interest);
                //     $statement->bindValue(2, $id);
                //     $statement->execute();
                // }
            }else{ //如果有會員資料

                // echo "hasdata";

                // 搜尋會員資料

                for ($i = 1 ; $i <= count($interestlist) ; $i++ ) {
                    //建立SQL
                    $sql = "SELECT mINTEREST_STATUS FROM my_interest WHERE mINTEREST_ID = ? and mMEMBER_ID = ?";

                    //執行
                    $statement = $Util->getPDO()->prepare($sql);
                    
                    //給值
                    $statement->bindValue(1, $i);
                    $statement->bindValue(2, $id);
                    $statement->execute();
                    $data = $statement->fetchAll();

                    $int_status = "";
                    // 取得興趣是否有勾選資料
                    foreach($data as $index => $row){
                        $int_status = $row["mINTEREST_STATUS"];
                    }

                    $myIntStatus = $myinterestInt [$i - 1 ];

                    // 如果傳進來的資料和原始資料不符合

                    if ($int_status != $myIntStatus) {

                        // 更新資料

                        //建立SQL
                        $sql = "update my_interest set mINTEREST_STATUS = ? where mMEMBER_ID = ? and mINTEREST_ID = ?";

                        //執行
                        $statement = $Util->getPDO()->prepare($sql);
                        
                        //給值
                        $statement->bindValue(1, $myIntStatus);
                        $statement->bindValue(2, $id);
                        $statement->bindValue(3, $i);
                        $statement->execute();
                        $data = $statement->fetchAll();
                    }
                }
            
            }

?>