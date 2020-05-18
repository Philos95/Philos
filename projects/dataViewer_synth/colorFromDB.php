<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");




    if($_GET['action']=="countColors"){
      $query ="select count(*) as total,
      sum(case when color = 'red' then 1 else 0 end) AS red,
      sum(case when color = 'green' then 1 else 0 end) AS green,
      sum(case when color = 'blue' then 1 else 0 end) AS blue,
      sum(case when color = 'yellow' then 1 else 0 end) AS yellow,
      sum(case when color = 'pink' then 1 else 0 end) AS pink,
      sum(case when color = 'azure' then 1 else 0 end) AS azure,
      sum(case when color = 'purple' then 1 else 0 end) AS purple,
      sum(case when color = 'orange' then 1 else 0 end) AS orange,
      sum(case when color = 'brown' then 1 else 0 end) AS brown,
      sum(case when color = 'grey' then 1 else 0 end) AS grey,
      sum(case when color = 'black' then 1 else 0 end) AS black,
      sum(case when color = 'white' then 1 else 0 end) AS white
      FROM color_classification_synthetic";
      
      //Totale
      $sql = $db->prepare($query);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      echo json_encode($row);
    }


    if($_GET['action']== "rgbValue"){
        if($_POST['rgb'] && $_POST['color'] && $_POST['limit'] &&  $_POST['db']){
            $rgb = $_POST['rgb'];
            $color = $_POST['color'];
            $limit = $_POST['limit'];
         
            if( $_POST['db'] == "real"){

              $query = 'SELECT '.$rgb.' from color_classification where color = "'.$color.'" order by rand() limit '.$limit;

            }else  if( $_POST['db'] == "synth"){

              $query = 'SELECT '.$rgb.', active from color_classification_synthetic where color = "'.$color.'" order by rand() limit '.$limit;
            }


            $sql = $db->prepare($query);
            $sql->execute();
            $rows = $sql->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($rows);
        }
    }


?>