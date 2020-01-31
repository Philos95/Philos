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
            <br/>Frames: <input id="frameSlider" type="range" min="1" max="60" value="1"> <span id="frame">1</span>   
        </p>
    
    </div>


<?php
    include($include_root."/body_bottom.php");
  
?>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
<script src="/philos/classes/js/NeuralNetwork/nn.js"></script>
<script src="/philos/classes/js/NeuralNetwork/matrix.js"></script>
<script src="nn_rgb_ts.js"></script>
<script src="sketch.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>