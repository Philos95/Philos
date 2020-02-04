<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <button type="button" class="btn btn-primary" id="upload">Carica un modello</button>
    
    <button type="button" class="btn btn-secondary" href="nn_rgb.php"  id="train">Allena un modello</button>

   


<?php
    include($include_root."/body_bottom.php");
  
?>

<script>
$("#train").on("click",function(){
    window.location.replace("nn_rgb.php");
});

$("#upload").on("click",function(){
    window.location.replace("nn_rgb_upload.php");
})

</script>




<?php
    include($include_root."/footer.php");
  
?>