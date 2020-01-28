<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <style>
        #sketch-holder{
    
            padding-left :38%;
            padding-right:40%;
        }
    </style>

    <div id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>
   


<?php
    include($include_root."/body_bottom.php");
  
?>

    <script src="Snake.js"></script>
    <script src="Food.js"></script>
    <script src="snakeGame.js"></script>



<?php
    include($include_root."/footer.php");
  
?>