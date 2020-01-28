 
 <?php
 if($sidebar=="true"){
        
		echo "</div></div> </div></div></div> </div> </div>";
		
 }
?>
 
 <!-- jQuery 3 -->
 <script src=<?php echo $http_root."bower_components/jquery/dist/jquery.min.js"; ?>></script>

 <!-- Bootstrap 4.0.0-->
<script src=<?php echo $http_root."bower_components/bootstrap/dist/js/bootstrap.min.js"; ?>></script>


<!-- DataTables -->
<script src="https://cdn.datatables.net/1.10.19/js/jquery.dataTables.min.js"></script>

<!-- Sidebar -->
<script src=<?php echo $http_root."bower_components/sidebar/js/sidebar.menu.js";?>></script>

<!-- Perfet Scrollbar -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.perfect-scrollbar/1.4.0/perfect-scrollbar.min.js"></script>

<script>
	$(function() {
		new PerfectScrollbar('.scrollbar');
	});
</script>

<!-- P5.js -->
<script src =<?php echo $http_root."bower_components/p5/p5.min.js"; ?>></script>
<script src =<?php echo $http_root."bower_components/p5/addons/p5.dom.min.js"; ?>></script>
<script src =<?php echo $http_root."bower_components/p5/addons/p5.sound.min.js"; ?>></script>




<!-- Application JS -->
<script src=<?php echo $http_root."application_components/js/application.js"; ?>></script>