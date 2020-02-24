<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <div id="sketch-holder">
    
    </div>
   

<?php
    include($include_root."/body_bottom.php");
  
?>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
<script src="../color.js"></script>
<script src="colorButton.js"></script>
<script src="../colorArray.js"></script>

<script src="test.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>