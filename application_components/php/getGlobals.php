<?php
   $parts=explode('/',$_SERVER['REQUEST_URI']);
   $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";
 
   include($include_root."/config.php");
 
    
    $result[]=array( 
                     "http_root"=>$http_root,
                     "root"=>$path_root ,
                     "classes_root"=>$classes_root    
                   );

    echo json_encode($result);
?>