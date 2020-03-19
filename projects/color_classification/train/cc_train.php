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
        <input type="text"  id= "dataInput" value="<?php echo $_GET['data'] ?>" hidden>
        <input type="text" id= "trainInput" value="<?php echo $_GET['train'] ?>" hidden>
        <input type="text" id= "epochsInput" value="<?php echo $_GET['epochs'] ?>" hidden>
        <input type="text" id= "lrInput" value="<?php echo $_GET['lr'] ?>" hidden>
        <p>
            <div class ="row">
                <div class= "col-md-6">
                    <br/>Frames: <input id="frameSlider" type="range" min="1" max="60" value="1"> <span id="frame">1</span>
                </div>

                <div class= "col-md-6">
                    <button type="button" class="btn btn-primary" id="downloadModel" disabled>Download Model</button> 
                </div>
            </div>
        </p>
    
    </div>


<?php
    include($include_root."/body_bottom.php");
  
?>
<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>
<script src="../cFunctions.js"></script>
<script src="../color.js"></script>
<script src="../colorArray.js"></script>
<script src="cc_train.js"></script>
<script src="sketch_train.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>