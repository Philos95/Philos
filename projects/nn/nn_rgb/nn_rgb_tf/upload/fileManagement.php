<?php
  $parts=explode('/',$_SERVER['REQUEST_URI']);
  $include_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($include_root."/config.php");





    if($_GET['action']=="upload" && !empty($_FILES) && $_GET['type']){
        //echo $_FILES['file']['tmp_name'];
        $tempFile = $_FILES['file']['tmp_name']; 

        switch($_GET['type']){
            case "json":
                $fileName ='model.json';
                break;
            case "weights":
                $fileName ='model.weights.bin';
                break;
        }

        
        //$fileName =  $_FILES['file']['name'];
        $targetDir = $path_root."projects/nn/nn_rgb/nn_rgb_tf/model/";
        
        $targetFile = $targetDir.$fileName;
        if(move_uploaded_file($tempFile, $targetFile)){
            echo "1";
        }
    
    }

    if($_GET['action']=="fetch"){
        $storeFolder = $path_root."projects/nn/nn_rgb/nn_rgb_tf/model/";


        switch($_POST['type']){
            case "json":
                $ignoreArr =array('.', '..','model.weights.bin');
                break;
            case "weights":
                $ignoreArr =array('.', '..','model.json');
                break;
        }


        if(file_exists($storeFolder)){
            $output=array();
            $files = array_diff(scandir($storeFolder), $ignoreArr);         
            foreach($files as $file){
               echo $file;
            }  
        }

        


    }



    if($_GET['action']=="delete" ){
        if($_POST['type']=="json"){
            if(unlink($path_root."projects/nn/nn_rgb/nn_rgb_tf/model/model.json")){
                echo "1";
            }else{
                echo "Impossible to delete Json file";
            }
        }else if($_POST['type']=="weights"){
            if(unlink($path_root."projects/nn/nn_rgb/nn_rgb_tf/model/model.weights.bin")) {
                echo "1";
            }else{
                echo "Impossible to delete Weights file";
            }
        }
    }





?>