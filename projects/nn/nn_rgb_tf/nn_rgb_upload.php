<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    Inserire modulo di upload e bottone per start

    <div class="row">
        <div class ="col-md-6"> 
            <div id = "dropzoneJson"></div>
        </div>
        <div class ="col-md-6">qui weights</div>
    </div>
    

   


<?php
    include($include_root."/body_bottom.php");
  
?>

<script>

var dj = new Dropzone("div#dropzoneJson", { url: "/myfile.json"});


</script>




<?php
    include($include_root."/footer.php");
  
?>