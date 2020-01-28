<?php

$persone =array("Destro","Mingo","Kailobit","Philos","Teme","Brandoooo","BadOne95","Sfirintelli");

$count = 1;
$personeLength = count($persone);

for($i=0;$i<=$personeLength; $i++){
    $c = array_rand($persone);
   
    echo $persone[$c]." ";
    
    if($count % 2 == 0 ){
        echo "<br>";
    }else{
        echo "- ";
    }
    
    unset($persone[$c]);
    $count++;
}


?>