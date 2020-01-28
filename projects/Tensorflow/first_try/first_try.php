<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>



<?php
    include($include_root."/body_bottom.php");
  
?>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>

 
 <!-- Import tfjs-vis
  it provides a convenient place to display visualizations. -->
 <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-vis@1.0.2/dist/tfjs-vis.umd.min.js"></script>

<!-- Import the main script file -->
<script src="script.js"></script>

<?php
    include($include_root."/footer.php");
  
?>