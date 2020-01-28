<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <div id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>
    <div class ="sketch-wrapper">
   
    <p>
        <br/>speed: <input id="speedSlider" type="range" min="1" max="30" value="1"> <span id="speed">1</span>   
        <br/>Actual Data: <span id="TotalColors">1</span>   
    </p>
    <p>
        <br/>Red: <span id="TotRed">1</span>     
        <br/>Green: <span id="TotGreen">1</span>   
        <br/>Blue: <span id="TotBlue">1</span>  
        <br/>Magenta: <span id="TotMagenta">1</span>  
        <br/>Cyan: <span id="TotCyan">1</span>  
        <br/>Yellow: <span id="TotYellow">1</span>  
    </p>

    </div>


<?php
    include($include_root."/body_bottom.php");
  
?>

<script src="/philos/classes/js/NeuralNetwork/nn.js"></script>
<script src="/philos/classes/js/NeuralNetwork/matrix.js"></script>
<script src="rgb_db.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>