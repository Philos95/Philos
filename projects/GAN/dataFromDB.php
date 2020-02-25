<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="takeData"){
      if($_GET['limit']){  
        $query ="(SELECT * FROM `color_classification` WHERE color='red' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='green' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='blue' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='yellow' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='pink' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='azure' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='orange' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='purple' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='brown' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='grey' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='black' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `color_classification` WHERE color='white' order by RAND() limit ".$_GET['limit'].")";
        
        //Totale
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
      }
      
        
    }

?>