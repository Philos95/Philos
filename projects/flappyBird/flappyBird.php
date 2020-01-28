<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>

    <div class ="sketch-wrapper" id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>
    <div class ="sketch-wrapper">
   
        <p>
            Generation: <span id="generation">1</span>
            <br/> Current Population: <span id="cp">0</span>
            <br/>speed: <input id="speedSlider" type="range" min="1" max="10" value="1"> <span id="speed">1</span>   
            <br/> high score: <span id="hs">0</span>
            <br/> all time high score: <span id="ahs">0</span>
        </p>
        <p>
            <button id="statsButton">Statistic </button>
            <small><span id="modePhrase">Statistic mode set a limit to 10.000 of score. Save the num of generation that reaches the limit in db</span></small>
        </p>

    <!-- Our sketch will go here! -->
    </div>

   


<?php
    include($include_root."/body_bottom.php");
  
?>

<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
<script src="/philos/classes/js/NeuralNetwork/nn.js"></script>
<script src="/philos/classes/js/NeuralNetwork/matrix.js"></script>
<script src="ga.js"></script>
<script src="pipe.js"></script>
<script src="bird.js"></script>
<script src="sketch.js"></script>

 




<?php
    include($include_root."/footer.php");
  
?>