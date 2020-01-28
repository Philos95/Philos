<?php

$parts=explode('/',$_SERVER['REQUEST_URI']);
$include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

include($include_root."/config.php");

include($include_root."/header.php");


?>






<h1>E insomma!</h1>







<?php
    include($include_root."/body_bottom.php");
  
?>

<?php
    include($include_root."/footer.php");
  
?>