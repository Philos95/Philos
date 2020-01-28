<?php 
    
    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $http_root="http://".$_SERVER['SERVER_NAME']."/".$parts[1]."/";
    $path_root = $_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/";
    $classes_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/classes"; 

    require $classes_root."/database.php";
    

    //database credentials
    define('DBTYPE','mysql');
    define('DBHOST','localhost');
    define('DBUSER','root');
    define('DBPASS','lggpas95');
    define('DBNAME','philos');

    $sidebar = "false";
    

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