<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");


    if($_GET['action']=="setColor"){

      $R = $_POST['R'];
      $G = $_POST['G'];
      $B = $_POST['B'];
      $label = $_POST['label'];
      $old_label = $_POST['old_label'];

      $data = array("R"=>$R,"G"=>$G,"B"=>$B,"label"=>$label,"old_label"=>$old_label);
      $db->insert("color_classification_set", $data);
      echo "1";
        
    }

?>