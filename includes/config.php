<?php 
    
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $http_root="http://".$_SERVER['SERVER_NAME']."/".$parts[1]."/";
    $path_root = $_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/";
    $classes_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/classes"; 

    require $classes_root."/database.php";
    

   require_once "db_config.php";


   try {

        //create PDO connection 
        //$db = new PDO("mysql:host=".DBHOST.";dbname=".DBNAME.";charset=utf8", DBUSER, DBPASS);
        $db = new Database(DBTYPE,DBHOST,DBNAME,DBUSER,DBPASS);
        $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
   } catch(PDOException $e) {
        //show error
        echo '<p class="bg-danger">'.$e->getMessage().'</p>';
        exit;
    }

?>