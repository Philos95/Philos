<?php

    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($path_root."/config.php");


include($path_root.'includes/header.php');
include($path_root.'includes/navbar.php');
?>




<?php
    include($path_root.'includes/body_bottom.php');
?>

<script src="sketch.js"></script>

<?php
    include($path_root.'includes/footer.php');
?>