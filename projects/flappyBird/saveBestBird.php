<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="saveBird"){
      $bestBird= $_POST['birdBrain'];
      $fp = fopen( $path_root.'/projects/flappyBird/bestBird.json', 'w');
      fwrite($fp, $bestBird);
      fclose($fp);
       
    }



    if($_GET['action']=="saveBirdOnDB"){

      $generation= $_POST['generation'];
      $data = array("Generation"=>$generation);
      $db->insert("flappyBird", $data);

    }






?>