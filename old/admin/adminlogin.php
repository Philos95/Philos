<?php

    $parts=explode('/',$_SERVER['REQUEST_URI']);
    $path_root=$_SERVER['DOCUMENT_ROOT']."/".$parts[1]."/includes";

  include($path_root."/config.php");


include($path_root.'includes/header.php');
include($path_root.'includes/navbar.php');

if($_SESSION['username']!=""){
  header("Location: ".$http_root."admin/adminindex.php");
  //header("adminindex.php");
}

?>


<link rel="stylesheet" href="css/adminlogin.css" >


<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->

    <!-- Icon -->
    <div class="fadeIn first">
      <img src="<?php echo $http_root."img/p.png"?>" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <div class ="alert alert-danger collapse" id="alertConfirm"></div>

    <form>
      <input type="text" id="username" class="fadeIn second" name="username" placeholder="username">
      <input type="password" id="password" class="fadeIn third" name="password" placeholder="password">
      <input type="button" id="login" class="fadeIn fourth" value="Log In">
    </form>

    <!-- Remind Passowrd 
    <div id="formFooter">
      <a class="underlineHover" href="#">Forgot Password?</a>
    </div>-->

  </div>
</div>

<?php
    include($path_root.'includes/body_bottom.php');
?>



<script>
    $("#login").click(function(){
        $.ajax({
            type:"POST",
            url:"adminloginactions.php?action=checkLogin",
            data:   "username="+ $("#username").val() +
                    "&password=" + $("#password").val(),
            success: function(result){
                 
                 if(result==1){
                   
                    window.location.replace("adminindex.php");
                 }else{
                    $("#alertConfirm").html(result).show();
                    $("html, body").animate({ scrollTop: 0 }, "slow");
                 }
                 
                 
        }})


    });

</script>

<?php
    include($path_root.'includes/footer.php');
?>