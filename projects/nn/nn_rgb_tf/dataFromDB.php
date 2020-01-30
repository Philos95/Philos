<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="takeData"){
      if($_GET['limit']){  
        $query ="(SELECT * FROM `colors` WHERE color='red' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `colors` WHERE color='blue' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `colors` WHERE color='green' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `colors` WHERE color='cyan' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `colors` WHERE color='magenta' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `colors` WHERE color='yellow' order by RAND() limit ".$_GET['limit'].")";
        //Totale
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
      }
      
        
    }



    if($_GET['action']=="takeData"){
      if($_GET['limit']){  
        $query ="SELECT R,G,B FROM philos.colors order by RAND() limit 1 ";
        //Totale
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
      }
      
        
    }


  


?>