<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");



    $titoloPagina='Discriminator';
    include($include_root."/header.php");

?>

    <div id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>



<?php
    include($include_root."/body_bottom.php");
  
?>
<script>
const labelList = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink", 
    "azure",
    "orange",
    "purple",
    "brown",
    "grey",
    "black",
    "white"  
];
</script>





<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
<script src="../cFunction.js"></script>
<script src="../color.js"></script>
<script src="../colorArray.js"></script>
<script src="discriminator.js"></script>
<script src="sketch.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>