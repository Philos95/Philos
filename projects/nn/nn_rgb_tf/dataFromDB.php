<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="takeData"){
      if($_GET['limit']){
        $query ="SELECT *  FROM `colors` limit ".$_GET['limit']."";
      }else{
        $query ="SELECT *  FROM `colors`";
      }
      
        //Totale
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
    }


  


?>