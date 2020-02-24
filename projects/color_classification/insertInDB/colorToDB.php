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

          $data = array("R"=>$R,"G"=>$G,"B"=>$B,"color"=>$color);
          $db->insert("color_classification", $data);
        }
       
    }


    if($_GET['action']=="countColors"){
      $query ="SELECT count(id) as totale FROM `color_classification` ";
      
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


      //Yellow
      $yellowQ = $query." WHERE color = 'yellow'";
      $sql = $db->prepare($yellowQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totYellow'] = $row['totale'];


      //Pink
      $pinkQ = $query." WHERE color = 'pink'";
      $sql = $db->prepare($pinkQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totPink'] = $row['totale'];


      //Azure
      $azureQ = $query." WHERE color = 'azure'";
      $sql = $db->prepare($azureQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totAzure'] = $row['totale'];


      //Orange
      $orangeQ = $query." WHERE color = 'orange'";
      $sql = $db->prepare($orangeQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totOrange'] = $row['totale'];

      //Purple
      $purpleQ = $query." WHERE color = 'purple'";
      $sql = $db->prepare($purpleQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totPurple'] = $row['totale'];

      //Brown
      $brownQ = $query." WHERE color = 'brown'";
      $sql = $db->prepare($brownQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totBrown'] = $row['totale'];


      //Grey
      $greyQ = $query." WHERE color = 'grey'";
      $sql = $db->prepare($greyQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totGrey'] = $row['totale'];


      //Black
      $blackQ = $query." WHERE color = 'black'";
      $sql = $db->prepare($blackQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totBlack'] = $row['totale'];


      //White
      $whiteQ = $query." WHERE color = 'white'";
      $sql = $db->prepare($whiteQ);
      $sql->execute();
      $row = $sql->fetch(PDO::FETCH_ASSOC);

      $totals['totWhite'] = $row['totale'];


      echo json_encode($totals);
    }


?>