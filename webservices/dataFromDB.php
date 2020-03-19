<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="takeData"){

      
      if($_GET["fake"]=="1"){
        $table = "color_classification_fake";
      }else{
        $table = "color_classification";
      }
      if($_GET['limit']){  
        $query ="(SELECT * FROM `".$table."` WHERE color='red' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='green' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='blue' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='yellow' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='pink' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='azure' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='orange' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='purple' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='brown' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='grey' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='black' order by RAND() limit ".$_GET['limit'].")
        UNION
        (SELECT * FROM `".$table."` WHERE color='white' order by RAND() limit ".$_GET['limit'].")";
        
        //Totale
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
      }
      
        
    }



    if($_GET['action']=="takeSample"){
      if($_GET['limit']){

        $query = "SELECT R,G,B,color FROM `color_classification_sample` order by rand() limit ".$_GET['limit']."";
        
        $sql = $db->prepare($query);
        $sql->execute();
        $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
      
        echo json_encode($rows);
        
      }
    
    }




    if($_GET['action']=="insertSynthetic"){
      if($_POST['r'] && $_POST['g'] && $_POST['b'] && $_POST['color']){
        $R = $_POST['r'];
        $G = $_POST['g'];
        $B = $_POST['b'];
        $color = $_POST['color'];

        $data = array("R"=>$R,"G"=>$G,"B"=>$B,"color"=>$color);
        $db->insert("color_classification_synthetic", $data);
      }
    
    }

?>