<?php


$parts=explode('/',$_SERVER['REQUEST_URI']);
$path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

include($path_root."/config.php");


$titoloSezione ="INDICE";


include($path_root.'includes/header.php');
include($path_root.'includes/navbar.php');
include($path_root.'includes/sidebar.php');

if($_SESSION['username']==""){
    header("Location: ".$http_root."admin/adminlogin.php");
    //header("adminindex.php");
  }

?>




<?php
    include($path_root.'includes/body_bottom.php');
?>




<?php
    include($path_root.'includes/footer.php');
?>