
   <?php
      if($sidebar=="true"){
        
        echo"
        <script>
        $('#logout').click(function(){
       
          $.ajax({
              type:'POST',
              url:'".$http_root."admin/adminloginactions.php?action=Logout',
              success: function(result){
                   if(result==1){               
                      window.location.replace('".$http_root."admin/adminlogin.php');
                   }else{
                      alert('Impossibile eseguire il Logout: '+result);
                   }                       
          }})
      });
        </script>";
      }
   ?>

  </body>
</html>