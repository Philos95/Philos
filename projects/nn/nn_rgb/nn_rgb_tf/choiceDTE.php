<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");

    if($_GET['actions']=='upload'){

        if( $_POST['data'] && $_POST['train'] && $_POST['epochs']){

            $data = array("data"=> $_POST['data'],"train"=>$_POST['train'],"epochs"=>$_POST['epochs']);
            
            if($db->insert("traincolors", $data)){
                echo "1";
            }
        }else{
            echo "Data, Train or Ephocs input is empty";
        }
        
    }



    if($_GET['actions']=='fillInput'){
        
        $query ="SELECT t.data,t.train,t.epochs FROM philos.traincolors as t order by t.id desc limit 1";
        
        $sql = $db->prepare($query);
        $sql->execute();
        $row = $sql->fetch(PDO::FETCH_ASSOC);

        echo json_encode($row);
        
    }





?>