<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    
    $titoloPagina='GAN';
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




<p>
        <br/>speed: <input id="speedSlider" type="range" min="1" max="30" value="1"> <span id="speed">1</span>   
        <br/>Actual Data: <span id="TotalColors">1</span>   
    </p>
    <p>
        <br/>Red: <span id="TotRed">1</span>     
        <br/>Green: <span id="TotGreen">1</span>   
        <br/>Blue: <span id="TotBlue">1</span>  
    </p>
    <p>
        <br/>Yellow: <span id="TotYellow">1</span>     
        <br/>Pink: <span id="TotPink">1</span>   
        <br/>Azure: <span id="TotAzure">1</span>  
    </p>
    <p>
        <br/>Orange: <span id="TotOrange">1</span>     
        <br/>Purple: <span id="TotPurple">1</span>   
        <br/>Brown: <span id="TotBrown">1</span>  
    </p>
    <p>
        <br/>Grey: <span id="TotGrey">1</span>     
        <br/>Black: <span id="TotBlack">1</span>   
        <br/>White: <span id="TotWhite">1</span>  
    </p>
        

    </div>



<script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.0.0/dist/tf.min.js"></script>



<script src="cFunction.js"></script>
<script src="color.js"></script>
<script src="colorArray.js"></script>
<script src="generator/generator.js"></script>
<script src="discriminator/discriminator.js"></script>
<script src="gan.js"></script>
<script src="sketch.js"></script>
 




<?php
    include($include_root."/footer.php");
  
?>