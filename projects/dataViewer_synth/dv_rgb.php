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
        <label id="rgbLabel">Red</label>
    </div>



<?php
    include($include_root."/body_bottom.php");
  
?>
<script src="chart.js"></script>
<script src="dv_rgb.js"></script>
<?php
    include($include_root."/footer.php");
  
?>