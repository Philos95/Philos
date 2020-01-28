<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");
    

?>

    <!--CSS-->
    <link rel="stylesheet" href="CHE.css">

    <div id="sketch-holder">
    <!-- Our sketch will go here! -->
    </div>
<br><br>

<div class ="containerCHE">
    <div class = "card">
        <div class= "face face1">
            <div class = "content">
                <img src="img/ideas.png">    
                <h3>Ideas</h3>          
            </div>
        </div>
        <div class= "face face2">
            <div class = "content">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ultrices velit in odio mattis, ut fringilla lorem malesuada. </p>             
                <a href="#">READ MORE</a>
            </div>
        </div>
    </div>

    <div class = "card">
        <div class= "face face1">
            <div class = "content">
                <img src="img/paint-palette.png"> 
                <h3>Paint</h3>            
            </div>
        </div>
        <div class= "face face2">
            <div class = "content">
                <p>Donec accumsan sed augue in fermentum. Fusce dolor felis, fringilla et efficitur at, bibendum sed arcu. Donec vel est ut ante rhoncus aliquet.</p>
                <a href="#">READ MORE</a>
            </div>
        </div>
    </div>

    <div class = "card">
        <div class= "face face1">
            <div class = "content">
                <img src="img/tools.png">    
                <h3>Tools</h3>         
            </div>
        </div>
        <div class= "face face2">
            <div class = "content">
                <p>Fusce at sagittis sem. Praesent tempus posuere porta. Etiam faucibus cursus erat sed posuere. Mauris condimentum pellentesque risus non pulvinar. </p>
                <a href="#">READ MORE</a>
            </div>
        </div>
    </div>

</div>
   

                

<?php
    include($include_root."/body_bottom.php");
  
?>





<?php
    include($include_root."/footer.php");
  
?>