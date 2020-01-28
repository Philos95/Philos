<?php
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

    include($include_root."/config.php");

    include($include_root."/header.php");

?>


<br>

<div class ="projects">
    <h2>Philos Projects</h2>   

    <ul class ="projectList">

        <?php 
            $sql= $db->prepare("SELECT * FROM projects order by Date desc");
            $sql->execute();
            $ProjRows = $sql->fetchAll(PDO::FETCH_ASSOC);
            foreach($ProjRows as $ProjRow){
                echo "<a href='".$http_root."/projects/".$ProjRow['Page']."'";
                echo    "<li class='project'>";
                echo        "<img src ='".$http_root."img/project-img/".$ProjRow['ImageSource']."' alt = '".$ProjRow['Title']."'/>";
                echo        "<div class='projectDate'>".$ProjRow['Date']."</div>";
                echo        "<div class='projectName'>".$ProjRow['Title']."</div>";
                echo        "<div class='projectDescription'>".$ProjRow['Description']."</div>";
                echo    "</li>";
                echo "</a>";
            }

        ?>
        
    </ul>
</div>




<?php

    /*$sql= $db->prepare("SELECT * FROM projects order by Date desc");
    $sql->execute();
    $ProjRows = $sql->fetchAll(PDO::FETCH_ASSOC);
    foreach($ProjRows as $ProjRow){
        echo "<tr>";
        echo "<td>".$ProjRow['Number']."</td>";
        echo "<td>".$ProjRow['Date']."</td>";
        echo "<td>".$ProjRow['Name']."</td>";
        echo "<td>".$ProjRow['Description']."</td>";
        echo "<td>".$ProjRow['Github']."</td>";
        echo "<td>Go</td>";
        echo "</tr>";
    }*/

?>





<?php
    include($include_root."/body_bottom.php");
  
?>

<?php
    include($include_root."/footer.php");
  
?>