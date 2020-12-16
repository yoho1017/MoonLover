<?php
    include("./Lib/MemberClass.php");

    $Member = new MemberClass();


    if($_POST['counter'] == 'get'){
        $mCounter = $Member->getMemberMatchCounter();
        echo $mCounter;
    }
    else if($_POST['counter'] == 'new')
    {
        $Member->setMemberMatchCounterDefault();

        $mCounter = $Member->getMemberMatchCounter();
        echo $mCounter;
    }
    else if($_POST['counter'] == 'add'){
        $Member->setMemberMatchCounter();

        $mCounter = $Member->getMemberMatchCounter();
        echo $mCounter;
    }
    

?>