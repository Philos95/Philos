<?php


$parts=explode('/',$_SERVER['REQUEST_URI']);
$path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

include($path_root."/config.php");

$titoloSezione ="Moduli";


include($path_root.'includes/header.php');
include($path_root.'includes/navbar.php');
include($path_root.'includes/sidebar.php');

if($_SESSION['username']==""){
    header("Location: ".$http_root."admin/adminlogin.php");
    //header("adminindex.php");
  }

?>



<table id="tableModuli" class="table table-bordered table-striped table-condesed table-responsive" style="width:100%" >
        <thead class="thead-dark">
          <tr>
              <th>Url</th>
              <th>Menu Name</th>
              <th>Description</th>
              <th>Node N°</th>
              <th>Child of</th>
              <th>Icon</th>
              <th><center>Modifica</center></th>
              <th><center>Elimina</center></th>
          </tr>
        </thead>
        <tbody>
            <?php
                  $sql= $db->prepare("SELECT * FROM moduli order by Node desc");
                  $sql->execute();
                  $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
                  
                  foreach($rows as $row){
                    echo "<tr>";
                      echo "<td>".$row['Url']."</td>";
                      echo "<td>".$row['NameMenu']."</td>";
                      echo "<td>".$row['Description']."</td>";
                      echo "<td>".$row['Node']."</td>";
                      echo "<td>".$row['ChildOf']."</td>";
                      echo "<td>".$row['Icon']."</td>";
                      echo "<td><center><a href='".$http_admin."moduliedit.php?modifica=".$row['id']."'> <img src='".$http_root."img/ico_edita.gif' alt='Modifica' title='Modifica' width='14' height='14' /></a></center></td>";
                      echo "<td><center><a href='".$http_admin."moduli.php?delete=".$row['id']."' onClick=\"return window.confirm('Sei sicuro di voler eliminare il modulo scelto ?')\"'><img src='".$http_root."img/ico_cancella.gif' alt='Elimina' title='Elimina' width='14' height='14' /></a></center></td>";
                    echo "</tr>";
                  }       
            ?>
        </tbody>
      </table>




<!-- BODY DELLA PAGINA-->

<?php
    include($path_root.'includes/body_bottom.php');
?>


<!-- SCRIPT -->

<script>
$(function () {
    $('#tableModuli').DataTable();
  })
</script>

<?php
    include($path_root.'includes/footer.php');
?>