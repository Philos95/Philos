<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <div id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>

    <br>

    <button type="button" class="btn btn-primary" id="bRoll" >Roll</button> 
   


<?php
    include($include_root."/body_bottom.php");
  
?>

    <script src="person.js"></script>
    <script src="car.js"></script>
    <script src="sketch.js"></script>



<?php
    include($include_root."/footer.php");
  
?>