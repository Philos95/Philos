<?php
session_start();

$parts=explode('/',$_SERVER['REQUEST_URI']);
$path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

include($path_root."/config.php");





 if($_GET['action']=='checkLogin'){

    checkValidating();

    $query ="SELECT username from members where username ='".$_POST['username']."' and password='".$_POST['password']."' LIMIT 1";
    $sql= $db->prepare($query);
    $sql->execute();
    $row = $sql->fetch(PDO::FETCH_ASSOC);

    if($row['username']==$_POST['username']){
        $_SESSION['username'] = $_POST['username'];
        echo "1";

    }
 }

 if($_GET['action']=='Logout'){
    if (session_destroy()){  
        echo 1;
    }else{
        echo "Error: Impossible to destroy the session";
    }
}



 function checkValidating()
 {
    $error="";
     if(!$_POST['username']){
         $error = $error."<li>Inserire un <b>Username</b></li>";
     }

     if(!$_POST['password']){
         $error = $error."<li>Inserire una <b>Password</b></li>";
     }

     
     if($error != ""){
                 $error = "<p><b>Dati mancanti:</b></p> <ul>" .$error."</ul>";
                 echo $error;
                 exit();
     }
 }



?>