<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


  $query ="SELECT R,G,B,label FROM philos.color_classification_set";
      
  //Totale
  $sql = $db->prepare($query);
  $sql->execute();
  $rows = $sql->fetchAll(PDO::FETCH_ASSOC);

  foreach($rows as $row){
      echo "new Color('".$row['label']."',".$row['R'].",".$row['G'].",".$row['B']."),\r\n";
  }
        
  

?>