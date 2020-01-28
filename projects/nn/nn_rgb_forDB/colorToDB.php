<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="insertColor"){
        if($_POST['r'] && $_POST['g'] && $_POST['b'] && $_POST['color']){
          $R = $_POST['r'];
          $G = $_POST['g'];
          $B = $_POST['b'];
          $color = $_POST['color'];

          $data = array("r"=>$R,"g"=>$G,"b"=>$B,"color"=>$color);
          $db->insert("colors", $data);
        }
       
    }


    if($_GET['action']=="countColors"){
      $query ="SELECT count(id) as totale FROM `colors`";
      
      //Totale
      $sql = $db->prepare($query);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totale'] = $row['totale'];

      //Rosso
      $redQ = $query." WHERE color = 'red'";
      $sql = $db->prepare($redQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totRed'] = $row['totale'];

      //Verde
      $greenQ = $query." WHERE color = 'green'";
      $sql = $db->prepare($greenQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totGreen'] = $row['totale'];

      //Blu
      $blueQ = $query." WHERE color = 'blue'";
      $sql = $db->prepare($blueQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totBlue'] = $row['totale'];

      //Magenta
      $magentaQ = $query." WHERE color = 'magenta'";
      $sql = $db->prepare($magentaQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totMagenta'] = $row['totale'];

      //Cyan
      $cyanQ = $query." WHERE color = 'cyan'";
      $sql = $db->prepare($cyanQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totCyan'] = $row['totale'];

      //Yellow
      $yellowQ = $query." WHERE color = 'yellow'";
      $sql = $db->prepare($yellowQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totYellow'] = $row['totale'];

      echo json_encode($totals);
    }


?>