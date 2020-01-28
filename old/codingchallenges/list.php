<?php

$parts=explode('/',$_SERVER['REQUEST_URI']);
$path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($path_root."/config.php");


include($path_root.'includes/header.php');
include($path_root.'includes/navbar.php');
?>

 <!-- Content Wrapper. Contains page content -->
<div class="content-wrapper">
    <section class="content"> 
        <div class="row">
            <div class="col-md-4" ></div>
                <div class="col-xs-5" >
                    <div class="box">
                        <div class="box-body">
                            <h1><center>List of Coding Challenge:</center></h1>
                        </div>  
                    </div>
                </div>
            <div class="col-md-4" ></div> 
        <br>
        </div>
        <div class="row">
        
            <div class="col-md-4" ></div>
            <div class="col-xs-5" >
                <div class="box">
                    <div class="box-body">

                        <table class="table table-bordered table-striped table-condesed table-responsive" id="CCTable" style="width:100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>#</th>
                                    <th>Date</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>GitHub</th>
                                    <th>Go</th>         
                                </tr>
                            </thead>
                            <tbody>

                            <?php
                                $sql= $db->prepare("SELECT * FROM codingchallenges order by id desc");
                                $sql->execute();
                                $rows = $sql->fetchAll(PDO::FETCH_ASSOC);
                                foreach($rows as $row){
                                    echo "<tr>";
                                    echo "<td>".$row['Number']."</td>";
                                    echo "<td>".$row['Date']."</td>";
                                    echo "<td>".$row['Name']."</td>";
                                    echo "<td>".$row['Description']."</td>";
                                    echo "<td>".$row['Github']."</td>";
                                    echo "<td>Go</td>";
                                    echo "</tr>";
                                }
                            ?>
                            </tbody>
                        </table>
                    </div>
                </div>  
            </div>
            <div class="col-md-4" ></div>        
        </div>	
    </section>            
</div>



<?php
    include($path_root.'includes/body_bottom.php');
?>



<script>
   $(function () {
        $("#CCTable").DataTable();
    });

</script>




<?php
    include($path_root.'includes/footer.php');
?>